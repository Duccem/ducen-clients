/* eslint-disable @typescript-eslint/no-unused-vars */
import { SQLiteConnection } from "../../shared/infrastructure/SQLiteConnection";
import { Dream } from "../domain/Dream";
import { DreamRepository } from "../domain/DreamRepository";

export class SQLiteDreamRepository implements DreamRepository {
  constructor(private readonly connection: SQLiteConnection) {}

  async createTable(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.connection.connection.transaction(
        (tx) => {
          tx.executeSql(
            `CREATE TABLE IF NOT EXISTS dreams (
              id TEXT PRIMARY KEY,
              date TEXT NOT NULL,
              start TEXT NOT NULL,
              end TEXT NOT NULL,
              duration INTEGER NOT NULL,
              quality INTEGER NOT NULL,
              lucidity INTEGER NOT NULL,
              state TEXT NOT NULL
            )`,
            [],
            (tx, result) => {
              resolve();
            }
          );
        },
        (error) => reject(error)
      );
    });
  }
  async save(dream: Dream): Promise<void> {
    console.log(dream);
    return new Promise((resolve, reject) => {
      this.connection.connection.transaction(
        (tx) => {
          tx.executeSql(
            `INSERT INTO dreams (id, date, start, end, duration, quality, lucidity, state) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [
              dream.id,
              dream.date.toISOString(),
              dream.start.toISOString(),
              dream.end.toISOString(),
              dream.duration,
              dream.quality,
              dream.lucidity,
              dream.state,
            ],
            (_tx, _result) => {
              resolve();
            }
          );
        },
        (error) => reject(error)
      );
    });
  }

  async findByDate(date: Date): Promise<Dream | null> {
    try {
      const result: any = await this.connection.connection.execAsync(
        [
          {
            sql: `SELECT * FROM dreams WHERE date = ?`,
            args: [date.toISOString()],
          },
        ],
        false
      );
      if (result[0].length === 0) {
        return null;
      }
      return Dream.fromPrimitives(result[0][0]);
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async findByDates(startDate: Date, endDate: Date): Promise<Dream[]> {
    return new Promise((resolve, reject) => {
      this.connection.connection.transaction(
        (tx) => {
          tx.executeSql(
            `SELECT * FROM dreams WHERE date BETWEEN ? AND ?`,
            [startDate.toISOString(), endDate.toISOString()],
            (tx, result) => {
              const dreams: Dream[] = [];
              for (let i = 0; i < result.rows.length; i++) {
                const row = result.rows.item(i);
                dreams.push(Dream.fromPrimitives(row));
              }
              resolve(dreams);
            }
          );
        },
        (error) => reject(error)
      );
    });
  }
}
