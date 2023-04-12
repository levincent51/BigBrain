import React, { useState, useEffect } from 'react';
import { useContext, Context } from '../../context';
import fetchAPI from '../../utilities/fetch';
import GamesCard from '../../components/Dashboard/GameCard/GameCard';
import PastGameCard from '../../components/Dashboard/GameCard/PastGameCard';
import Grid2 from '@mui/material/Unstable_Grid2';
import CreateGameCard from '../../components/Dashboard/CreateGameCard/CreateGameCard'
import Container from '@mui/material/Container';

const Dashboard = () => {
  const { getters } = useContext(Context);
  const [quizList, setQuizList] = useState([]);
  const [oldSessions, setOldSessions] = useState([]);

  const fetchAllQuizzes = async () => {
    await fetchAPI('GET', getters.token, 'admin/quiz').then((res) => {
      if (res.error) alert(res.error);
      else {
        setQuizList(res.quizzes);
        processOldSessionList(quizList);
        return res.quizzes;
      }
    }).then(processOldSessionList)
  }

  const processOldSessionList = async (quizList) => {
    const seshList = [];
    quizList.forEach(q => {
      console.log(q);
      q.oldSessions.forEach(s => {
        const sessionQuizCombined = { ...q, sessionId: s };
        seshList.push(sessionQuizCombined);
      })
    })
    setOldSessions(seshList);
  }

  useEffect(async () => {
    fetchAllQuizzes();
  }, []);

  const quizzes = quizList.map((quiz) => (
    <Grid2 key={quiz.id}>
      <GamesCard quiz={quiz} fetchAllQuizzes={fetchAllQuizzes}/>
    </Grid2>
  ))

  const pastQuizzes = oldSessions.map((q) => (
    <Grid2 key={`${q.id}${q.sessionId}`}>
      <PastGameCard quiz={q} fetchAllQuizzes={fetchAllQuizzes}/>
    </Grid2>
  ))

  return (
    <Container>
      <h1>My Quizzes</h1>
      <Grid2 container spacing={2}>
        <Grid2>
          <CreateGameCard fetchAllQuizzes={fetchAllQuizzes}/>
        </Grid2>
        {quizzes}
      </Grid2>
      <h1>Past Quizzes</h1>
      <Grid2 container spacing={2}>
        {pastQuizzes}
      </Grid2>
    </Container>
  );
};

export default Dashboard;
