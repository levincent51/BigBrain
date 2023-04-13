import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Context, useContext } from '../../context'
import fetchAPI from '../../utilities/fetch'
import EditGameForm from '../../components/EditGame/EditGameForm'
import { Container, Paper, Box } from '@mui/material'

const EditGame = () => {
  const navigate = useNavigate()
  const { getters } = useContext(Context)
  const { gameId } = useParams()
  const initialValues = { name: '', questions: [], thumbnail: '' }
  const [quizInfo, setQuizInfo] = useState(initialValues)
  const [savedInfo, setSavedInfo] = useState(initialValues)

  const fetchQuizData = async () => {
    const res = await fetchAPI('GET', getters.token, `admin/quiz/${gameId}`)
    if (res.error) alert(res.error)
    else {
      setSavedInfo(res)
      setQuizInfo(res)
    }
  }

  useEffect(() => {
    fetchQuizData()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const res = await fetchAPI('PUT', getters.token, `admin/quiz/${gameId}`, quizInfo)
    if (res.error) alert(res.error)
    else {
      alert('saved changes')
      fetchQuizData()
    }
  }

  const navigateToQuestion = (id) => {
    navigate(`/editgame/${gameId}/${id}`)
  }

  return (
    <Container maxWidth='sm'>
      <Box my={4}>
        <Paper variant="outlined">
          <Box p={2}>
            {quizInfo && (
              <EditGameForm
                quizInfo={quizInfo}
                savedInfo={savedInfo}
                setQuizInfo={setQuizInfo}
                handleSubmit={handleSubmit}
                navigateToQuestion={navigateToQuestion}
              />
            )}
          </Box>
        </Paper>
      </Box>
    </Container>
  )
}

export default EditGame
