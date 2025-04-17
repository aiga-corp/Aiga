'use client'
import { supabase } from "../utils/supabase/supabase-client";
import { Category } from "../categoryInput/category-input"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { LoadingIndicator } from "../home/top-navigation-bar";
import MarkdownPreview from '@uiw/react-markdown-preview';
import { BrainCircuit, Download, Pen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { notFound } from "next/navigation";
import { DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger, Drawer } from "@/components/ui/drawer";
import { useAccount } from "@/app/hooks/use-account";
import { UpdateBody } from "../model/body";
import Link from "next/link";
import { Github } from "@geist-ui/icons";




export const ViewModel = ({modelId, session}) => {

  const account = useAccount(session ? session.user.id : null);


  const [data, setData] = useState(null);

  const fetchModel = async () => {
    const response = await supabase
      .from("Model")
      .select("*, author(*)")
      .eq("id", modelId)
      .maybeSingle();

    if(response.data)
    {
      window.document.title = response.data.name;

      setData(response.data);
    }
    else{
      notFound();
    }

  }


  const theme = useTheme();


  useEffect(()=> {
    if(!data)
      fetchModel();
  }, [!data])


  if(!data)
  {
    return (
      <div className="h-[100vh] w-full flex flex-col justify-center"><LoadingIndicator /></div>
    )
  }

  const bs = require("byte-size");

  const size = bs(data.size);

  const hdate = require("human-date");


  const handleDownload = async () => {
    const response = supabase 
      .storage
      .from("models")
      .getPublicUrl(data.model);


    if(response.data && response.data.publicUrl)
      window.open(response.data.publicUrl, "_blank");


    await supabase
      .from("Model")
      .update({
        downloads: data.downloads+1
      })
      .eq("id", data.id);
  }



  return (
    <div
      className="w-full h-full p-10"
    >
      <Card className="w-full max-w-fit border-[0px] shadow-none place-self-center">
        <CardHeader className="p-4 flex flex-row justify-between">

          <div className="w-full flex flex-row justify-between">
            <div className="flex flex-col gap-1">

              <p className="font-semibold text-xl">
                {data.name}
              </p>

              <p className="text-xs font-semibold text-zinc-500">By {data.author.displayName}</p>
            </div>


            <div className="flex flex-row gap-10">

              <div className="flex flex-col gap-1">

                <p className="text-xl font-semibold place-self-end">{size.value} {size.unit}</p>

                <p className="text-xs font-semibold text-zinc-500">{hdate.relativeTime(data.created_at)}</p>
              </div>


              <div className="flex flex-col gap-1">
                <Button onClick={()=>handleDownload()} variant="light">
                  <Download />
                </Button>

                {
                  data.author.username === account.username
                  ?
                  <Drawer>
                    <DrawerTrigger>
                      <Button variant="light">
                        <Pen />
                      </Button>
                    </DrawerTrigger>

                    <DrawerContent className="h-full">
                      <DrawerHeader>
                        <DrawerTitle>
                          Edit Model
                        </DrawerTitle>
                        <DrawerDescription>
                          Update your model.
                        </DrawerDescription>
                      </DrawerHeader>

                      <div className="p-4 pb-0 w-full h-full">
                          <UpdateBody model={data} account={account} />

                      </div>
                    </DrawerContent>

                  </Drawer>
                  :
                    null
                }

              </div>

            </div>

          </div>

        </CardHeader>

        {
          data.link
          ?
            <div className="w-full flex flex-row gap-2">
              <Github />
              <Link target="_blank" href={data.link} className="text-blue-500">
                Github Repo
              </Link>
            </div>
          :
            null
        }


        <CardContent
          className="w-full h-full py-5 flex flex-row justify-center"
        >
          <MarkdownPreview wrapperElement={{
              "data-color-mode": theme.theme
            }} className="p-10 rounded-lg min-w-[400px] overflow-hidden" source={data.description} />
        </CardContent>


        <CardFooter className="w-full flex flex-wrap py-2 h-fit gap-5 pb-10">
          {data.categories.map((category)=> {
            let c = JSON.parse(category);

            return <Category text={c.tag} />
          })}
        </CardFooter>
      </Card>
    </div>
  )
}
