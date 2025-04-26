'use client'
import { supabase } from "../utils/supabase/supabase-client";
import { Category } from "../categoryInput/category-input"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { LoadingIndicator } from "../home/top-navigation-bar";
import MarkdownPreview from '@uiw/react-markdown-preview';
import { Download, Pen, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { notFound } from "next/navigation";
import { DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger, Drawer } from "@/components/ui/drawer";
import { useAccount } from "@/app/hooks/use-account";
import { ParametersBody, ParametersListBody, UpdateBody } from "../model/body";
import Link from "next/link";
import { Github } from "@geist-ui/icons";




export const ViewModel = ({modelId, session}) => {

  const account = useAccount(session ? session.user.id : null);


  const [data, setData] = useState(null);

  const [parametersCount, setParametersCount] = useState(0);


  const fetchParametersCount = async () => {
    const response = await supabase
      .from("Parameters")
      .select("*", {count: "exact", head: true})
      .eq("model", modelId);


    if(response.count)
    {
      setParametersCount(response.count);
    }
  }


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

      fetchParametersCount();
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
                  data.author.user === account.user
                  ?
                  <Drawer>
                    <DrawerTrigger asChild>
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

      <div className="w-full flex flex-row gap-2">
          {
            data.link
            ?
              <div className="w-full flex flex-row gap-2">
                <Github />
                <Link target="_blank" href={data.link} className="text-blue-500 font-semibold">
                  Github Link
                </Link>
              </div>
            :
              null
          }

          <div className="flex flex-col justify-center">

            <div className="flex flex-row">
               <Drawer>
                <DrawerTrigger asChild>
                  <Button className="w-full" variant="light">
                    <Users />
                    Contribute
                  </Button>
                </DrawerTrigger>

                <DrawerContent className="h-full">
                  <DrawerHeader>
                    <DrawerTitle>
                      Contribute to the model
                    </DrawerTitle>
                    <DrawerDescription>
                      Train, save and upload the parameters file for this model here...
                    </DrawerDescription>
                  </DrawerHeader>

                  <div className="p-4 pb-0 w-full h-full">
                    <ParametersBody model={data} account={account} />

                  </div>
                </DrawerContent>
              </Drawer>
            </div>


            <div className="flex flex-row">
               <Drawer>

                <DrawerTrigger asChild>
                  <Button className="w-full" variant="light">
                    Parameters ({parametersCount})
                  </Button>
                </DrawerTrigger>

                <DrawerContent className="h-full p-0">
                  <DrawerHeader>
                    <DrawerTitle>
                      These are the contributed Parameters 
                    </DrawerTitle>
                    <DrawerDescription>
                      Train the model, save the model's state_dict and upload the .pt / .pth
                    </DrawerDescription>
                  </DrawerHeader>
                  <div className="pb-0 w-full h-full p-0">
                    <ParametersListBody model={data} />
                  </div>
                </DrawerContent>

              </Drawer>
            </div>


          </div>

        </div>


        <CardContent
          className="w-full h-full py-5 flex flex-row justify-center"
        >
          <MarkdownPreview wrapperElement={{
              "data-color-mode": theme.theme
            }} className="p-10 rounded-lg min-w-[400px] overflow-hidden" source={data.description} />
        </CardContent>


        <CardFooter className="w-full flex flex-wrap py-2 h-fit gap-5 pb-10">
          {data.categories.map((category,i)=> {
            let c = JSON.parse(category);

            return <Category key={i} text={c.tag} />
          })}
        </CardFooter>
      </Card>
    </div>
  )
}
