import React, { useState } from 'react';
import { useContext, Context } from '../../../context';
import Button from '@mui/material/Button';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import Popover from '@mui/material/Popover';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import Paper from '@mui/material/Paper';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useNavigate } from 'react-router-dom';
import { endGame } from '../../../utilities/helpers';

const StartGameButton = ({ quizId, isActive, setIsActive, fetchAllQuizzes, sessionId }) => {
  const navigate = useNavigate();

  const { getters } = useContext(Context);
  const [hasClickedOnButton, setHasClickedOnButton] = useState(false);

  const stopGame = async () => {
    if (hasClickedOnButton) {
      setIsActive(false);
    }
    if (isActive && !hasClickedOnButton) {
      setHasClickedOnButton(true);
      await endGame(quizId, getters.token);
      await fetchAllQuizzes();
    }
  }

  const viewResults = () => {
    navigate(`/game/result/${quizId}/${sessionId}`);
  }

  return (
    <PopupState variant="popover" popupId="demo-popup-popover">
      {(popupState) => (
        <div onClick={stopGame}>
          <Button
              variant="contained"
              endIcon={<PlayCircleOutlineIcon/>}
              {...bindTrigger(popupState)}
              sx={{ backgroundColor: 'red', width: '90%', height: '24px', position: 'absolute', bottom: '5%', left: '5%', fontSize: '11px' }}
            >
            {'End Quiz'}
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
  );
}

export default StartGameButton;
