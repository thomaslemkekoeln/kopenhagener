export default defineEventHandler(async (event) => {
  const requestBody = await readBody(event);
  const db = useDatabase("counterDB");
  await db.sql`UPDATE users SET Selected=${requestBody.selected} WHERE Name=${requestBody.name}`;
});
