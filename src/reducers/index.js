import teamsReaducer from "./teamsReducer";
import { combineReducers } from "redux";
import tournamentReducer from "./tournamentReducer";

export default combineReducers({
  teams: teamsReaducer,
  tournament: tournamentReducer
});
