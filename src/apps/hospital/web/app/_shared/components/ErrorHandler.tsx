'use client'
import { useEffect, useState } from "react";
import { Backdrop } from "ui";
import { useSharedStoreContext } from "../store/SharedContext";

export  function ErrorHandler() {
  const [open, setOpen] = useState(false)
  const { sharedState } = useSharedStoreContext()
  useEffect(() => {
    if(sharedState.error) {
      setOpen(true)
    }
  }, [sharedState.error])
  return (
    <Backdrop open={open}>
      hay un error
    </Backdrop>
  )
}
