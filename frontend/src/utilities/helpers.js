import fetchAPI from './fetch'

export const endGame = async (quizId, token) => {
  const res = await fetchAPI('POST', token, `admin/quiz/${quizId}/end`)
  if (res.error) alert(res.error)
}

export const advanceGame = async (quizId, token) => {
  const res = await fetchAPI('POST', token, `admin/quiz/${quizId}/advance`)
  if (res.error) alert(res.error)
}

export const fetchGameResults = async (token, sessionId) => {
  const res = await fetchAPI('GET', token, `admin/session/${sessionId}/results`)
  if (res.error) alert(res.error)
  else {
    return res.results
  }
}

export const fetchGameQuestions = async (token, sessionId) => {
  const res = await fetchGameStatus(token, sessionId)
  return res.questions
}

export const fetchGameStatus = async (token, sessionId) => {
  const res = await fetchAPI('GET', token, `admin/session/${sessionId}/status`)
  if (res.error) alert(res.error)
  else {
    return res.results
  }
}

export const fetchSessionId = async (token, quizId) => {
  const res = await fetchAPI('GET', token, `admin/quiz/${quizId}`)
  if (res.error) alert(res.error)
  else return res.active
}

export const joinSession = async (sessionId, name) => {
  const res = await fetchAPI('POST', null, `play/join/${sessionId}`, { name })
  if (res.error) alert(res.error)
  else return res.playerId
}

export const playerGetStatus = async (playerId) => {
  const res = await fetchAPI('GET', null, `play/${playerId}/status`)
  if (res.error) alert(res.error)
  else {
    return res.started
  }
}

export const handleGameUpload = async (token, newGameId, quizInfo, fetchAllQuizzes) => {
  const res = await fetchAPI('PUT', token, `admin/quiz/${newGameId}`, quizInfo)
  if (res.error) alert(res.error)
  else {
    fetchAllQuizzes()
  }
}

export const createPost = async (token, newGameName, fetchAllQuizzes) => {
  alert(newGameName)
  const res = await fetchAPI('POST', token, 'admin/quiz/new', {
    name: newGameName
  })
  if (res.error) alert(res.error)
  else return res.quizId
  await fetchAllQuizzes()
}
