/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useContext, Context } from '../../context';
import { useParams } from 'react-router-dom';
import { fetchGameStatus } from '../../utilities/helpers';
import GameController from '../../components/GameResults/GameController';

const gameResultsPage = () => {
  const params = useParams();
  const quizId = params.gameId;
  const sessionId = params.sessionId;
  const { getters } = useContext(Context);
  const [quizResults, setQuizResults] = useState();
  const [quizProgress, setQuizProgress] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [active, setActive] = useState();

  const loadGameStatus = async () => {
    const quizResults = await fetchGameStatus(getters.token, sessionId);
    console.log(quizResults);
    setActive(quizResults.active);
    setQuizProgress(quizResults.position);
    setTotalQuestions(quizResults.questions.length);
  }

  useEffect(async () => {
    await loadGameStatus();
  }, []);

  return (
    <>
      {
        active
          ? <GameController
              quizId={quizId}
              sessionId={sessionId}
              loadGameStatus={loadGameStatus}
              quizProgress={quizProgress}
              totalQuestions={totalQuestions}
          />
          : 'Results here'
      }
    </>
  );
};

export default gameResultsPage;
