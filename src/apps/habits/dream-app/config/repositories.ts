import { SQLiteDreamRepository } from "../src/modules/Dream/infrastructure/SQLiteDreamRepository";
import { SQLiteConnection } from "../src/modules/shared/infrastructure/SQLiteConnection";
export const repositories = (DBConnection: SQLiteConnection) => ({
  dreamRepository: new SQLiteDreamRepository(DBConnection),
});
