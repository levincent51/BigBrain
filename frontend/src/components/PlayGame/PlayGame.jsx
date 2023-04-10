/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import fetchAPI from '../../utilities/fetch';

const PlayGame = ({ playerId, quizStatus, question, answer, setAnswer, setQuestion }) => {
  const [timeLeft, setTimeLeft] = useState(null);

  const addTimeLimit = (isoTimeLastQuestionStarted, timeLimitInSeconds) => {
    const date = new Date(isoTimeLastQuestionStarted);
    date.setSeconds(date.getSeconds() + timeLimitInSeconds);
    return date.toISOString();
  }

  const getTimeLeft = (isoTimeLastQuestionStarted, timeLimit) => {
    const start = new Date(isoTimeLastQuestionStarted);
    const end = new Date()
    const timeLeftInSeconds = (end.getTime() - start.getTime()) / 1000;
    const timeLeft = timeLimit - Math.floor(timeLeftInSeconds);
    return timeLeft >= 0 ? timeLeft : 0;
  }

  useEffect(() => {
    if (quizStatus === 'started') {
      const intervalId = setInterval(async () => {
        const res = await fetchAPI('GET', null, `play/${playerId}/question`)
        if (res.error) {
          clearInterval(intervalId);
          console.log('end');
        } else {
          setQuestion(res.question);
          setTimeLeft(getTimeLeft(res.question.isoTimeLastQuestionStarted, res.question.timeLimit));
          if (question?.id !== res.question.id) {
            // reset answer
            setAnswer(null);
          } else {
            const currentTime = new Date().toISOString();
            const isoTimeLimitExpiration = addTimeLimit(res.question.isoTimeLastQuestionStarted, res.question.timeLimit);
            if (currentTime >= isoTimeLimitExpiration) {
              const answerRes = await fetchAPI('GET', null, `play/${playerId}/answer`);
              setAnswer(answerRes.answerIds.map((id) => {
                return question?.options[id]
              }));
            }
          }
        }
      }, 1000);
      return () => clearInterval(intervalId);
    }
  }, [quizStatus, question, answer, playerId]);

  return (
    <>
      {answer === null ? <p>The game has started! this is the question {question?.question} TIME LEFT {timeLeft}</p> : <p>THIS IS THE ANSWERS {answer}</p>}
    </>
  );
}

export default PlayGame;
