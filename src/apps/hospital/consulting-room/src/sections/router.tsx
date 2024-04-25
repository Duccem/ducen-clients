import { createBrowserRouter } from "react-router-dom";
import { IndexGuard } from "../modules/shared/components/IndexGuard";
import { AuthRouter } from "./auth/router";
import { HomeRouter } from "./home/router";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: IndexGuard,
  },
  AuthRouter,
  HomeRouter,
]);
