export default defineEventHandler(async (event) => {
  const requestBody = await readBody(event);
  const db = useDatabase("counterDB");
  await db.sql`UPDATE users SET Result=${JSON.stringify(
    requestBody.result
  )} WHERE Name=${requestBody.player.name}`;
});
