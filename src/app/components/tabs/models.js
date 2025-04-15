'use client'
import InfiniteScroll from "react-infinite-scroller";
import { ModelCard } from "../ui/modelCard";
import { supabase } from "../utils/supabase/supabase-client";
import { useEffect, useRef, useState } from "react";
import { CircleLoader } from "react-spinners";



export default function Models() {
  const [models, setModels] = useState([]);
  const [end, setEnd] = useState(false);


  const getIds = () => {
    let ids = [];

    models.forEach((m)=> {
      ids.push(m.id);
    })

    return JSON.stringify(ids).replace("[", "(").replace("]", ")");
  }


  const fetchModels = async () => {


    const { data, error } = await supabase
      .from("Model")
      .select("*, author(*)")
      .not("id", "in", getIds())
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
    else{
      console.log(error);
    }
  }



  const vref = useRef();


  return (
    <div className="w-full h-full flex flex-col gap-5" ref={(r)=>vref.current=r}>
      <InfiniteScroll
        data={models}
        hasMore={!end}
        initialLoad
        loadMore={()=>fetchModels()}
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
        models.length ?
          models.map((model)=> {
            return <ModelCard key={model.id} model={model} />
          })
        :
          null
      }
    </div>
  )

}


