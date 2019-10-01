import { competePairs } from "../utilities/tournamentUtil";

export const fetchTeams = () => {
  const response = fetch(
    "https://raw.githubusercontent.com/bttmly/nba/master/data/teams.json"
  );
  return dispatch => {
    response
      .then(res => res.json())
      .then(res => {
        let teams = res.slice(0, 16);
        dispatch({
          type: "UPDATE_TEAMS",
          payload: teams
        });
      })
      .catch(err => console.error(err));
  };
};

export const startTournament = initParticipants => {
  return dispatch => {
    dispatch({
      type: "UPDATE_STATUS",
      payload: "STARTED"
    });
    dispatch({
      type: "UPDATE_WINNER",
      payload: null
    });
    dispatch({
      type: "UPDATE_CURRENT_ROUND_PARTICIPANTS",
      payload: initParticipants.map(participant => ({
        winner: participant.teamId,
        loser: null
      }))
    });
    dispatch({
      type: "UPDATE_ROUNDS",
      payload: [
        initParticipants.map(participant => ({
          winner: participant.teamId,
          loser: null
        }))
      ]
    });
  };
};

export const findCurrentRoundParticipants = teams => {
  return dispatch => {
    dispatch({
      type: "UPDATE_CURRENT_ROUND_PARTICIPANTS",
      payload: teams
    });
  };
};

export const startNewRound = (pairs, rounds, teams, roundInProgress) => {
  const liveMatches = competePairs(pairs);
  return dispatch => {
    liveMatches
      .then(results => {
        if (teams.length === rounds[0].length) {
          rounds.shift();
        }
        rounds.push(results);
        dispatch({
          type: "UPDATE_ROUND_IN_PROGRESS",
          payload: roundInProgress + 1
        });
        dispatch({
          type: "UPDATE_ROUNDS",
          payload: rounds
        });
        dispatch({
          type: "UPDATE_CURRENT_ROUND_PARTICIPANTS",
          payload: results
        });
      })
      .catch(err => {
        console.error(`error in competing pairs, ${err}`);
      });
  };
};

export const setWinner = winner => {
  return dispatch => {
    dispatch({
      type: "UPDATE_WINNER",
      payload: winner
    });
    dispatch({
      type: "UPDATE_STATUS",
      payload: "FINISHED"
    });
    dispatch({
      type: "UPDATE_ROUND_IN_PROGRESS",
      payload: 0
    });
  };
};
