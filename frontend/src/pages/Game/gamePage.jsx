/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useContext, Context } from '../../context';
import fetchAPI from '../../utilities/fetch';
import { useParams, useNavigate } from 'react-router-dom';
// import { playerGetStatus } from '../../utilities/helpers';
import Container from '@mui/material/Container';
import Lobby from '../../components/GameResults/Lobby';

function addTimeLimit (isoTimeLastQuestionStarted, timeLimitInSeconds) {
  const date = new Date(isoTimeLastQuestionStarted);
  date.setSeconds(date.getSeconds() + timeLimitInSeconds);
  return date.toISOString();
}

const GamePage = () => {
  const params = useParams();
  const playerId = params.playerId;
  const [quizStatus, setQuizStatus] = useState('pending');
  const [question, setQuestion] = useState(null);
  const [answer, setAnswer] = useState(null);

  useEffect(() => {
    const intervalId = setInterval(async () => {
      const res = await fetchAPI('GET', null, `play/${playerId}/status`)
      if (res.error) {
        clearInterval(intervalId);
        setQuizStatus('ended');
        console.log('ENDED!!');
      } else if (res.started) {
        setQuizStatus('started');
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [playerId]);

  const fetchQuizResult = async () => {
    const res = await fetchAPI('GET', null, `play/${playerId}/results`)
    if (res.error) alert(res.error)
    else {
      console.log(res);
      // TODO THIS IS AN EXAMPLE STRUCTURE OF RES
      // [
      //   {
      //     "answerIds": [
      //       56513315
      //     ],
      //     "correct": false,
      //     "answeredAt": "2020-10-31T14:45:21.077Z",
      //     "questionStartedAt": "2020-10-31T14:45:21.077Z"
      //   }
      // ]
    }
  }

  // THIS IS FOR POLLIN QUESTIOn
  useEffect(() => {
    console.log(quizStatus);
    if (quizStatus === 'started') {
      // NEED TO KEEP TRACK OF isoTimeLastQuestionStarted if it is isoTimeLastQUestion + timeLimit
      // call await fetchAPI('GET', null, `play/${playerId}/answer`)
      // if we find that the poll response res.question.id is different to the next poll, switch back to
      // the question
      const intervalId = setInterval(async () => {
        const res = await fetchAPI('GET', null, `play/${playerId}/question`)
        if (res.error) {
          clearInterval(intervalId);
          setQuizStatus('ended');
          console.log('ENDED!!');
        } else {
          console.log(question, res.question);
          // Compare previous question ID with new question ID
          if (question?.id !== res.question.id && question !== null) {
            console.log('NEXT QUESTION');
            setQuestion(res.question);
            setAnswer(null);
          } else {
            const currentTime = new Date().toISOString();
            const isoTimeLimitExpiration = addTimeLimit(res.question.isoTimeLastQuestionStarted, res.question.timeLimit);
            if (currentTime >= isoTimeLimitExpiration) {
              console.log('TIMES UP');
              const answerRes = await fetchAPI('GET', null, `play/${playerId}/answer`);
              console.log(answerRes);
              setAnswer(answerRes.answerIds);
            }
            setQuestion(res.question);
          }
        }
      }, 1000);
      return () => clearInterval(intervalId);
    }
    if (quizStatus === 'ended') {
      fetchQuizResult();
    }
  }, [quizStatus]);

  // TODO, when the game has started, switch to questions component page, with timer
  // TODO WHEN SESSION ENDS, GOES TO RESULT PAGE
  return (
    <Container>
      {quizStatus === 'pending' && <Lobby/>}
      {quizStatus === 'started' && (answer === null ? <p>The game has started! this is the question {question?.question}</p> : <p>THIS IS THE ANSWERS {answer?.answerIds}</p>)}
      {quizStatus === 'ended' && <p>The game has ended.</p>}
    </Container>
  )
};

export default GamePage;
