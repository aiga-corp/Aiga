'use client'
import { ModeToggle } from "../theme-toggle"
import { NavigationTabs } from "./NavigationTabs"
import { AuthenticationDrawer } from "../authentication/auth-drawer"
import { useState } from "react";
import { useAccount } from "@/app/hooks/use-account";




export const TopNavigationBar = ({selected, setSelected, session}) => {

  const [isOpen, setIsOpen] = useState(false);
  const account = useAccount(session ? session.user.id : null);


  console.log(account)

  return (
    <div className="absolute w-full border-b-[0.5px] flex flex-row justify-between p-1">

      <div className="min-h-full flex flex-col justify-center">
      <ModeToggle />
      </div>

      <div className="w-full"></div>


      <div className="min-h-full flex flex-col justify-center">
        <NavigationTabs setSelected={setSelected} selected={selected} />
      </div>

      <div className="w-full"></div>

      {
        account
          ?
            null
          :
        <div className="min-h-full flex flex-col justify-center">
          <AuthenticationDrawer isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>
      }

    </div>
  )
}
