'use client'
import { useTheme } from "next-themes";
import HomeLayout from "./components/home/layout";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";



export default function Page() {


  const theme = useTheme();


  const router = useRouter();


  return (
    <main className="w-full min-h-[100vh] overflow-x-hidden bg-default flex flex-col overflow-y-scroll">

      <div className="w-full h-[25vh] animate-fade-up flex flex-row justify-between">

      <div className="w-fit h-full animate-fade-up bg-white border-b flex flex-row">
          <div className="w-[230px] animate-fade-up border-r hidden sm:block">
            <img
              className="animate-fade-up animate-once w-[200px] h-[200px] rounded-md"
              src={theme.theme==="dark" ? "images/continent-light.png" : "images/continent-dark.png"}
            />

          </div>


          <div className="p-2 border-r animate-fade-up flex flex-col justify-center">
            <p className="text-[100px] animate-fade-up font-semibold text-black animate-jump-in
    ">
              AIGA
            </p>

            <p className="place-self-center text-md font-semibold pb-5 text-black max-w-[200px]">
              AI Governance Africa
            </p>
          </div>
        </div>




        <div className="p-2 border-r animate-fade-up flex flex-row justify-center w-full bg-white hidden md:block gap-5 border-b">

          <div className="flex flex-col justify-center h-full">

            <div className="w-full flex flex-row justify-center">

              <img
                src="logo.png"
                className="w-[100px] rounded-l-md"
              />

              <div className="flex flex-col p-1 border rounded-r-md">
                <p className="text-xl animate-fade-up font-semibold text-black animate-jump-in place-self-center">
                  A Collaborative Environment
                </p>

                <p className="text-sm animate-fade-up text-black animate-jump-in place-self-center w-[90%]">
                  Collaboratively developing ML solutions with in-browser inferencing applications to address African problems across sectors.
                </p>
              </div>

            </div>
          </div>
        </div>


        <div className="p-0 border-r border-b animate-fade-up flex flex-row justify-center w-full bg-white gap-5">

          <div className="flex flex-col justify-center p-2 gap-4">
            <div className="flex flex-row justify-center">
              <img
                src="logo.png"
                className="w-[120px] object-contain rounded-xl"
              />
            </div>
            
            <p className="text-sm animate-fade-up text-black animate-jump-in place-self-center font-semibold">
              AI Driven Africa
            </p>
          </div>

        </div>

      </div>

 
      <div className="h-[75vh] w-full flex flex-col">

      <div className="h-full w-full animate-jump-in animate-once flex flex-col justify-center min-h-[50vh]"> 

          <img className="object-cover absolute -z-10 w-full h-full" src="images/Wave-1.png" />

          <div className="h-1/2 min-h-[40vh] max-w-[800px] shadow-2xl border rounded-3xl p-5 w-full bg-background self-center flex flex-col justify-between">
            <p className="text-4xl">
              Collaborate, Contribute, Create: The Future of African ML is Here. Be Part of It!
            </p>

            <div className="w-full flex flex-row justify-end">
              <Button className="w-[200px] text-xl animate-bounce animate-ease-in-out" onClick={()=>router.push("/home")}>
                Join Us
              </Button>
            </div>
          </div>


        </div>


        <div className="w-full h-full bg-black p-8 animate-fade-up animate-ease-in-out flex flex-col">
          <div className="w-fit h-full place-self-center flex flex-col gap-5">
            <p className="text-white text-3xl font-extrabold">About Us</p>

            <p className="text-white max-w-[600px] place-self-start">
              We are a platform dedicated to empowering the development of AI solutions for Africa, by Africans and friends of Africa.
            </p>

            <p className="text-white  max-w-[600px] place-self-start">
              We believe that everyone has a role to play in this exciting journey. 
            </p>
              
            <p className="text-white  max-w-[600px] place-self-start">
              Our community welcomes contributions of all forms and sizes, from cutting-edge machine learning models and meticulously curated datasets to valuable insights, enthusiastic word-of-mouth, and the sharing of knowledge. 
            </p>

            <p className="text-white max-w-[600px] place-self-start">
              Join us in building a collaborative ecosystem where every contribution, big or small, helps to shape a brighter, more intelligent future for the continent.
            </p>
          </div>
        </div>



      </div>

     
    </main>
  )

}



