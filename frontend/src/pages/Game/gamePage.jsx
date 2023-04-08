/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useContext, Context } from '../../context';
import fetchAPI from '../../utilities/fetch';
import { useParams } from 'react-router-dom';

const gamePage = (props) => {
  const params = useParams();
  const { getters } = useContext(Context);
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
        {params.sessionId}
      </div>
    </>
  );
};

export default gamePage;
