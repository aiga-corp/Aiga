'use client'

import { supabase } from "@/app/components/utils/supabase/supabase-client";
import { ViewDataset } from "@/app/components/view-dataset/view-dataset";





export default async function Page({ params }) {

  const { id } = await params

  const response = await supabase.auth.getSession();

  return (
    <ViewDataset datasetId={id} session={response.data && response.data.session} />
  )

}

