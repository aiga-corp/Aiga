'use client'
import InfiniteScroll from "react-infinite-scroller";
import { supabase } from "../utils/supabase/supabase-client";
import { useEffect, useRef, useState } from "react";
import { CircleLoader } from "react-spinners";
import { DatasetCard } from "../ui/datasetCard";
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";



export default function Datasets() {
  const [datasets, setDatasets] = useState([]);
  const [end, setEnd] = useState(false);
  const [query, setQuery] = useState('');

  const { toast } = useToast();


  const getIds = () => {
    let ids = [];

    datasets.forEach((m)=> {
      ids.push(m.id);
    })

    return JSON.stringify(ids).replace("[", "(").replace("]", ")");
  }


  const fetchDatasets = async () => {

    const { data, error } = await supabase
      .from("Dataset")
      .select("*, author(*)")
      .not("id", "in", getIds())
      .order("downloads", {"ascending": false}) // -downloads
      .limit(5);


    if(!error)
    {
      if(data.length)
        if(datasets.length)
        {
          setDatasets(p=>[...p, ...data]);
        }
        else{
          setDatasets(data);
        }
      else
        setEnd(true);
    }
    else{
    }
  }



  const handleQuery = async () => {

    if(!query.length) return;


    const response = await supabase
      .from("Dataset")
      .select("*, author(*)")
      .textSearch("name", query)
      .textSearch("description", query)
      .limit(20);


    if(response.data && response.data.length)
    {
      setDatasets(response.data);
      dialogClose();
    }
    else{
      toast({
        "title": `No datasets found for "${query}"`
      })
    }
  }

  const dialogClose = () => {
    document.getElementById('closeDialog')?.click();
  };



  const vref = useRef();


  return (
    <div className="h-full w-full flex flex-row">

      <div className="w-full h-full flex flex-col gap-10 overflow-y-scroll" ref={(r)=>vref.current=r} style={{paddingBottom: 200}}>
        <InfiniteScroll
          data={datasets}
          hasMore={!end}
          initialLoad
          loadMore={()=>fetchDatasets()}
          loader={
            <div
              key="loader-2"
              className="w-full flex flex-row justify-center py-5"
            >
              <CircleLoader className="rounded-xl p-3 bg-neutral-50" size={25} />
            </div>
          }
            threshold={400}
            useWindow={false}
            getScrollParent={()=>vref.current}
        />
        {
          datasets.length ?
            datasets.map((dataset)=> {
              return <DatasetCard key={dataset.id} dataset={dataset} />
            })
          :
            null
        }
      </div>



      <div className="w-fit p-0">
        <Dialog> 
          <DialogTrigger asChild>
            <Button variant="light" className="border-l border-b border-t-[0px] rounded-none rounded-es-xl">
              <Search />
            </Button>
          </DialogTrigger>


          <DialogContent className="md:max-w-[400px] rounded-lg">
            <DialogHeader>
              <DialogTitle>
                Search Datasets
              </DialogTitle>
            </DialogHeader>

            <div className="w-full">
              <Input 
                placeholder="search... (hit Enter)"
                onChange={(e)=>setQuery(e.target.value)}
                onKeyDown={(e)=>{
                  if(e.key==="Enter")
                  {
                    handleQuery();
                  }
                }}
              />
            </div>

            <DialogClose id="closeDialog" />
          </DialogContent>
        </Dialog>
      </div>


    </div>
  )

}

