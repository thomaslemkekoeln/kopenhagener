export default defineEventHandler(async (event) => {
  const requestBody = await readBody(event);
  console.log("requestBody", requestBody);
  const db = useDatabase("counterDB");

  await db.sql`INSERT INTO users (Name, Handicap, Result) VALUES (${
    requestBody.name
  }, ${requestBody.handicap}, ${JSON.stringify(requestBody.result)})`;
});
