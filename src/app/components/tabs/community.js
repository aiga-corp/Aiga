'use client'
import Link from "next/link"
import { FaDiscord } from "@react-icons/all-files/fa/FaDiscord";
import { FaReddit } from "@react-icons/all-files/fa/FaReddit";
import { FaGithub } from "@react-icons/all-files/fa/FaGithub";




export default function Community() {


  return (
    <div className="w-full h-full flex flex-col p-10 gap-10 overflow-y-scroll pb-20 overflow-x-hidden">

      <div className="w-full flex flex-row justify-center">
        <div className="w-fit gap-5 flex flex-row rounded-md p-5 border">
          <div className="flex flex-col h-full justify-center">
             <FaGithub size={30} /> 
          </div>

          <Link 
            target="_blank"
            href={"https://github.com/aiga-corp"}
            className="text-xl font-semibold"
          >
            GitHub
          </Link>
        </div>
      </div>


      <div className="w-full flex flex-row justify-center">
        <div className="w-fit gap-5 flex flex-row rounded-md p-5 border">
          <div className="flex flex-col h-full justify-center">
             <FaDiscord size={30} /> 
          </div>

          <Link 
            target="_blank"
            href={"https://discord.gg/tNJwEQhMWM"}
            className="text-xl font-semibold"
          >
            Discord
          </Link>
        </div>
      </div>


      <div className="w-full flex flex-row justify-center">
        <div className="w-fit gap-5 flex flex-row rounded-md p-5 border">
          <div className="flex flex-col h-full justify-center">
            <FaReddit size={30} />
          </div>

          <Link 
            target="_blank"
            href={"https://www.reddit.com/r/Aiga/"}
            className="text-xl font-semibold"
          >
            Reddit
          </Link>
        </div>
      </div>


      <hr className="w-full" />

      <div className="w-full max-w-[50vw] min-w-[400px] self-center flex flex-wrap justify-center p-4 gap-5" style={{paddingBottom: 100}}>
        <p className="text-xl font-semibold">
          OPEN-SOURCE AIGA
        </p>

        <p>
          AI Governance Africa is more than just a platform; it's a community-powered initiative designed to boost African participation in the global AI arena. Think of it as a collaborative hub where you can share your PyTorch-based AI models, allowing others to download and fine-tune them. Alternatively, you can upload your pre-trained models via the apps tab, giving users the convenience of running them directly from their browsers.
        </p>


        <p>
We also encourage the sharing of datasets. By uploading your datasets, you incentivize the community to build innovative AI solutions. This is all about fostering collaboration and collectively growing the AI landscape on our continent.
        </p>

        <p>
          As an open-source project, we deeply value transparency and community involvement. If you're interested in contributing to the platform's development, whether through design ideas or future features, you're more than welcome to join us!
        </p>

      </div>

    </div>
  )

}


