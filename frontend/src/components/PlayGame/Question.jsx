import React, { useState, useEffect } from 'react'
import fetchAPI from '../../utilities/fetch'
import {
  Box,
  Grid,
  CardContent,
  Typography,
  FormControl,
  FormGroup,
  FormControlLabel,
  Checkbox,
  CircularProgress
} from '@mui/material'
import TimerIcon from '@mui/icons-material/Timer'

const Question = ({ playerId, question, answer, timeLeft }) => {
  const [selectedOptions, setSelectedOptions] = useState([])
  const handleOptionChange = (optionIndex) => {
    if (question.multipleChoice) {
      // If multiple options can be selected, toggle the selected option
      const newSelectedOptions = selectedOptions.includes(optionIndex)
        ? selectedOptions.filter((index) => index !== optionIndex)
        : [...selectedOptions, optionIndex]
      setSelectedOptions(newSelectedOptions)
      sendAnswer({ answerIds: newSelectedOptions })
    } else {
      // If only one option can be selected, deselect all other options and select the clicked option
      setSelectedOptions([optionIndex])
      sendAnswer({ answerIds: [optionIndex] })
    }
  }

  useEffect(() => {
    setSelectedOptions([])
  }, [answer])

  const sendAnswer = async (body) => await fetchAPI('PUT', null, `play/${playerId}/answer`, body)

  return (
    question.id !== -1
      ? <>
        {question?.url !== '' && (
          <Box textAlign='center'>
            <div style={{ position: 'relative', width: '100%', height: 0, paddingBottom: '56.25%' }}>
              <iframe src={question?.url} style={{ position: 'absolute', width: '100%', height: '100%', top: 0, left: 0 }} aria-label='question url media' alt='question url media'></iframe>
            </div>
          </Box>
        )}
        <div>
          <CardContent >
            <Box display='flex' justifyContent='space-between'>
              <Typography gutterBottom variant="h6" component="h2">
                Q: {question.question}
              </Typography>
              {timeLeft && (
                <div>
                  <Typography variant="body2" color="textSecondary" component="p">
                    <TimerIcon /> {timeLeft} secs left
                  </Typography>
                </div>
              )}
            </Box>
          </CardContent>
          <Box display='flex' flexDirection='column' p={2}>
            <Typography variant="body2" color="textSecondary" component="p">
              {question?.multipleChoice ? 'Please select MULTIPLE options' : 'Please select ONE option'}
            </Typography>
            <Box textAlign='center' py={2}>
              <Box display='flex' justifyContent='center'>
                <FormControl component="fieldset">
                  <FormGroup>
                    <Grid container spacing={2}>
                      {question?.options.map((option, index) => (
                        <Grid item xs={12} sm={6} key={index}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={selectedOptions.includes(index)}
                                onChange={() => handleOptionChange(index)}
                              />
                            }
                            label={option}
                            labelPlacement='start'
                          />
                        </Grid>
                      ))}
                    </Grid>
                  </FormGroup>
                </FormControl>
              </Box>
            </Box>
            <Box display='flex' justifyContent='space-between' alignItems='center'>
              <Typography variant="body2" color="textSecondary" component="p">
                Score: {question.score}
              </Typography>
            </Box>
          </Box>
        </div>
      </>
      : <CircularProgress />
  )
}

export default Question
