import React, { useState, useEffect } from 'react'
import fetchAPI from '../../utilities/fetch'
import {
  Card,
  Box,
  CardContent,
  Typography,
  FormControl,
  FormGroup,
  FormControlLabel,
  Checkbox,
  CircularProgress,
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
      console.log(newSelectedOptions)
    } else {
      // If only one option can be selected, deselect all other options and select the clicked option
      setSelectedOptions([optionIndex])
      sendAnswer({ answerIds: [optionIndex] })
      console.log({ answerIds: [optionIndex] })
    }
  }

  useEffect(() => {
    setSelectedOptions([])
  }, [answer])

  const sendAnswer = async (body) => {
    const res = await fetchAPI('PUT', null, `play/${playerId}/answer`, body)
    if (res.error) alert(res.error)
  }

  return (
    question.id !== -1
      ? <Card>
        {question?.url !== '' && (
          <Box>
            <iframe width="500px" height="300px" src={question?.url} aria-label='question url media' alt='question url media' ></iframe>
          </Box>
        )}
        <div>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {question.question}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Score: {question.score}
            </Typography>
          </CardContent>
          {timeLeft && (
            <div>
              <Typography variant="body2" color="textSecondary" component="p">
                <TimerIcon /> {timeLeft} secs left
              </Typography>
            </div>
          )}
          <Typography variant="body2" color="textSecondary" component="p">
            {question?.multipleChoice ? 'Please select MULTIPLE options' : 'Please select ONE option'}
          </Typography>
          <FormControl component="fieldset">
            <FormGroup>
              {question?.options.map((option, index) => (
                <FormControlLabel
                  key={index}
                  control={
                    <Checkbox
                      checked={selectedOptions.includes(index)}
                      onChange={() => handleOptionChange(index)}
                    />
                  }
                  label={option}
                />
              ))}
            </FormGroup>
          </FormControl>
        </div>
      </Card>
      : <CircularProgress />
  )
}

export default Question
