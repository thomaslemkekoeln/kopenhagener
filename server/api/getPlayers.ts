export default defineEventHandler(async (event) => {
  const db = useDatabase("counterDB");

  const users = await db.sql`SELECT * FROM users WHERE Selected='true'`;
  return users.rows;
});
