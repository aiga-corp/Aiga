import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Category } from "../categoryInput/category-input"
import { useRouter } from "next/navigation";






export const DatasetCard = ({dataset}) => {


  const bs = require("byte-size");


  const size = bs(dataset.size);

  const hdate = require("human-date");

  const router = useRouter();


  return (
    <Card className="w-1/2 max-w-[400px] min-w-[300px] place-self-center" onClick={()=>router.push(`/view/dataset/${dataset.id}`)}>
      <CardHeader className="p-4 border-b-[0.5px] flex flex-row justify-between">

        <div className="w-full flex flex-row justify-between">
          <div className="flex flex-col gap-1">

            <p className="font-semibold text-xl">
              {dataset.name}
            </p>

            <p className="text-xs font-semibold text-zinc-500">By {dataset.author.displayName}</p>
          </div>

          <div className="flex flex-col gap-1">

            <p className="text-xl font-semibold place-self-end">{size.value} {size.unit}</p>

            <p className="text-xs font-semibold text-zinc-500">{dataset.updated_at ? `last updated ${hdate.relativeTime(dataset.updated_at)}` : hdate.relativeTime(dataset.created_at)}</p>
          </div>
        </div>

      </CardHeader>


      <CardFooter className="w-full flex flex-wrap py-2 h-fit gap-5">
        {dataset.categories.map((category, i)=> {
          let c = category;

          return <Category key={i} text={c.tag} />
        })}

      </CardFooter>
    </Card>
  )
}
