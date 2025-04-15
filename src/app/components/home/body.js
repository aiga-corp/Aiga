'use client'

import Datasets from "../tabs/datasets";
import Forum from "../tabs/forum";
import Models from "../tabs/models";


const renderSelectionBody = (selection) => {
  switch(selection)
  {
    case "models":
      return <Models />;

    case "datasets":
      return <Datasets />;


    case "forum":
      return <Forum />;
  }
}



export const Body = ({selected, setSelected}) => {


  return (
    <div className="w-full h-full bg-background">
      {renderSelectionBody(selected)}
    </div>
  )
}
