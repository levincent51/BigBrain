import React from 'react';
import { useContext, Context } from '../../../context';
import Button from '@mui/material/Button';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import Popover from '@mui/material/Popover';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import fetchAPI from '../../../utilities/fetch';

const StartGameButton = ({ quizId, isActive, setIsActive, fetchAllQuizzes }) => {
  const { getters } = useContext(Context);

  const copyToClip = () => navigator.clipboard.writeText(quizId);

  const startGame = async () => {
    if (!isActive) {
      console.log('started');
      setIsActive(true);
      const res = await fetchAPI('POST', getters.token, `admin/quiz/${quizId}/start`)
      if (res.error) console.log(res.error);
      await fetchAllQuizzes();
    }
  }

  return (
    <PopupState variant="popover" popupId="demo-popup-popover">
      {(popupState) => (
        <div onClick={startGame}>
            <Button
              variant="contained"
              endIcon={<PlayCircleOutlineIcon/>}
              {...bindTrigger(popupState)}
              sx={{ backgroundColor: 'tomato', width: '90%', height: '24px', position: 'absolute', bottom: '5%', left: '5%', fontSize: '11px' }}
            >
            {!isActive ? 'Start Quiz' : 'Get Quiz Code'}
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
                inputProps={{ 'aria-label': 'search google maps' }}
                onChange={() => {}}
                disabled
                value={quizId}
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
  );
}

export default StartGameButton;
