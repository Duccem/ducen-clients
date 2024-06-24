import { Navigate } from "react-router-dom"

export const IndexGuard = () => {
  return <Navigate to={'/home/dashboard'}></Navigate>
}
