
import { TypeRegisterCards } from "../_module/components/TypeRegisterCards";

export default function Page() {
  return (
    <>
      <div className='h-full w-full flex box-border py-[20px] px-[30px] flex-col justify-center items-center'>
        <div className='w-3/4 mb-4'>
          <p className='text-2xl font-semibold'>How you want to register?</p>
        </div>
        <div className='w-3/4 flex flex-col gap-6'>
          <TypeRegisterCards/>
        </div>
      </div>
    </>
  )
}
