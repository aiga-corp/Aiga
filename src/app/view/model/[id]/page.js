'use server'

import { ViewModel } from "@/app/components/view-model/view-model"





export default async function Page({ params }) {

  const { id } = await params

  return (
    <ViewModel modelId={id} />
  )

}

