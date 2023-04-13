import React, { useState, useEffect } from 'react'
import { useContext, Context } from '../../context'
import { useParams } from 'react-router-dom'
import { fetchGameResults, fetchGameQuestions } from '../../utilities/helpers'
import LeaderBoard from './AdminResultComponents/LeaderBoard'
import Container from '@mui/material/Container'
import BarGraph from './AdminResultComponents/BarGraph'
import MaxAndAverageScoreGraph from './AdminResultComponents/MaxAndAverageScoreGraph'
import ResponseTimeGraph from './AdminResultComponents/ResponseTimeGraph'

const Results = () => {
  const { sessionId } = useParams()
  const { getters } = useContext(Context)
  const [userPerformance, setUserPerformance] = useState({})
  const [questionPerformance, setQuestionPerformance] = useState({})
  const [numPlayers, setNumPlayers] = useState(0)

  useEffect(async () => {
    const quizQuestions = await fetchGameQuestions(getters.token, sessionId)
    const results = await fetchGameResults(getters.token, sessionId)
    setNumPlayers(results.length)
    results.forEach((user) => {
      if (!(user.name in userPerformance)) {
        const userName = user.name
        userPerformance[userName] = {
          points: 0,
          correct: 0,
          user
        }
      }

      user.answers?.forEach((question, index) => {
        if (!(index in questionPerformance)) {
          questionPerformance[index] = {
            name: `Q ${index + 1}`,
            numCorrect: 0,
            totalPoints: 0,
            maxPoints: computeWorth(index, quizQuestions),
            maxTime: computeTimeLimit(index, quizQuestions),
            totalTime: 0,
            correctTotalTime: 0
          }
        }

        if (question.correct) {
          const points = computePoints(question.questionStartedAt, question.answeredAt, index, quizQuestions)
          userPerformance[user.name].points += points
          questionPerformance[index].numCorrect += 1
          questionPerformance[index].totalPoints += points
          questionPerformance[index].correctTotalTime += computeSecondsElapsed(question.questionStartedAt, question.answeredAt)
        }

        questionPerformance[index].totalTime += computeSecondsElapsed(question.questionStartedAt, question.answeredAt)
        setQuestionPerformance({ ...questionPerformance })
      })

      setUserPerformance({ ...userPerformance })
    })
  }, [])

  const computePoints = (questionStarted, questionAnswered, questionIndex, quizQuestions) => {
    const secondsElapsed = (new Date(questionAnswered) - new Date(questionStarted)) / 1000
    const targetQuestion = quizQuestions[questionIndex]
    const points = targetQuestion.score
    const timeLimit = targetQuestion.timeLimit
    return Math.round((timeLimit - secondsElapsed) * points)
  }

  const computeWorth = (questionIndex, quizQuestions) => {
    const targetQuestion = quizQuestions[questionIndex]
    const points = targetQuestion.score
    const timeLimit = targetQuestion.timeLimit
    return timeLimit * points
  }

  const computeSecondsElapsed = (questionStarted, questionAnswered,) => {
    const secondsElapsed = (new Date(questionAnswered) - new Date(questionStarted)) / 1000
    return secondsElapsed
  }

  const computeTimeLimit = (questionIndex, quizQuestions) => {
    const targetQuestion = quizQuestions[questionIndex]
    const timeLimit = targetQuestion.timeLimit
    return timeLimit
  }

  return (
    <Container sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'centre',
      justifyContent: 'centre'
    }}>
      <Container sx={{
        display: 'flex'
      }}>
          <LeaderBoard userPerformance={userPerformance}/>
          <BarGraph data={Object.values(questionPerformance)}/>
      </Container>
      <Container sx={{
        display: 'flex'
      }}>
          <MaxAndAverageScoreGraph data={Object.values(questionPerformance)} numPlayers={numPlayers}/>
          <ResponseTimeGraph data={Object.values(questionPerformance)} numPlayers={numPlayers}/>
      </Container>
    </Container>
  )
}

export default Results
