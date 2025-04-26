'use client'
import { supabase } from "../utils/supabase/supabase-client";
import { Body } from "./body";
import { TopNavigationBar } from "./top-navigation-bar"
import { useEffect, useState } from "react";




export default function HomeLayout() {

  const [selected, setSelected] = useState("models");
  const [session, setSession] = useState(null);


  const handleSelect = (value) => {
    if(value)
    {
      setSelected(value);
    }
  }


  useEffect(()=> {
    const getSess = async () => {
      const response = await supabase.auth.getSession();

      if(response.data)
      {
        setSession(response.data.session);
      }
    }


    getSess();
  }, [!session])




  return (
     <div className="h-[100vh] overflow-hidden w-full bg-background">
      <TopNavigationBar setSelected={handleSelect} selected={selected} session={session} />
      

      <Body selected={selected} setSelected={setSelected} />

    </div>
  )
}
