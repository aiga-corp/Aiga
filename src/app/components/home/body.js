'use client'
import Community from "../tabs/community";
import Datasets from "../tabs/datasets";
import Models from "../tabs/models";


const renderSelectionBody = (selection) => {
  switch(selection)
  {
    case "models":
      return <Models />;


    case "datasets":
      return <Datasets />;


    case "community":
      return <Community />;
  }
}



export const Body = ({selected, setSelected}) => {


  return (
    <div className="w-full h-full bg-background">
      {renderSelectionBody(selected)}
    </div>
  )
}
