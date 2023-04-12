import React from 'react'
import { useContext, Context } from '../../context'
import BackButton from '../BackButton/BackButton'
import IconButton from '@mui/material/IconButton'
import Paper from '@mui/material/Paper'
import InputBase from '@mui/material/InputBase'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import StopIcon from '@mui/icons-material/Stop'
import { red, blue } from '@mui/material/colors'
import CircularProgress from '@mui/material/CircularProgress'
import { endGame, advanceGame } from '../../utilities/helpers'
import Box from '@mui/material/Box'

const CircularProgressWithLabel = ({ currentQuestion, totalQuestions }) => {
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex', m: '0 10px' }}>
      <CircularProgress variant="determinate" value={(currentQuestion + 1) / totalQuestions * 100} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant="caption" component="div" color="text.secondary">
          {`${currentQuestion + 1} / ${totalQuestions}`}
        </Typography>
      </Box>
    </Box>
  )
}

const GameController = ({ quizId, sessionId, loadGameStatus, quizProgress, totalQuestions }) => {
  const { getters } = useContext(Context)

  const endGameUpdateUi = async () => {
    await endGame(quizId, getters.token)
    await loadGameStatus()
  }

  const advanceGameUpdateUi = async () => {
    await advanceGame(quizId, getters.token)
    await loadGameStatus()
  }

  return (
    <Paper
      component="form"
      sx={{ p: '10px 10px', display: 'flex', alignItems: 'center', margin: '30px', width: 'fit-content', gap: '10px' }}
    >
      <BackButton path='/'/>
      <InputBase
        sx={{ m: 1, flex: 1, width: '60px' }}
        inputProps={{ 'aria-label': 'Game ID' }}
        disabled
        value={sessionId}
      />
      <Divider sx={{ height: 30 }} orientation="vertical" />
      {
        quizProgress < 0
          ? <Typography
              sx={{ m: '0 10px', fontSize: '13px', color: blue[500] }}
            >
              In Lobby
            </Typography>
          : <CircularProgressWithLabel
              currentQuestion={quizProgress}
              totalQuestions={totalQuestions}
            />
      }
      <Divider sx={{ height: 30 }} orientation="vertical" />
      <IconButton aria-label="createGame" size="small" onClick={advanceGameUpdateUi}>
        <Typography
          sx={{ fontSize: '15px' }}
        >
          {(quizProgress + 1 !== totalQuestions) ? 'Advance Game' : 'See Results'}
        </Typography>
        <PlayArrowIcon sx={{ color: blue[500] }}/>
      </IconButton>
      <Divider sx={{ height: 30 }} orientation="vertical" />
      <IconButton aria-label="createGame" size="small" onClick={endGameUpdateUi}>
        <Typography
          sx={{ fontSize: '15px' }}
        >
          Stop Game
        </Typography>
        <StopIcon sx={{ color: red[500] }}/>
      </IconButton>
    </Paper>
  )
}

export default GameController
