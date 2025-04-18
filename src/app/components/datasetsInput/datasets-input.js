'use client'
import { Input } from "@/components/ui/input";
import { TooltipTrigger, Tooltip, TooltipContent, TooltipProvider } from "@/components/ui/tooltip";
import { 
  useState,
  useContext,
  useEffect,
  useRef
} from "react";
import { supabase } from "../utils/supabase/supabase-client";
import { useToast } from "@/hooks/use-toast";



export const Dataset = ({handleDelete, text}) => {

  if(!handleDelete)
  {
    return (
      <button
        className="p-3 border-[0.5px] rounded-full font-semibold text-sm"
      >
        {text}
      </button>
    )
  }


  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          className="p-4 border-[0.5px] rounded-full font-semibold"
          onDoubleClick={handleDelete}
        >
          {text}
        </button>
      </TooltipTrigger>

      <TooltipContent>
        <p>Double click to remove</p>
      </TooltipContent>
    </Tooltip>
  )
}



export const DatasetInput = ({setDatasets, datasets, hideBorder}) => {

  const [dataset, setDataset] = useState('');


  const { toast } = useToast();


  const handleAdd = async () => {

    if(!dataset.length) return;

    const res = await supabase
      .from("Dataset")
      .select("*")
      .eq("name", dataset)
      .maybeSingle();


    if(res.data)
    {

      setDatasets(x=>x.filter((i)=> i!=dataset));

      setDatasets(p=>[...p, dataset]);

      setDataset("");
    }
    else{
      toast({
        title: `"${dataset}" doesn't exist!`,
        description: "Couldn't find the dataset in our database."
      });


    }
  }


  const handleRemove = (dt) => {
    setDatasets(x=>x.filter((i)=> i!=dt));
  }



  return (
    <div
      className="w-full h-fit border-1 rounded-lg"
      style={{borderWidth: hideBorder && 0 }}
    >
      <div className="flex flex-wrap w-full h-fit gap-5 p-5">
        <TooltipProvider>
      {
        datasets.length
        ?
        datasets.map((x)=> {
          return <Dataset text={x} handleDelete={()=>handleRemove(x)} />;
        })

        : null
      }
      </TooltipProvider>
      </div>

      {

        datasets.length < 5
          ?
      <Input 
        placeholder="dataset name... (hit Enter)" 
        value={dataset}
        onChange={(e)=>setDataset(e.target.value)}
        onKeyDown={(e)=>{
        if(e.key==="Enter")
          handleAdd();
      }} />
      :null
      }
    </div>
  )

}
