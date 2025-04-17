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


  return (
    <div className="w-full border-b-[0.5px] flex flex-row justify-between p-1">

      <div className="flex flex-row w-full gap-2">
        <div className="min-h-full flex flex-col justify-center">
          <Button variant="light" className="w-fit h-fit">
            <img src={"logo.png"} className="rounded-md min-w-[50px] max-w-[50px]" />
          </Button>
        </div>
        

        <div className="min-h-full flex flex-col justify-center">
        <ModeToggle />
        </div>
      </div>

      <div className="w-full"></div>


      <div className="min-h-full flex flex-col justify-center">
        <NavigationTabs setSelected={setSelected} selected={selected} />
      </div>

      <div className="w-full"></div>

      {
        account || session
          ?

            <div className="min-h-full flex flex-col justify-center">
              <Link href={"/new/model"} className="mr-10">
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
