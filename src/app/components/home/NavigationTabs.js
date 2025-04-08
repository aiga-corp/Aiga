'use client'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ToggleGroup, ToggleGroupItem } from "@radix-ui/react-toggle-group"




export const NavigationTabs = ({selected, setSelected}) => {


  return (
    <ToggleGroup
      type="single"
      className="border-[0.5px] p-2 flex flex-row justify-between rounded-lg w-fit h-fit"
      onValueChange={setSelected}
      value={selected}
    >
      <ToggleGroupItem className={`text-sm font-semibold p-2 rounded-lg ${selected==="models" && "bg-neutral-200 dark:bg-neutral-800"}`} aria-label="models" value="models">
        <p>Models</p>
      </ToggleGroupItem>


      <ToggleGroupItem className={`p-2 text-sm font-semibold rounded-lg ${selected==="datasets" && "bg-neutral-200 dark:bg-neutral-800"}`} aria-label="datasets" value="datasets">
        <p>Datasets</p>
      </ToggleGroupItem>


      <ToggleGroupItem className={`p-2 text-sm font-semibold rounded-lg ${selected==="forum" && "bg-neutral-200 dark:bg-neutral-800"}`} aria-label="forum" value="forum">
        <p>Forum</p>
      </ToggleGroupItem>


    </ToggleGroup>
  )
}
