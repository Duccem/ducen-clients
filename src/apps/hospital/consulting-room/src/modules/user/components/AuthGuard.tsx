import { useUserContext } from "@/modules/user/UserContext";
import { Navigate } from "react-router-dom";


export const AuthGuard = ({ children, redirect }) => {
  const { userState } = useUserContext()
  if(!userState.token) {
    return <Navigate to={redirect}></Navigate>
  }
  return children;
}
