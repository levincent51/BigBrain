import React from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'

import Chip from '@mui/material/Chip'

const ResultCard = ({ questionResult, index }) => {
  const answers = questionResult.answerIds
  const answerChips = answers.map(id => {
    return <Chip label={id} key={id} size="small" sx={{ height: '18px', width: '30px' }}/>
  })

  return (
    <Card
      sx={{
        display: 'flex',
        width: '60%',
        height: 'fit-content',
        border: `1px solid ${questionResult.correct ? 'green' : 'red'}`,
        padding: '20px'
      }}
    >
      <Box sx={{ width: '33%' }}>
        Question {index + 1}
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', width: '33%' }}>
        Options Picked
        <Box>
          {answerChips}
        </Box>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        Answered in
        <Box>
          {(new Date(questionResult.answeredAt) - new Date(questionResult.questionStartedAt)) / 1000} Seconds
        </Box>
      </Box>
    </Card>
  )
}

export default ResultCard
