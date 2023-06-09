import React from 'react'
import YoutubeLinkDialog from './YoutubeLinkDialog'
import BackButton from '../BackButton/BackButton'
import AddItemDialog from '../AddItemDialog/AddItemDialog'

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Delete from '@mui/icons-material/Delete'
import ImageIcon from '@mui/icons-material/Image'
import InsertLinkIcon from '@mui/icons-material/InsertLink'
import ClearIcon from '@mui/icons-material/Clear'
import IconButton from '@mui/material/IconButton'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Checkbox from '@mui/material/Checkbox'
import Radio from '@mui/material/Radio'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import ToggleButton from '@mui/material/ToggleButton'

const EditQuestionForm = (props) => {
  const { questionInfo, setQuestionInfo, handleSubmit, youtubeOpen, setYoutubeOpen } = props
  const gameId = window.location.href.split('/').slice(-2)[0]

  const handleButtonClick = () => {
    setYoutubeOpen(true)
  }

  const handleCloseDialog = () => {
    setYoutubeOpen(false)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setQuestionInfo({ ...questionInfo, [name]: value })
  }

  const handleNumChange = (e) => {
    const { name, value } = e.target
    setQuestionInfo({ ...questionInfo, [name]: parseInt(value) })
  }

  const handleOptionChange = (e, index) => {
    const { value } = e.target
    const updatedOptions = [...questionInfo.options]
    updatedOptions[index].name = value
    setQuestionInfo({ ...questionInfo, options: updatedOptions })
  }

  const handleOptionSave = (option) => {
    const updatedOptions = [...questionInfo.options, { name: option, correct: false }]
    setQuestionInfo({ ...questionInfo, options: updatedOptions })
  }

  const handleClearURL = (e) => {
    setQuestionInfo({ ...questionInfo, url: '' })
  }

  const handleFileChange = (event) => {
    const file = event.target.files[0]
    const reader = new FileReader()
    reader.onloadend = () => {
      setQuestionInfo({ ...questionInfo, url: reader.result })
    }

    reader.readAsDataURL(file)
  }

  const handleQuestionType = (value) => {
    if (value === 'multipleChoice') setQuestionInfo({ ...questionInfo, multipleChoice: true })
    else {
      const updatedOptions = questionInfo.options.map((option) => ({
        ...option,
        correct: false
      }))
      setQuestionInfo({ ...questionInfo, multipleChoice: false, options: updatedOptions })
    }
  }

  const handleCheck = (index) => {
    const updatedOptions = [...questionInfo.options]
    updatedOptions[index].correct = !updatedOptions[index]?.correct
    setQuestionInfo({ ...questionInfo, options: updatedOptions })
  }

  const handleRadio = (name, index) => {
    const updatedOptions = questionInfo.options.map((option) => ({
      ...option,
      correct: false
    }))
    updatedOptions[index].correct = true
    setQuestionInfo({ ...questionInfo, options: updatedOptions })
  }

  const handleDeleteOptions = (index) => {
    const updatedOptions = [...questionInfo.options]
    updatedOptions.splice(index, 1)
    setQuestionInfo({ ...questionInfo, options: updatedOptions })
  }

  return (
    <form onSubmit={handleSubmit}>
      <Box display="flex" justifyContent='space-between'>
        <Typography variant="h6" gutterBottom>
          Edit Question
        </Typography>
        <Box display="flex" justifyContent="flex-end" mb={2}>
          <BackButton path={`/editgame/${gameId}/`} />
        </Box>
      </Box>
      <TextField
        label="question"
        variant="outlined"
        margin="normal"
        name='question'
        value={questionInfo.question}
        onChange={handleChange}
        fullWidth
      />
      <TextField
        label="URL (Optional)"
        variant="outlined"
        margin="normal"
        name='url'
        value={questionInfo.url ? questionInfo.url : ''}
        fullWidth
        disabled
      />
      {questionInfo.url && <Box>
        <iframe width="100%" height="300px" src={questionInfo.url} aria-label='question url media' alt='question url media' ></iframe>
      </Box>}

      <Box display="flex" alignItems="center" justifyContent="space-between" paddingBottom={2}>
        <input
          style={{ display: 'none' }}
          accept=".jpg, .jpeg, .png"
          id="file-upload"
          type="file"
          onChange={handleFileChange}
        />
        <label htmlFor="file-upload">
          <Button
            component="span"
            size="medium"
            endIcon={<ImageIcon />}
          >
            Upload photo
          </Button>
        </label>
        <Button
          component="span"
          size="medium"
          onClick={handleButtonClick}
          endIcon={<InsertLinkIcon />}
        >
          Insert YouTube Link
        </Button>
        <Button
          component="span"
          size="medium"
          onClick={handleClearURL}
          endIcon={<ClearIcon />}
        >
          Clear URL
        </Button>
      </Box>
      <YoutubeLinkDialog open={youtubeOpen} onClose={handleCloseDialog} questionInfo={questionInfo} setQuestionInfo={setQuestionInfo} />

      <Typography>Question Type</Typography>
      <Box paddingBottom={2}>
        <ToggleButtonGroup
          value={questionInfo.multipleChoice ? 'multipleChoice' : 'singleChoice'}
          exclusive
          color="primary"
          onChange={(event, value) => handleQuestionType(value)}
        >
          <ToggleButton value="multipleChoice">Multiple Choice</ToggleButton>
          <ToggleButton value="singleChoice">Single Choice</ToggleButton>
        </ToggleButtonGroup>
      </Box>

      <Typography>Answer Options</Typography>
      <Grid container spacing={2}>
        {questionInfo.options?.map((op, index) => (
          <Grid item xs={6} key={index} style={{ display: 'flex', alignItems: 'center' }}>
            <TextField
              label={`option ${index + 1}`}
              variant="outlined"
              margin="normal"
              value={op.name}
              onChange={(e) => handleOptionChange(e, index)}
              aria-label={`option ${index + 1}`}
              fullWidth
            />
            {questionInfo.multipleChoice
              ? <Checkbox
                checked={op.correct}
                onChange={() => handleCheck(index)}
              />
              : <Radio
                value={op.name}
                checked={op.correct}
                onChange={() => handleRadio(op.name, index)}
              />}

            <IconButton disabled={questionInfo.options?.length <= 2} onClick={() => handleDeleteOptions(index)}>
              <Delete />
            </IconButton>
          </Grid>
        ))}
      </Grid>
      <Box display='flex' justifyContent='space-between' paddingY={2}>
        <AddItemDialog limit={6} current={questionInfo.options.length} itemName='Option' handleSave={handleOptionSave} />
      </Box>
      <Typography variant='subtitle2'>Note: Minimum of 2 questions, maximum of 6</Typography>

      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            name="score"
            label="Score"
            type="number"
            margin="normal"
            InputProps={{
              inputProps: { min: 0, max: 5 }
            }}
            fullWidth
            value={questionInfo.score}
            onChange={handleNumChange}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            name="timeLimit"
            label="Time Limit (s)"
            type="number"
            margin="normal"
            fullWidth
            InputProps={{
              inputProps: { min: 0, max: 120 }
            }}
            value={questionInfo.timeLimit}
            onChange={handleNumChange}
          />
        </Grid>
      </Grid>

      <Box mt={2} display="flex" justifyContent="center">
        <Button fullWidth variant="contained" color="primary" type="submit" onClick={handleSubmit}>
          Save Changes
        </Button>
      </Box>
    </form>
  )
}

export default EditQuestionForm
