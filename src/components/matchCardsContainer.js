import React, { Fragment } from 'react';
import TeamCard from './teamCard';
import '../styles/matchCardsContainer.css'

export default function MatchCardsContainer(props){
    const { winner, loser } = props;
    if(loser){
        return (
            <Fragment>
                <div className='card-container'>
                    <TeamCard {...winner} status='Winner' />
                    <TeamCard {...loser} status='Loser' />
                </div>
            </Fragment>
        )
    } else {
        return (
            <Fragment>
                <div className='card-container'>
                    <TeamCard {...winner} status='' />
                </div>
            </Fragment>
        )
    }
}