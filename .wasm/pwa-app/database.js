import sqlite3InitModule from '@sqlite.org/sqlite-wasm';
import dbUrl from './db.sqlite3?url';

export const init = async () => {
  const sqlite3 = await sqlite3InitModule();
  const dbContents = await fetch(dbUrl).then((r) => r.arrayBuffer());

  // Set up a new SQLite in-memory DB from the loaded contents
  const bytes = new Uint8Array(dbContents);
  const db = new sqlite3.oo1.DB();
  const p = sqlite3.wasm.allocFromTypedArray(bytes);

  let rc = sqlite3.capi.sqlite3_deserialize(
    db.pointer,
    'main',
    p,
    bytes.length,
    bytes.length,
    sqlite3.capi.SQLITE_DESERIALIZE_FREEONCLOSE |
      sqlite3.capi.SQLITE_DESERIALIZE_RESIZEABLE
  );
  db.checkRc(rc);

  return db;
};
