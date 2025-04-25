'use client'
import { supabase } from "../utils/supabase/supabase-client";
import { Body } from "./body";
import { TopNavigationBar } from "./top-navigation-bar"
import { useState } from "react";




export default async function HomeLayout() {

  const [selected, setSelected] = useState("apps");


  const handleSelect = (value) => {
    if(value)
    {
      setSelected(value);
    }
  }


  const response = await supabase.auth.getSession();

  return (
     <div className="h-[100vh] overflow-hidden w-full bg-background">
      <TopNavigationBar setSelected={handleSelect} selected={selected} session={response.data.session} />
      

      <Body selected={selected} setSelected={setSelected} />

    </div>
  )
}
