import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import {
  startTournament,
  findCurrentRoundParticipants,
  startNewRound,
  setWinner
} from "../actions";
import { randomTeamSelection } from "../utilities/tournamentUtil";
import TeamCard from "./teamCard";
import MatchCardsContainer from "./matchCardsContainer";
import '../styles/leaderBoard.css';

const mapStateToProps = state => ({
  participants: state.teams.participants,
  status: state.tournament.status,
  currentRoundParticipants: state.tournament.currentRoundParticipants,
  rounds: state.tournament.rounds,
  winner: state.tournament.winner,
  roundInProgress: state.tournament.roundInProgress
});

const LeaderBoard = props => {
  const {
    participants,
    status,
    currentRoundParticipants,
    rounds,
    startNewRound,
    setWinner,
    winner,
    roundInProgress
  } = props;

  useEffect(() => {
    if (status === 'STARTED') {
      if (currentRoundParticipants.length > 1) {
        const randomPairs = randomTeamSelection(currentRoundParticipants);
        startNewRound(randomPairs, rounds, participants, roundInProgress);
      } else if (currentRoundParticipants.length === 1) {
        setWinner(currentRoundParticipants[0].winner);
      }
    }
  }, [status, currentRoundParticipants, rounds]);

  const handleStart = () => {
    props.startTournament(participants);
  };

  const findTeamDetails = teamId => {
    return participants.find(participant => participant.teamId === teamId);
  };

  if (participants === null) return <div>Loading...</div>;
  return (
    <Fragment>
      <button onClick={handleStart} className='start-button'>Start Tournament</button>
      { status === 'STARTED' ? <p className='tournament-progress'>In progress: Round {roundInProgress + 1}</p> : null }
      { status === 'FINISHED' ? <p className='tournament-progress'>Tournament Finished</p> : null }
      <div className='leader-board'>
        {rounds.map(round => {
          const arr = round.map(({ winner, loser }) => {
            return (
              <MatchCardsContainer
                winner={findTeamDetails(winner)}
                loser={findTeamDetails(loser)}
              />
            );
          });
          return <div className="round-group">{arr}</div>;
        })}
        { winner ? <TeamCard {...findTeamDetails(winner)} status='Winner' /> : null }
      </div>
    </Fragment>
  );
};

export default connect(
  mapStateToProps,
  { startTournament, findCurrentRoundParticipants, startNewRound, setWinner }
)(LeaderBoard);
