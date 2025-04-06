import { NavBack } from './components/navback';


export default async function NotFound() {
  return (
    <div className='bg-default-0 h-[100vh] w-full'>

    <div className='w-full flex flex-row justify-start p-5'>
     <NavBack /> 
    </div>


      <div
        className='w-full h-fit flex flex-col justify-center py-10'
      >
        <div
          className='w-full flex flex-row justify-center'
        >
          <div className='flex flex-col'>
            <Image src={"/illustrations/404.svg"} className='w-full h-full' />
            <p
              className='font-semibold font-monospace text-md w-full flex flex-row justify-center'
            >
              404  - "this page does not exist."
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

