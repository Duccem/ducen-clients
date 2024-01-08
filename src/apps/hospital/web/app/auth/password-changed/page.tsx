
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { OkButton } from "../_module/components/OkButton";


export default function Page() {
  return (
    <>
      <div className="flex flex-col justify-center items-center box-border h-full">
        <div className="h-full w-full p-4 flex flex-col gap-5 justify-start items-center box-border">
          <div className="w-3/4">
            <div className="rounded-full border-2 border-black flex justify-center items-center w-[150px] h-[150px] mx-auto my-8 text-5xl shadow-[4px_4px_var(--dark-gray)]">
              <FontAwesomeIcon icon={faCheck}/>
            </div>
            <p className="text-3xl font-bold mb-1">
              Your password has been changed
            </p>
            <p className='text-base text-[#747474]'>
              You can now login with your new password
            </p>
            <OkButton route={'/auth/login'}></OkButton>
          </div>
        </div>
      </div>
    </>
  )
}
