import React, { useState, useEffect } from 'react'
import { useContext, Context } from '../../../context'
import { useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button'
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline'
import Popover from '@mui/material/Popover'
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state'
import IconButton from '@mui/material/IconButton'
import Paper from '@mui/material/Paper'
import InputBase from '@mui/material/InputBase'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import ContentPasteIcon from '@mui/icons-material/ContentPaste'
import fetchAPI from '../../../utilities/fetch'
import { fetchSessionId } from '../../../utilities/helpers'
import { green } from '@mui/material/colors'

const StartGameButton = ({ quizId, isActive, setIsActive, fetchAllQuizzes, sessionId, setSessionId }) => {
  const { getters } = useContext(Context)
  const [hasClickedOnButton, setHasClickedOnButton] = useState(false)
  const navigate = useNavigate()

  const copyToClip = async () => {
    navigator.clipboard.writeText(`localhost:3000/game/join/${sessionId}`)
    navigate(`/game/result/${quizId}/${sessionId}`)
  }

  const startGame = async () => {
    if (hasClickedOnButton) {
      setIsActive(true)
    }

    if (!isActive && !hasClickedOnButton) {
      setHasClickedOnButton(true)
      const res = await fetchAPI('POST', getters.token, `admin/quiz/${quizId}/start`)
      if (res.error) alert(res.error)
      await fetchAllQuizzes()
    }
  }

  useEffect(async () => {
    if (hasClickedOnButton) {
      setSessionId(await fetchSessionId(getters.token, quizId))
    }
  }, [hasClickedOnButton])

  return (
    <PopupState variant="popover" popupId="demo-popup-popover">
      {(popupState) => (
        <div onClick={startGame}>
          <Button
            variant="contained"
            endIcon={<PlayCircleOutlineIcon/>}
            {...bindTrigger(popupState)}
            sx={{ backgroundColor: green[600], width: '90%', height: '24px', position: 'absolute', bottom: '5%', left: '5%', fontSize: '11px' }}
          >
            {'Start Quiz'}
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
              sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', margin: '10px' }}
            >
              <Typography
                sx={{ p: '5px' }}
              >
                Game Id
              </Typography>
              <Divider sx={{ height: 18, m: 0.2 }} orientation="vertical" />
              <InputBase
                sx={{ ml: 1, flex: 1, width: '90px' }}
                inputProps={{ 'aria-label': 'Game ID' }}
                disabled
                value={sessionId}
              />
              <Divider sx={{ height: 18, m: 0.2 }} orientation="vertical" />
              <IconButton aria-label="createGame" size="small" onClick={copyToClip}>
                <ContentPasteIcon/>
              </IconButton>
            </Paper>
            </Popover>
        </div>
      )}
    </PopupState>
  )
}

export default StartGameButton
