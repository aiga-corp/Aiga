'use client'
import InfiniteScroll from "react-infinite-scroller";
import { ModelCard } from "../ui/modelCard";
import { supabase } from "../utils/supabase/supabase-client";
import { useEffect, useRef, useState } from "react";
import { CircleLoader } from "react-spinners";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";




export default function Models() {
  const [models, setModels] = useState([]);
  const [end, setEnd] = useState(false);
  const [query, setQuery] = useState('');


  const getIds = () => {
    let ids = [];

    models.forEach((m)=> {
      ids.push(m.id);
    })

    return JSON.stringify(ids).replace("[", "(").replace("]", ")");
  }


  const { toast } = useToast();


  const fetchModels = async () => {


    const { data, error } = await supabase
      .from("Model")
      .select("*, author(*)")
      .not("id", "in", getIds())
      .order("downloads", {"ascending": false}) // -downloads
      .limit(5);


    if(!error)
    {
      if(data.length)
        if(models.length)
        {
          setModels(p=>[...p, ...data]);
        }
        else{
          setModels(data);
        }
      else
        setEnd(true);
    }
  }



  const handleQuery = async () => {

    if(!query.length) return;



    const response = await supabase
      .from("Model")
      .select("*, author(*)")
      .textSearch("name", query)
      .textSearch("description", query)
      .limit(20);


    if(response.data && response.data.length)
    {
      setModels(response.data);
      dialogClose();
    }
    else{
      toast({
        "title": `No models found for "${query}"`
      })
    }
  }

  const dialogClose = () => {
    document.getElementById('closeDialog')?.click();
  };


  const vref = useRef();


  return (
    <div className="h-full w-full flex flex-row">
        <div className="w-full h-full flex flex-col gap-10 overflow-y-scroll" style={{paddingBottom: 200}} ref={(r)=>vref.current=r}>
          <InfiniteScroll
            data={models}
            hasMore={!end}
            initialLoad
            loadMore={()=>fetchModels()}
            loader={
              <div
              key="loader-1"
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
            models.length ?
              models.map((model)=> {
                return <ModelCard key={model.id} model={model} />
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
                Search Models
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


