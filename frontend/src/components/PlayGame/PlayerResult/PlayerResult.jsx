import React, { useEffect, useState } from 'react'
import fetchAPI from '../../../utilities/fetch'
import Stack from '@mui/material/Stack'
import ResultCard from './ResultCard'

const PlayerResult = ({ playerId }) => {
  const [playerResults, setPlayerResults] = useState([])

  const fetchQuizResult = async () => {
    const res = await fetchAPI('GET', null, `play/${playerId}/results`)
    if (res.error) alert(res.error)
    else {
      setPlayerResults(res)
    }
  }

  useEffect(async () => {
    await fetchQuizResult()
  }, [])

  const questionResults = playerResults.map((questionResult, index) => {
    return <ResultCard key={index} questionResult={questionResult} index={index} />
  })

  return (
    <>
      <h2>
        Results
      </h2>
      <br></br>
      <Stack direction="column" spacing={2}>
        {questionResults}
      </Stack>
    </>
  )
}

export default PlayerResult
