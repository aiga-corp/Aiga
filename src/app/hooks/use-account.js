"use client"
import * as React from "react";
import { supabase } from "../components/utils/supabase/supabase-client";


export function useAccount(uuid) {

  const [value, setValue] = React.useState(false);

  React.useEffect(()=> {

    const getAccount = async () => {

      const response = await supabase
        .from("Account")
        .select("*")
        .eq("user", uuid)
        .limit(1);

      if(!response.error && response.data.length)
        setValue(response.data[0]);
      console.log(response)
    }

    if(uuid && !value)
    {
      getAccount();
    }

  }, [uuid])

  return value;
}
