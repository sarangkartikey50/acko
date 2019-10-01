import React, { Fragment } from 'react';
import '../styles/teamCard.css';

export default function TeamCard(props){
    const { abbreviation, teamName, status } = props;
    return(
        <Fragment>
            <div className='team-card'>
                <h4>{abbreviation}</h4>
                <p>{teamName}</p>
                <p className={`status ${status}`}>{status}</p>
            </div>
        </Fragment>
    )
}