const initState = {
  status: 'INIT',
  currentRoundParticipants: [],
  rounds: [],
  roundInProgress: 0,
  winner: null
};

export default function(state = initState, action) {
  switch (action.type) {
    case "CLEAR_DATA": return initState;
    case "UPDATE_STATUS":
      return { ...state, status: action.payload };
    case "UPDATE_CURRENT_ROUND_PARTICIPANTS":
      return { ...state, currentRoundParticipants: action.payload };
    case "UPDATE_ROUNDS": return { ...state, rounds: action.payload };
    case "UPDATE_WINNER": return { ...state, winner: action.payload };
    case "UPDATE_ROUND_IN_PROGRESS": return { ...state, roundInProgress: action.payload };
      default:
      return state;
  }
}
