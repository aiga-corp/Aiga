'use server'
import HomeLayout from "./components/home/layout";
import { supabase } from "./components/utils/supabase/supabase";


export default async function Page() {

  const res = await supabase.auth.getSession();
  const data = res.data;

  if(!data.session)
  {
    console.log("Unauthenticated")
  }


  return (
    <HomeLayout session={data.session} />
  )

}



