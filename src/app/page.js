'use server'
import { TopNavigationBar } from "./components/home/top-navigation-bar";
import { supabase } from "./components/utils/supabase/supabase";


export default async function Page() {

  const res = await supabase.auth.getSession();
  const data = res.data;

  console.log(data);

  return (
    <div className="h-[100vh] w-full bg-background">
      <TopNavigationBar />
      
    </div>
  )

}



