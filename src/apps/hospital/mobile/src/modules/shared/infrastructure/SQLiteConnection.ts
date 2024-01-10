/* eslint-disable @typescript-eslint/no-var-requires */
import { Asset } from 'expo-asset';
import * as FileSystem from 'expo-file-system';
import * as SQLite from 'expo-sqlite';
export class SQLiteConnection {
  private db!: SQLite.SQLiteDatabase;

  get connection() {
    return this.db;
  }

  async connect(): Promise<void> {
    if (!(await FileSystem.getInfoAsync(FileSystem.documentDirectory + 'SQLite')).exists) {
      await FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + 'SQLite');
    }
    await FileSystem.downloadAsync(
      Asset.fromModule(require('../../../../assets/hospital.db')).uri,
      FileSystem.documentDirectory + 'SQLite/hospital.db'
    );
    this.db = SQLite.openDatabase('myDatabaseName.db');
  }
}
