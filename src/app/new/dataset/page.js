'use client'
import Body from "@/app/components/dataset/body";
import { supabase } from "@/app/components/utils/supabase/supabase-client";




export default async function Page() {


  const response = await supabase.auth.getSession();

  return (
    <Body session={response.data && response.data.session} />
  )

}



