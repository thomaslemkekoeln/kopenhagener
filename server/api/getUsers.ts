export default defineEventHandler(async (event) => {
  const db = useDatabase("counterDB");
  await db.sql`CREATE TABLE IF NOT EXISTS users
  (
  ID INTEGER PRIMARY KEY AUTOINCREMENT,
  Name TEXT,
  Handicap TEXT,
  Selected TEXT,
  Result TEXT
  )
  `;

  const users = await db.sql`SELECT * FROM users`;
  return users.rows;
});
