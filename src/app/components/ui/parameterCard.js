import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { Dataset } from "../datasetsInput/datasets-input";
import { useTheme } from "next-themes";
import MarkdownPreview from '@uiw/react-markdown-preview';
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { supabase } from "../utils/supabase/supabase-client";






export const ParameterCard = ({parameter}) => {


  const bs = require("byte-size");


  const size = bs(parameter.size);

  const hdate = require("human-date");



  const handleDownload = async () => {
    const response = supabase 
      .storage
      .from("models")
      .getPublicUrl(parameter.parameters);


    if(response.data && response.data.publicUrl)
      window.open(response.data.publicUrl, "_blank");

  }




  const theme = useTheme();

  return (
    <Card className="w-1/2 max-w-[500px] min-w-[300px] place-self-center">
      <CardHeader className="p-4 border-b-[0.5px] flex flex-row justify-between">

        <div className="w-full flex flex-row justify-between">
          <div className="flex flex-col gap-1">

            <p className="font-semibold text-xl">
              {parameter.parameters.replace("public/", "")}
            </p>


            <p className="text-xs font-semibold text-zinc-500">By {parameter.author.displayName}</p>
          </div>

          <div className="flex flex-col gap-1">

            <p className="text-xl font-semibold place-self-end">{size.value} {size.unit}</p>

            <p className="text-xs font-semibold text-zinc-500">{hdate.relativeTime(parameter.created_at)}</p>
          </div>
        </div>


      </CardHeader>


      <div className="w-full p-2 flex flex-row justify-end">
        <Button variant="light" onClick={handleDownload}>
          <Download />
        </Button>
      </div>



      <CardContent
        className="w-full h-fit py-5 flex flex-row justify-center"
      >
        <MarkdownPreview wrapperElement={{
            "data-color-mode": theme.theme
          }} className="p-10 rounded-lg  overflow-hidden" source={parameter.description} />
      </CardContent>



      <CardFooter className="w-full flex flex-wrap py-2 h-fit gap-5">
        <Label>Datasets</Label>
        {parameter.datasets.map((dataset)=> {
          return <Dataset text={dataset} />
        })}
      </CardFooter>
    </Card>
  )
}
