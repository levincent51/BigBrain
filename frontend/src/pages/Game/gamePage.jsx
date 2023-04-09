/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useContext, Context } from '../../context';
import fetchAPI from '../../utilities/fetch';
import { useParams, useNavigate } from 'react-router-dom';
// import { playerGetStatus } from '../../utilities/helpers';
import Container from '@mui/material/Container';

const gamePage = () => {
  const navigate = useNavigate();
  const params = useParams();
  const playerId = params.playerId;
  const [quizStatus, setQuizStatus] = useState();
  const [intervalId, setIntervalId] = useState();

  useEffect(() => {
    const intId = setInterval(playerGetStatus, 1000);
    console.log('INTERVAL ID', intId);
    setIntervalId(intId);
  }, []);

  // const { data } = useSWR(playerId, playerGetStatus);
  const playerGetStatus = async () => {
    const res = await fetchAPI('GET', null, `play/${playerId}/status`);
    if (res.error) {
      console.log('--------------------------------', intervalId, 'interval id ');
      clearInterval(intervalId);
    } else {
      setQuizStatus(res.started);
    }
  }
  return (
    <Container>
      {quizStatus === true ? 'started' : 'no'}
    </Container>
  )
};

export default gamePage;
