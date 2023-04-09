/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useContext, Context } from '../../context';
import fetchAPI from '../../utilities/fetch';
import { useParams, useNavigate } from 'react-router-dom';
// import { playerGetStatus } from '../../utilities/helpers';
import Container from '@mui/material/Container';
import Lobby from '../../components/GameResults/Lobby';

const GamePage = () => {
  const params = useParams();
  const playerId = params.playerId;
  const [quizStatus, setQuizStatus] = useState('pending');

  useEffect(() => {
    const intervalId = setInterval(async () => {
      const res = await fetchAPI('GET', null, `play/${playerId}/status`)
      if (res.error) {
        clearInterval(intervalId);
        setQuizStatus('ended');
        console.log('ENDED!!');
      } else if (res.started) {
        console.log('Startedd!!');
        setQuizStatus('started');
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [playerId]);

  return (
    <Container>
      {quizStatus === 'pending' && <Lobby/>}
      {quizStatus === 'started' && <p>The game has started!</p>}
      {quizStatus === 'ended' && <p>The game has ended.</p>}
    </Container>
  )
};

export default GamePage;
