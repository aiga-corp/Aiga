'use client'
import InfiniteScroll from "react-infinite-scroller";
import { supabase } from "../utils/supabase/supabase-client";
import { useEffect, useRef, useState } from "react";
import { CircleLoader } from "react-spinners";
import { DatasetCard } from "../ui/datasetCard";



export default function Datasets() {
  const [datasets, setDatasets] = useState([]);
  const [end, setEnd] = useState(false);


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
      console.log(error);
    }
  }



  const vref = useRef();


  return (
    <div className="w-full h-full flex flex-col gap-5" ref={(r)=>vref.current=r}>
      <InfiniteScroll
        data={datasets}
        hasMore={!end}
        initialLoad
        loadMore={()=>fetchDatasets()}
        loader={
          <div
            className="w-full flex flex-row justify-center"
          >
            <CircleLoader size={25} className="text-red-500" />
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
  )

}

