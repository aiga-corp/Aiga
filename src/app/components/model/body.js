'use client'
import { CategoryInput } from "@/app/components/categoryInput/category-input"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { supabase } from "../utils/supabase/supabase-client";
import { useAccount } from "@/app/hooks/use-account";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import { LoadingIndicator } from "../home/top-navigation-bar";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";



export default function Body({ session }) {

  const [name, setName] = useState(null);
  const [description, setDescription] = useState(null);
  const [modelFile, setModelFile] = useState(null);
  const [categories, setCategories] = useState([]);
  const [link, setLink] = useState(null);
  const [inputType, setInputType] = useState("text");
  const [showModelConverter, setShowModelConverter] = useState(false);
  const [loading, setLoading] = useState(false);


  const account = useAccount(session ? session.user.id : null);


  const { toast } = useToast();


  const uploadModel = async (file) => {

    if(!file.name.endsWith(".onnx"))
    {
      toast({
        title: "Model file must be a \".onnx\"",
        description: "We only support ONNX model files!"
      });

      setShowModelConverter(true);

      return;
    }


    const { data, error } = await supabase.storage
      .from("models")
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

    setLoading(true);

    setShowModelConverter(false);

    const modelFilePath = await uploadModel(modelFile);


    if(!modelFilePath)
    {
      setLoading(false);
      return
    }


    const response = await supabase
      .from("Model")
      .insert({
        name: name,
        categories: categories,
        author: account.id,
        description: description,
        model: modelFilePath,
        size: modelFile.size,
        link: link,
        inputType: inputType,
        author: account.id
      });


    if(response.error)
    {
      toast({
        title: "Failed to upload the model.",
        description: "Please try again..."
      });
    }

    else{
      toast({
        title: "Successfully uploaded your model!",
      });
    }

    setLoading(false);
  }


  const isDisabled = () => {
    if(!name || !modelFile || !categories.length || !description || !link || !inputType)
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
          <Label>Model Name</Label>

          <Input 
            placeholder="name"
            className="w-full max-w-[400px] p-2"
            onChange={(e)=>setName(e.target.value)}
          />
        </div>
      </div>


      <div className="w-full flex flex-row justify-center">

        <div className="w-full max-w-[400px] flex flex-col gap-5">
          <Label>Model Github Link</Label>

          <Input 
            placeholder="github link"
            className="w-full max-w-[400px] p-2"
            onChange={(e)=>setLink(e.target.value)}
          />
        </div>
      </div>

      <div className="w-full flex flex-row justify-center">
        <div className="w-full max-w-[400px] flex flex-col gap-5">
          <Label>Model Describtion (Markdown Supported)</Label>

          <textarea placeholder="description... (you can paste markdown here)" className="border-[0.5px] rounded-md p-2 outline-none" onChange={(e)=>setDescription(e.target.value)} />
        </div>
      </div>



      <div className="w-full h-[auto] flex flex-row justify-center">

        <div className="w-full max-w-[400px] flex flex-col gap-5">
        <Label>Model file (ONNX)</Label>

          <Input type="file" placeholder="model file onnx" className="w-full max-w-[400px]" onChange={(e)=>{
            if(e.target.files && e.target.files.length)
            {
              setModelFile(e.target.files[0])
            }
          }} />
        </div>

      </div>


      <div className="w-full h-[auto] flex flex-row justify-center">

        <div className="w-full max-w-[400px] flex flex-col gap-5">
        <Label>Model Input Type</Label>

          <Select
            onValueChange={(v)=>setInputType(v)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select input type" />
            </SelectTrigger>

            <SelectContent>
              <SelectGroup>
                <SelectItem value="text">Text</SelectItem>
                <SelectItem value="image">Image</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

      </div>

      {
        showModelConverter
        ?
        <div className="w-full h-[auto] flex flex-row justify-center gap-1">
          <div className="w-full max-w-[400px] flex flex-col gap-5">
            <p className="font-semibold">Check out tutorials on how to convert your model to ONNX: </p>
              <Link target="_blank" className="text-blue-500" href={"https://github.com/onnx/tutorials"}>
                https://github.com/onnx/tutorials
              </Link>
          </div>
        </div>
        :
          null
      }


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



