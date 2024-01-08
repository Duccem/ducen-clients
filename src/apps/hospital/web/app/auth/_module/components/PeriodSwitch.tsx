'use client'
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Switch } from "ui";

export function PeriodSwitch() {
  const [yearly, setYearly] = useState(false);
  const router = useRouter();
  useEffect(() => {
    router.push(`/auth/choose-plan?yearly=${yearly}`)
  }, [yearly])
  return (
    <Switch activeText="Yearly" disableText="Monthly" checked={yearly} onChange={(e) => setYearly(e.target.checked)}></Switch>
  )
}
