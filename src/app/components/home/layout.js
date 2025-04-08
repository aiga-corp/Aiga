'use client'
import { Body } from "./body";
import { TopNavigationBar } from "./top-navigation-bar"
import { useState } from "react";




export default function HomeLayout({session}) {

  const [selected, setSelected] = useState("models");


  console.log("session: ", session);

  const handleSelect = (value) => {
    if(value)
    {
      setSelected(value);
    }
  }

  return (
     <div className="h-[100vh] w-full bg-background">
      <TopNavigationBar setSelected={handleSelect} selected={selected} />
      
      <Body selected={selected} setSelected={setSelected} />
    </div>
  )
}
