import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import fetchAPI from '../utilities/fetch';

const Dashboard = (props) => {
  const { token, setToken } = props;
  const [quizList, setQuizList] = useState([]);
  useEffect(() => {
    fetchAPI('GET', props.token, 'admin/quiz')
      .then((res) => {
        if (res.error) alert(res.error);
        console.log(res);
        setQuizList(res.quizzes);
      })
  }, []);
  return (
    <div>
      <Navbar isLoggedin={true} token={token} setToken={setToken}></Navbar>
      <div>
      <h1>Dashboard</h1>
      <ul>
        {quizList.map((quiz) => (
          <li key={quiz.id}>
            <h2>{quiz.name}</h2>
            <p>{quiz.owner}</p>
            <p>{quiz.id}</p>
            <p>{quiz.createdAt}</p>
            <img src={quiz.thumbnail} alt="THERES MEANT TO BE A THUMBNAIL"/>
            <p>{quiz.active ? 'ACTIVE' : 'NOTACTIVE'}</p>
            <p>oldSessions:</p>
            {quiz.oldSessions.map((session) => (
              <ul key={session}>{session}</ul>
            ))}
          </li>
        ))}
      </ul>
      </div>
    </div>
  );
};

export default Dashboard;
