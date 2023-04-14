import React, { useState } from 'react'
import { useContext, Context } from '../../../context'
import Button from '@mui/material/Button'
import StopIcon from '@mui/icons-material/Stop'
import Popover from '@mui/material/Popover'
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state'
import Paper from '@mui/material/Paper'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import { useNavigate } from 'react-router-dom'
import { endGame } from '../../../utilities/helpers'
import PreviewIcon from '@mui/icons-material/Preview'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'

const StartGameButton = ({ quizId, isActive, setIsActive, fetchAllQuizzes, sessionId }) => {
  const navigate = useNavigate()

  const { getters } = useContext(Context)
  const [hasClickedOnButton, setHasClickedOnButton] = useState(false)
  const [sesId, setSesId] = useState(sessionId)

  const stopGame = async () => {
    if (hasClickedOnButton) {
      setIsActive(false)
    }
    if (isActive && !hasClickedOnButton) {
      setHasClickedOnButton(true)
      setSesId(sessionId)
      await endGame(quizId, getters.token)
      await fetchAllQuizzes()
    }
  }

  const viewResults = () => {
    navigate(`/game/result/${quizId}/${sesId}`)
  }

  return (
    <Box >
      <PopupState variant="popover" popupId="demo-popup-popover">
        {(popupState) => (
          <div onClick={stopGame}>
            <Button
              aria-label='End quiz'
              variant="contained"
              endIcon={<StopIcon/>}
              {...bindTrigger(popupState)}
              sx={{ backgroundColor: 'red', height: '24px', fontSize: '11px', width: '75%', position: 'absolute', bottom: '5%', left: '5%' }}
            >
              End Quiz
            </Button>
            <Popover
            {...bindPopover(popupState)}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
            >
            <Paper
              component="form"
              sx={{ p: '2px 4px', display: 'flex', alignItems: 'center' }}
            >
              <Button
                variant="outlined"
                startIcon={<CheckCircleOutlineIcon/>}
                sx={{ margin: '5px' }}
                onClick={viewResults}
              >
                Take me to quiz results
              </Button>
            </Paper>
            </Popover>
          </div>
        )}
      </PopupState>
      <IconButton
        name='view-results'
        sx={{
          height: '24px',
          fontSize: '11px',
          position: 'absolute',
          bottom: '5%',
          right: '0'
        }}
        onClick={viewResults}
      >
        <PreviewIcon />
      </IconButton >
    </Box>
  )
}

export default StartGameButton
