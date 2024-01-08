import { RegisterGuildForm } from "../_module/components/RegisterGuildForm";

export default function Page() {
  return (
    <>
      <div className='flex justify-center flex-col items-center box-border h-full'>
        <div className='h-full w-full p-4 flex flex-col gap-5 justify-center items-center box-border'>
          <div className='w-3/4'>
            <p className='text-3xl font-bold mb-1'>
              Guild Information
            </p>
            <p className='text-base text-[#747474]'>
              Register the essential information of your guild
            </p>
          </div>
          <RegisterGuildForm></RegisterGuildForm>
        </div>
      </div>
    </>
  )
}
