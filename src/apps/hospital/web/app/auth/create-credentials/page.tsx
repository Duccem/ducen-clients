import { CreateCredentialsForm } from "../_module/components/CreateCredentialsForm";

export default function Page() {
  return (
    <>
      <div className="flex flex-col justify-center items-center box-border h-full">
        <div className="h-full w-full p-4 flex flex-col gap-5 justify-center items-center box-border">
          <div className="w-3/4">
            <p className="text-3xl font-bold mb-1">
              Access Credentials
            </p>
            <p className='text-base text-[#747474]'>
              Username and password to login
            </p>
          </div>
          <CreateCredentialsForm></CreateCredentialsForm>
        </div>
      </div>
    </>
  )
}
