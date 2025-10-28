export default defineEventHandler(async (event) => {
  const db = useDatabase("counterDB");
  const resultArr = [];
  for (let i = 0; i < 18; i++) {
    resultArr.push({ [i + 1]: 0 });
  }
  await db.sql`UPDATE users SET Result=${JSON.stringify(
    resultArr
  )}, Selected='false'`;
});
