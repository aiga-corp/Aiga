'use server'
import { createClient } from "@/app/components/utils/supabase/supabase-server";
import { ViewDataset } from "@/app/components/view-dataset/view-dataset";




export default async function Page({ params }) {

  const { id } = await params


  const supabase = await createClient();

  const response = await supabase.auth.getSession();

  return (
    <ViewDataset datasetId={id} session={response.data && response.data.session} />
  )

}

