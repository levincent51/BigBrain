import React, { useState, useEffect } from 'react';
import { useContext, Context } from '../../context';
import { useParams } from 'react-router-dom';
import { fetchGameStatus } from '../../utilities/helpers';
import GameController from '../../components/GameResults/GameController';
import AdminResults from '../../components/GameResults/AdminResults';
import Container from '@mui/material/Container';

const gameResultsPage = () => {
  const params = useParams();
  const quizId = params.gameId;
  const sessionId = params.sessionId;
  const { getters } = useContext(Context);
  const [quizProgress, setQuizProgress] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [active, setActive] = useState(true);

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
    <Container>
      {
        active
          ? <GameController
              quizId={quizId}
              sessionId={sessionId}
              loadGameStatus={loadGameStatus}
              quizProgress={quizProgress}
              totalQuestions={totalQuestions}
          />
          : <AdminResults/>
      }
    </Container>
  );
};

export default gameResultsPage;
