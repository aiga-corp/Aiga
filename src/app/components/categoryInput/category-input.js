'use client'
import { Input } from "@/components/ui/input";
import { TooltipTrigger, Tooltip, TooltipContent, TooltipProvider } from "@/components/ui/tooltip";
import { 
  useState,
  useContext,
  useEffect,
  useRef
} from "react";



export const Category = ({handleDelete, text}) => {

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



export const CategoryInput = ({setCategories, categories, hideBorder}) => {

  const [category, setCategory] = useState('');


  const handleAdd = () => {

    if(!category.length) return;

    const newCategory = {"tag": category};

    setCategories(x=>x.filter((i)=> i.tag!=newCategory.tag));

    setCategories(p=>[...p, newCategory]);

    setCategory("");

  }


  const handleRemove = (category) => {
    setCategories(x=>x.filter((i)=> i.tag!=category.tag));
  }



  return (
    <div
      className="w-full h-fit border-1 rounded-lg"
      style={{borderWidth: hideBorder && 0 }}
    >
      <div className="flex flex-wrap w-full h-fit gap-5 pb-10">
        <TooltipProvider>
      {
        categories.length
        ?
        categories.map((x)=> {
          return <Category text={x.tag} handleDelete={()=>handleRemove(x)} />;
        })

        : null
      }
      </TooltipProvider>
      </div>

      {

        categories.length < 5
          ?
      <Input 
        placeholder="category... (hit Enter)" 
        value={category}
        maxLength={20}
        onChange={(e)=>setCategory(e.target.value)}
        onKeyDown={(e)=>{
        if(e.key==="Enter")
          handleAdd();
      }} />
      :null
      }
    </div>
  )

}
