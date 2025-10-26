export default function useGetStrokeResult(player) {
  let result = 0;
  if (player.result) {
    player.result.forEach((res, index) => {
      if (res[index + 1]) {
        result = result + parseInt(res[index + 1], 10);
      }
    });
  }
  return result;
}
