'use client'
import { CategoryInput } from "@/app/components/categoryInput/category-input"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { supabase } from "../utils/supabase/supabase-client";
import { useAccount } from "@/app/hooks/use-account";
import { useToast } from "@/hooks/use-toast";
import { LoadingIndicator } from "../home/top-navigation-bar";





export default function Body({ session }) {

  const [name, setName] = useState(null);
  const [description, setDescription] = useState(null);
  const [datasetFile, setdatasetFile] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);


  const account = useAccount(session ? session.user.id : null);


  const { toast } = useToast();


  const uploadDataset = async (file) => {

    if(!file.name.endsWith(".zip"))
    {
      toast({
        title: "dataset must be in a zipfile.",
        description: "We only support zipfiles for datasets!"
      });

      return;
    }


    const { data, error } = await supabase.storage
      .from("datasets")
      .upload(`public/${file.name}`, file, {
        cacheControl: "3600",
        upsert: false
      });


    if(error)
    {
      toast({
        title: error.error,
        description: error.message,
      });
    }


    
    return !error ? data.path : null;
  }



  const handleSubmit = async () => {

    if(!account) return;

    setLoading(true);


    const datasetFilePath = await uploadDataset(datasetFile);


    if(!datasetFilePath)
    {
      setLoading(false);
      return
    }


    const response = await supabase
      .from("Dataset")
      .insert({
        name: name,
        categories: categories,
        author: account.id,
        description: description,
        dataset: datasetFilePath,
        size: datasetFile.size,
        author: account.id,
      });


    if(response.error)
    {
      toast({
        title: "Failed to upload the dataset.",
        description: "Please try again..."
      });
    }

    else{
      toast({
        title: "Successfully uploaded your dataset!",
      });
    }

    setLoading(false);
  }


  const isDisabled = () => {
    if(!name || !datasetFile || !categories.length || !description)
      return true;

    return false;
  }


  if(loading)
  {
    return(
      <div className="w-full h-[100vh] flex flex-col justify-center">
        <LoadingIndicator />
      </div>
    )
  }


  return (
    <div className="w-full h-[100vh] overflow-y-scroll flex flex-col p-10 gap-10">

      <div className="w-full flex flex-row justify-center">

        <div className="w-full max-w-[400px] flex flex-col gap-5">
          <Label>dataset Name</Label>

          <Input 
            placeholder="name"
            className="w-full max-w-[400px] p-2"
            onChange={(e)=>setName(e.target.value)}
          />
        </div>
      </div>



      <div className="w-full flex flex-row justify-center">
        <div className="w-full max-w-[400px] flex flex-col gap-5">
          <Label>Dataset Describtion (Markdown Supported)</Label>

          <textarea placeholder="description... (you can paste markdown here)" className="border-[0.5px] min-h-[100px] rounded-md p-2 outline-none" onChange={(e)=>setDescription(e.target.value)} />
        </div>
      </div>



      <div className="w-full h-[auto] flex flex-row justify-center">

        <div className="w-full max-w-[400px] flex flex-col gap-5">
        <Label>dataset file (zip file only)</Label>

          <Input type="file" placeholder="dataset file" className="w-full max-w-[400px]" onChange={(e)=>{
            if(e.target.files && e.target.files.length)
            {
              setdatasetFile(e.target.files[0])
            }
          }} />
        </div>

      </div>



      <div className="w-full h-fit flex flex-row justify-center">

        <div className="w-full max-w-[400px] p-2">
          <CategoryInput categories={categories} setCategories={setCategories} />

        </div>
      </div>


      <div className="w-full flex flex-row justify-center">
        <Button onClick={()=>handleSubmit()} disabled={isDisabled()} className={"w-full max-w-[400px]"}>
          Publish
        </Button>
      </div>

      <div className="pb-10">
      </div>

    </div>
  )

}




