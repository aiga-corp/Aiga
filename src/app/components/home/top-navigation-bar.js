'use client'
import { NavigationTabs } from "./NavigationTabs"
import { AuthenticationDrawer } from "../authentication/auth-drawer"
import { useState } from "react";
import { useAccount } from "@/app/hooks/use-account";
import { CircleLoader } from "react-spinners";
import Link from "next/link";
import { Plus } from "lucide-react";
import { ModeToggle } from "../theme-toggle";
import Image from "next/image";
import { Button } from "@/components/ui/button";



 

export  const LoadingIndicator = () => {
  return (
    <div className="w-full h-full flex flex-col justify-center bg-zinc-950">

      <div className="w-full flex flex-row justify-center">
        <CircleLoader color="white" size={100} />
      </div>

    </div>
  )
}


export const TopNavigationBar = ({selected, setSelected, session}) => {

  const [isOpen, setIsOpen] = useState(false);
  const account = useAccount(session ? session.user.id : null);

 
  if(!account && session)
  {
    return <LoadingIndicator />
  }


  const getSelectedUrl = () => {
    switch(selected)
    {
      case "models":
        return "/new/model";

      case "datasets":
        return "/new/dataset";

      case "community":
        return "/";
    }
  }


  return (
    <div className="w-full flex flex-row justify-between p-1 border-grid sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">

      <div className="flex flex-row w-fit gap-2">
        <div className="min-h-full flex flex-col justify-center">
          <Button variant="light" className="w-fit h-fit">
            <img src={"logo.png"} className="rounded-md min-w-[50px] max-w-[50px]" />
          </Button>
        </div>
        

        <div className="min-h-full flex flex-col justify-center">
        <ModeToggle />
        </div>
      </div>



      <div className="min-h-full flex flex-col justify-center">
        <NavigationTabs setSelected={setSelected} selected={selected} />
      </div>


      {
        account || session
          ?

            <div className="min-h-full flex flex-col justify-center">
              <Link href={getSelectedUrl()} className="mr-10">
                <Plus />
              </Link>

            </div>

          :
            <div className="min-h-full flex flex-col justify-center">
              <AuthenticationDrawer isOpen={isOpen} setIsOpen={setIsOpen} />
            </div>
      }

    </div>
  )
}
