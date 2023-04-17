import React, { useEffect, useState } from 'react'
import fetchAPI from '../../../utilities/fetch'
import Stack from '@mui/material/Stack'
import ResultCard from './ResultCard'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { CardActionArea } from '@mui/material'

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
      <Card sx={{ marginBottom: '50px', width: 'fit-content' }}>
        <CardActionArea>
          <CardContent sx={{
            display: 'flex',
            flexDirection: 'row',
            gap: '20px',
            alignItems: 'center'
          }}>
            <InfoOutlinedIcon />
            <Typography variant="body2" color="text.secondary">
              Points are computed by taking (time limit (s) - time taken (s)) * questions points
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
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
