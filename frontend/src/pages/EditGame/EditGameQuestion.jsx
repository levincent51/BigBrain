import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Context, useContext } from '../../context'
import fetchAPI from '../../utilities/fetch'
import EditQuestionForm from '../../components/EditGame/EditQuestionForm'
import { Paper, Box, Container } from '@mui/material'

const EditGameQuestion = () => {
  const { getters } = useContext(Context)
  const { questionId } = useParams()
  const navigate = useNavigate()

  const gameId = window.location.href.split('/').slice(-2)[0]

  const quizInitial = { name: '', questions: [], thumbnail: '' }
  const [quizInfo, setQuizInfo] = useState(quizInitial)
  const initialValues = { id: parseInt(questionId), question: '', url: '', multipleChoice: false, score: 0, options: [], timeLimit: 0 }
  const [questionInfo, setQuestionInfo] = useState(initialValues)
  const [youtubeOpen, setYoutubeOpen] = useState(false)

  const fetchQuizData = async () => {
    const res = await fetchAPI('GET', getters.token, `admin/quiz/${gameId}`)
    if (res.error) alert(res.error)
    else {
      setQuizInfo(res)
      setQuestionInfo({ ...initialValues, ...res.questions.filter(q => q.id === parseInt(questionId))[0] })
    }
  }

  useEffect(async () => {
    await fetchQuizData()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const index = quizInfo.questions.findIndex(q => q.id === parseInt(questionId))
    const updatedQuizInfo = quizInfo
    updatedQuizInfo.questions[index] = questionInfo
    const res = await fetchAPI('PUT', getters.token, `admin/quiz/${gameId}`, updatedQuizInfo)
    if (res.error) alert(res.error)
    else {
      alert('saved changes')
      navigate(`/editgame/${gameId}/`)
    }
  }

  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <Paper variant="outlined">
          <Box p={2}>
            <EditQuestionForm
              questionInfo={questionInfo}
              setQuestionInfo={setQuestionInfo}
              handleSubmit={handleSubmit}
              youtubeOpen={youtubeOpen}
              setYoutubeOpen={setYoutubeOpen}
            />
          </Box>
        </Paper>
      </Box>
    </Container>
  )
}

export default EditGameQuestion
