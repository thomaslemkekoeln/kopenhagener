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
    name: player.Name,
    handicap: player.Handicap ? JSON.parse(player.Handicap) : [],
    selected: player.Selected,
    result: player.Result ? JSON.parse(player.Result) : [],
    handicapResult:
      mappResult(JSON.parse(player.Result), JSON.parse(player.Handicap)) || [],
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
