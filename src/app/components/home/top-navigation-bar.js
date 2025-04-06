import { ModeToggle } from "../theme-toggle"



export const TopNavigationBar = () => {


  return (
    <div className="w-full flex flex-row justify-between border-b-[0.5px] h-full max-h-[100px] p-8">

      <ModeToggle />
    </div>
  )
}
