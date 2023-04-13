/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import { useContext, Context } from '../../context'
import fetchAPI from '../../utilities/fetch'
import { useParams, useNavigate } from 'react-router-dom'
// import { playerGetStatus } from '../../utilities/helpers';
import Container from '@mui/material/Container'
import Lobby from '../../components/GameResults/Lobby'
import PlayGame from '../../components/PlayGame/PlayGame'
import PlayerResult from '../../components/PlayGame/PlayerResult/PlayerResult'

const GamePage = () => {
  const params = useParams()
  const playerId = params.playerId
  const [quizStatus, setQuizStatus] = useState('pending')
  const [question, setQuestion] = useState({ id: -1, question: '', url: '', multipleChoice: false, score: 0, options: [], timeLimit: 99 })
  const [answer, setAnswer] = useState(null)

  const fetchQuizResult = async () => {
    const res = await fetchAPI('GET', null, `play/${playerId}/results`)
    if (res.error) alert(res.error)
    else {
      // console.log(res)
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

  useEffect(() => {
    const intervalId = setInterval(async () => {
      const res = await fetchAPI('GET', null, `play/${playerId}/status`)
      if (res.error) {
        clearInterval(intervalId)
        setQuizStatus('ended')
        fetchQuizResult()
        console.log('ENDED!!')
      } else if (res.started) {
        setQuizStatus('started')
      }
    }, 1000)

    return () => clearInterval(intervalId)
  }, [playerId])

  // THIS IS FOR POLLIN QUESTIOn

  return (
    <Container>
      {quizStatus === 'pending' && <Lobby/>}
      {quizStatus === 'started' && <PlayGame playerId={playerId} quizStatus={quizStatus} question={question} answer={answer} setAnswer={setAnswer} setQuestion={setQuestion} setQuizStatus={setQuizStatus}/>}
      {quizStatus === 'ended' && <PlayerResult playerId={playerId}/>}
    </Container>
  )
}

export default GamePage
