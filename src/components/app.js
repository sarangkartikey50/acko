import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { fetchTeams } from "../actions";
import LeaderBoard from "./leaderBoard";

function App(props) {
  useEffect(() => {
    props.fetchTeams();
  }, [props]);
  return (
    <Fragment>
      <LeaderBoard />
    </Fragment>
  );
}

export default connect(
  null,
  { fetchTeams }
)(App);
