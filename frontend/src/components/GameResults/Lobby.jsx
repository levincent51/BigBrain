/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useContext, Context } from '../../context';
import { useParams } from 'react-router-dom';
import { playerGetStatus } from '../../utilities/helpers';

const gamePage = ({ quizId }) => {
  const params = useParams();
  const playerId = params.playerId;
  const { getters } = useContext(Context);
  const [quizStatus, setQuizStatus] = useState({});

  // const getGameStatus = async () => {
  //   const res = await playerGetStatus(playerId);
  //   console.log(res);
  //   setQuizStatus(res);
  // }

  const audio = new Audio('test.mp3');
  audio.play();

  // useEffect(async () => {
  //   await getGameStatus();
  // }, []);

  return (
    <>
      <div>
        {params.playerId}
      </div>
    </>
  );
};

export default gamePage;
