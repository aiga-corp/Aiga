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
  const [loading, setLoading] = useState(false);


  const account = useAccount(session ? session.user.id : null);


  const { toast } = useToast();


  const uploadModel = async (file) => {

    if(!file.name.endsWith(".ipynb"))
    {
      toast({
        title: "Model must be in a jupyter notebook.",
        description: "We only support jupyter notebooks!"
      });

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

    if(!account) return;

    setLoading(true);


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
        link: link && link.includes("github.com") ? link : null,
        inputType: inputType,
        author: account.id,
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
    if(!name || !modelFile || !categories.length || !description || !inputType)
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
            placeholder="github link (optional)"
            className="w-full max-w-[400px] p-2"
            onChange={(e)=>setLink(e.target.value)}
          />
        </div>
      </div>

      <div className="w-full flex flex-row justify-center">
        <div className="w-full max-w-[400px] flex flex-col gap-5">
          <Label>Model Describtion (Markdown Supported)</Label>

          <textarea placeholder="description... (you can paste markdown here)" className="border-[0.5px] min-h-[100px] rounded-md p-2 outline-none" onChange={(e)=>setDescription(e.target.value)} />
        </div>
      </div>



      <div className="w-full h-[auto] flex flex-row justify-center">

        <div className="w-full max-w-[400px] flex flex-col gap-5">
        <Label>Model file (jupyter notebook)</Label>

          <Input type="file" placeholder="model file" className="w-full max-w-[400px]" onChange={(e)=>{
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
                <SelectItem value="tabular">Tabular</SelectItem>
                <SelectItem value="Audio">Audio</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
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




export function UpdateBody({ model, account }) {

  const [name, setName] = useState(model.name);
  const [description, setDescription] = useState(model.description);
  const [modelFile, setModelFile] = useState(null);
  const [categories, setCategories] = useState(model.categories);
  const [link, setLink] = useState(model.link);
  const [inputType, setInputType] = useState(model.inputType);
  const [loading, setLoading] = useState(false);


  const { toast } = useToast();


  const uploadModel = async (file) => {

    if(!file.name.endsWith(".ipynb"))
    {
      toast({
        title: "Model must be in a jupyter notebook.",
        description: "We only support jupyter notebooks!"
      });

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

    if(!account) return;

    setLoading(true);


    let modelFilePath = null;

    if(modelFile)
      modelFilePath = await uploadModel(modelFile);



    let obj = {
        name: name,
        author: account.id,
        link: link && link.includes("github.com") ? link : null,
        inputType: inputType,
        author: account.id,
        description: description,
        categories: categories
      };


    if(modelFile)
    {
      obj['model'] = modelFilePath;
      obj['size'] = modelFile.size;
    }


    const response = await supabase
      .from("Model")
      .update(obj)
      .eq("id", model.id);


    if(response.error)
    {
      toast({
        title: "Failed to update the model.",
        description: "Please try again..."
      });
    }

    else{
      toast({
        title: "Successfully updated your model!",
      });
    }

    setLoading(false);
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
            value={name}
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
            value={link}
            placeholder="github link (optional)"
            className="w-full max-w-[400px] p-2"
            onChange={(e)=>setLink(e.target.value)}
          />
        </div>
      </div>

      <div className="w-full flex flex-row justify-center">
        <div className="w-full max-w-[400px] flex flex-col gap-5">
          <Label>Model Describtion (Markdown Supported)</Label>

          <textarea value={description} placeholder="description... (you can paste markdown here)" className="border-[0.5px] rounded-md p-2 outline-none" onChange={(e)=>setDescription(e.target.value)} />
        </div>
      </div>



      <div className="w-full h-[auto] flex flex-row justify-center">

        <div className="w-full max-w-[400px] flex flex-col gap-5">
        <Label>Model file (jupyter notebook)</Label>

          <Input type="file" placeholder="model file" className="w-full max-w-[400px] min-h-[100px]" onChange={(e)=>{
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
            defaultValue={inputType}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select input type" />
            </SelectTrigger>

            <SelectContent>
              <SelectGroup>
                <SelectItem value="text">Text</SelectItem>
                <SelectItem value="image">Image</SelectItem>
                <SelectItem value="tabular">Tabular</SelectItem>
                <SelectItem value="Audio">Audio</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

      </div>


      <div className="w-full h-fit flex flex-row justify-center">

        <div className="w-full max-w-[400px] p-2">
          <CategoryInput categories={categories.map((x)=>JSON.parse(x))} setCategories={setCategories} />

        </div>
      </div>


      <div className="w-full flex flex-row justify-center">
        <Button onClick={()=>handleSubmit()} className={"w-full max-w-[400px]"}>
          Publish new version
        </Button>
      </div>

      <div className="pb-10">
      </div>

    </div>
  )

}



