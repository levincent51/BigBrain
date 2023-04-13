import React, { useState, useEffect } from 'react'
import fetchAPI from '../../utilities/fetch'
import { useParams } from 'react-router-dom'
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

  useEffect(() => {
    const intervalId = setInterval(async () => {
      const res = await fetchAPI('GET', null, `play/${playerId}/status`)
      if (res.error) {
        clearInterval(intervalId)
        setQuizStatus('ended')
      } else if (res.started) {
        setQuizStatus('started')
      }
    }, 1000)

    return () => clearInterval(intervalId)
  }, [playerId])

  return (
    <Container>
      {quizStatus === 'pending' && <Lobby/>}
      {quizStatus === 'started' && <PlayGame playerId={playerId} quizStatus={quizStatus} question={question} answer={answer} setAnswer={setAnswer} setQuestion={setQuestion} setQuizStatus={setQuizStatus}/>}
      {quizStatus === 'ended' && <PlayerResult playerId={playerId}/>}
    </Container>
  )
}

export default GamePage
