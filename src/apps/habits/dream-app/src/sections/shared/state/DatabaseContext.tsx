import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { SQLiteDreamRepository } from "../../../modules/Dream/infrastructure/SQLiteDreamRepository";
import { SQLiteConnection } from "../../../modules/shared/infrastructure/SQLiteConnection";

export interface DatabaseConnectionContextProps {
  dreamRepository: SQLiteDreamRepository
}
const DatabaseConnectionContext = createContext<DatabaseConnectionContextProps>({} as DatabaseConnectionContextProps);

export const DatabaseConnectionProvider = ({ children }: any) => {
  const [connection, setConnection] = useState<SQLiteConnection | null>(null);

  const connect = useCallback(async () => {
    const createdConnection = new SQLiteConnection();
    await createdConnection.connect();
    setConnection(createdConnection);
  }, []);

  useEffect(() => {
    if (!connection) {
      connect();
    }
  }, [connect, connection]);

  if (!connection) {
    return null;
  }

  return (
    <DatabaseConnectionContext.Provider
      value={{
        dreamRepository: new SQLiteDreamRepository(connection),
      }}
    >
      {children}
    </DatabaseConnectionContext.Provider>
  );
};

export const useDatabaseConnection = () => useContext(DatabaseConnectionContext);