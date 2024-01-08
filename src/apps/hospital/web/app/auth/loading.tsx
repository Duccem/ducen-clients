import { Backdrop, Spinner } from "ui";

export default function Loading() {
  return (
    <>
      <Backdrop open={true}>
        <Spinner/>
      </Backdrop>
    </>
  )
}
