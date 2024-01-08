import { NewPassword } from "../_module/components/NewPassword";

export default function Page({ searchParams }) {
  return (
    <>
      <div className="flex flex-col justify-center items-center box-border h-full">
        <div className="h-full w-full p-4 flex flex-col gap-5 justify-center items-center box-border">
          <div className="w-3/4">
            <p className="text-3xl font-bold mb-1">
              New password access
            </p>
            <p className='text-base text-[#747474]'>
              Validate the new password
            </p>
          </div>
          <NewPassword memberId={searchParams.memberId}></NewPassword>
        </div>
      </div>
    </>
  )
}
