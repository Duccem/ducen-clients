'use client'
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { usePathname } from "next/navigation";
export function BackButton({ text, to }) {
  const location = usePathname()
  if (location == '/auth/login') return null;
  return (
    <>
    <Link href={to} className='flex items-center text-black no-underline'>
      <FontAwesomeIcon className='' icon ={faAngleLeft}/>
      <span className="ml-[10px]">
        {text}
      </span>
    </Link>
  </>
  )
}
