'use client'

import { useRouter } from "next/navigation"
import { Button } from "ui"

export function OkButton({ route }) {
  const location = useRouter()
  const goTo = () => location.push(route)
  return (
    <Button width={'percent.small'} className="mt-[20px]" onClick={goTo}>Login</Button>
  )
}
