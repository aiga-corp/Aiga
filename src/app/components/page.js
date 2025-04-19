'use client'

import { CategoryInput } from "@/app/components/categoryInput/category-input"
import { Input } from "@/components/ui/input"
import { useState } from "react";


export default async function Page() {

  const [categories, setCategories] = useState([]);


  return (
    <div className="w-full h-[100vh] flex flex-col p-10 gap-10">
      <div className="w-full flex flex-row justify-center">
        <Input 
          placeholder="Model Name"
          className="w-full max-w-[400px] p-2"
        />
      </div>


      <div className="w-full flex flex-row justify-center">
        <Input 
          placeholder="Model Name"
          className="w-full max-w-[400px] p-2"
        />
        <CategoryInput categories={categories} setCategories={setCategories} />
      </div>


      <div className="w-full flex flex-row justify-center">
        <Input 
          placeholder="Model Name"
          className="w-full max-w-[400px] p-2"
        />
      </div>


    </div>
  )

}



