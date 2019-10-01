const playMatch = async (home, away) => {
  return new Promise((resolve, reject) => {
    const matchTime = 5000 + Math.floor(Math.random() * 2000);
    setTimeout(() => {
      const winnerIndex = Math.floor(Math.random() * 2);
      if(winnerIndex === 0){
        resolve({
          winner: home,
          loser: away
        })
      } else {
        resolve({
          winner: away,
          loser: home
        })
      }
    }, matchTime);
  });
};

export const randomTeamSelection = (teams, total) => {
  const pairs = [];
  const alreadyPaired = [];
  teams = teams.map(team => team.winner);
  while (pairs.length !== Math.floor(teams.length / 2)) {
    let teamOneId = Math.floor(Math.random() * teams.length);
    while (alreadyPaired.includes(teamOneId))
      teamOneId = Math.floor(Math.random() * teams.length);

    let teamTwoId = Math.floor(Math.random() * teams.length);
    while (alreadyPaired.includes(teamTwoId) || teamOneId === teamTwoId)
      teamTwoId = Math.floor(Math.random() * teams.length);

    pairs.push({
      home: teams[teamOneId],
      away: teams[teamTwoId],
      teams: [teams[teamOneId], teams[teamTwoId]],
      matchId: `${teamOneId} - ${teamTwoId}`
    });

    alreadyPaired.push(teamOneId);
    alreadyPaired.push(teamTwoId);
  }
  return pairs;
};

export const competePairs = async pairs => {
  const roundMatches = [];
  pairs.forEach(pair => {
    roundMatches.push(playMatch(pair.home, pair.away));
  });
  const results = await Promise.all(roundMatches);
  return results;
};
