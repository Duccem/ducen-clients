import { UserProvider } from "../user/UserContext";
import { combineComponents } from "./combinedContexts";

const providers = [UserProvider]

export const AppContextProvider = combineComponents(...providers);
