'use client'
import { useEffect, useState } from "react";
import { Backdrop, Spinner } from "ui";
import { useSharedStore } from "../store/SharedState";

export function Loader() {
  const [open, setOpen] = useState(false)
  const { sharedState } = useSharedStore()
  useEffect(() => {
    setOpen(sharedState.loading)
  }, [sharedState.loading])
  return (
    <Backdrop open={open}>
      <Spinner/>
    </Backdrop>
  )
}
