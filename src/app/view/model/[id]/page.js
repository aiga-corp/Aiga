'use client'

import { supabase } from "@/app/components/utils/supabase/supabase-client";
import { ViewModel } from "@/app/components/view-model/view-model"





export default async function Page({ params }) {

  const { id } = await params

  const response = await supabase.auth.getSession();

  return (
    <ViewModel modelId={id} session={response.data && response.data.session} />
  )

}

