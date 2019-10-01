const initState = {
  participants: null
};

export default function(state = initState, action) {
  switch (action.type) {
    case "UPDATE_TEAMS":
      return { ...state, participants: action.payload };
    default:
      return state;
  }
}
