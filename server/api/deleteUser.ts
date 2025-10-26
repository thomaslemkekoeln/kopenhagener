export default defineEventHandler(async (event) => {
  const requestBody = await readBody(event);
  const db = useDatabase("counterDB");
  db.sql`DELETE FROM users WHERE name = ${requestBody.name}`;
});
