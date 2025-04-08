'use client'
import { Input } from "@/components/ui/input"
import { ModeToggle } from "../theme-toggle"
import { NavigationTabs } from "./NavigationTabs"




export const TopNavigationBar = ({selected, setSelected}) => {



  return (
    <div className="w-full border-b-[0.5px] flex flex-row justify-between p-4">

      <div className="min-h-full flex flex-col justify-center">
      <ModeToggle />
      </div>

      <div className="w-full"></div>

      <NavigationTabs setSelected={setSelected} selected={selected} />

      <div className="w-full"></div>
    </div>
  )
}
