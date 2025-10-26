export default function useGetKopenhagenResults(players) {
  const resultRows = getCompleteRows(players);
  let resultList = [];
  resultRows.forEach((row) => {
    row.forEach((player) => {
      resultList.push({
        name: Object.keys(player)[0],
        points: getCalculatedPoints(player, row),
      });
    });
  });
  return resultList;
}

const getCompleteRows = (players) => {
  let completeRowNumbers = [];

  for (let i = 0; i < 18; i++) {
    if (hasResults(players, i)) completeRowNumbers.push(i + 1);
  }

  let resultRows = [];
  completeRowNumbers.forEach((row) => {
    let playerResults = [];
    players.forEach((player) => {
      const results = player.handicapResult[row - 1];
      playerResults.push({
        [player.name]: results[row],
      });
    });
    resultRows.push([...playerResults]);
  });
  return resultRows;
};

const hasResults = (players, row) => {
  let resultsInAllColumns = false;
  if (players) {
    players.forEach((player) => {
      if (player.handicapResult) {
        resultsInAllColumns = player.handicapResult[row][row + 1] > 0;
      }
    });
  }
  return resultsInAllColumns;
};
const getCalculatedPoints = (player, row) => {
  let res = parseInt(Object.values(player)[0]);
  const pos =
    row.filter((item) => {
      return parseInt(Object.values(item)) < res;
    }).length + 1;
  const equals = row.filter((item) => {
    return parseInt(Object.values(item)) === res;
  }).length;
  let points = 0;
  for (let i = 0; i < equals; i++) {
    points = points + (row.length - pos) - i;
  }

  //console.log("pos, equals, res", pos, equals, res);
  return points / equals;
};
