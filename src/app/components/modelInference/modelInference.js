'use client'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";




//
export function RunModel(model, input, inputType) {

}


export function TextInput({setInput}) {

  return (
    <Textarea placeholder="Text..." onChange={(e)=>setInput(e.target.value)} />

  )
}


export function ImageInput({setInput}) {

  return (
    <Input type="file" placeholder="model file onnx" className="w-full max-w-[400px]" onChange={(e)=>{
      if(e.target.files && e.target.files.length)
      {
        setInput(e.target.files[0])
      }
    }} />
  )
}


export function ModelInference ({model}) {

  const [input, setInput] = useState(null);

  console.log(input);

  const renderInputHandler = () => {
    switch(model.inputType)
    {
      case "text":
        return <ImageInput setInput={setInput} />


      case "image":
        return <TextInput setInput={setInput} />
    }
  }



  return (
    <div className="w-full flex flex-row justify-between gap-5">
      {renderInputHandler()}

      <div className="flex flex-col min-h-full justify-center">
        <Button disabled={!input}>
          run
        </Button>
      </div>
    </div>
  )
 
}
