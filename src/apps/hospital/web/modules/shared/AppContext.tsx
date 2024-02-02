import { AuthProvider } from "../auth/AuthContext";
import { combineComponents } from "./combinedContexts";

const providers = [AuthProvider]

export const AppContextProvider = combineComponents(...providers);
