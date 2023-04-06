/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useContext, Context } from '../../context';
import fetchAPI from '../../utilities/fetch';
import GamesCard from '../../components/Dashboard/GameCard/GameCard';
import Grid2 from '@mui/material/Unstable_Grid2';
import CreateGameCard from '../../components/Dashboard/CreateGameCard/CreateGameCard'

const gamePage = (props) => {
  const { getters, setters } = useContext(Context);
  const [quizList, setQuizList] = useState([]);

  const fetchAllQuizzes = async () => {
    await fetchAPI('GET', getters.token, 'admin/quiz').then((res) => {
      if (res.error) alert(res.error);
      else {
        setQuizList(res.quizzes);
      }
    });
  }

  useEffect(async () => {
    await fetchAllQuizzes();
  }, []);

  return (
    <>
      <div>
        <h1>My Games</h1>
        <Grid2 container spacing={2}>
          <Grid2>
            <CreateGameCard fetchAllQuizzes={fetchAllQuizzes}/>
          </Grid2>
          {quizList.map((quiz) => (
            <Grid2 key={quiz.id}>
              <GamesCard quiz={quiz} fetchAllQuizzes={fetchAllQuizzes}/>
            </Grid2>
          ))}
        </Grid2>
      </div>
    </>
  );
};

export default gamePage;
