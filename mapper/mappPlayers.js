export default function mappPlayers(players) {
  const input = players || [];
  const outPut = [];
  input.forEach((player) => {
    outPut.push(mappPlayer(player));
  });
  return outPut;
}
function mappPlayer(player) {
  return {
    name: player.name,
    handicap: player.handicap || [],
    selected: player.selected,
    result: player.result || [],
    handicapResult: mappResult(player.result, player.handicap) || [],
  };
}
function mappResult(result, handicap) {
  let handicapResult = [];
  result.forEach((item) => {
    if (
      Object.values(item)[0] > 0 &&
      handicap.includes(parseInt(Object.keys(item)[0]))
    ) {
      handicapResult.push({
        [Object.keys(item)[0]]: Object.values(item)[0] - 1,
      });
    } else {
      handicapResult.push(item);
    }
  });
  return handicapResult;
}
