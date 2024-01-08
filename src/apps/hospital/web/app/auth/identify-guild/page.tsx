import { IdentifyGuildForm } from "../_module/components/IdentifyGuildForm";

export default function Page() {
  return (
    <>
      <div className="h-full w-full flex box-border py-[20px] px-[30px] flex-col justify-center items-center">
        <div className="w-3/4 mb-4">
          <p className="text-2xl font-semibold">
            Introduce the ID of the Guild
          </p>
        </div>
        <IdentifyGuildForm/>
      </div>
    </>
  )
}
