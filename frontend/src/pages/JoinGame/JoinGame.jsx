import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { joinSession } from '../../utilities/helpers';
import Container from '@mui/material/Container';

const JoinGame = () => {
  const params = useParams();
  const sessionId = params.sessionId;
  const navigate = useNavigate();
  const [playerName, setPlayerName] = useState('');

  const joinAndRedirectToGame = async () => {
    const playerId = await joinSession(sessionId, playerName);
    navigate(`/game/play/${playerId}`);
  }

  return (
    <Container sx={{ display: 'flex', justifyContent: 'center' }}>
      <Paper
        component="form"
        sx={{
          p: '2px 4px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          margin: '10px',
          width: 'fit-content',
        }}
      >
        <Paper sx={{ display: 'flex', margin: '10px' }}>
          <Typography
            sx={{ p: '5px' }}
          >
            Game Id
          </Typography>
          <InputBase
            sx={{ ml: 1, flex: 1, width: '200px' }}
            inputProps={{ 'aria-label': 'Game ID' }}
            disabled
            value={sessionId}
          />
        </Paper>
        <Paper sx={{ display: 'flex', margin: '10px' }}>
          <Typography
            sx={{ p: '5px' }}
          >
            Name
          </Typography>
          <InputBase
            sx={{ ml: 1, flex: 1, width: '220px' }}
            inputProps={{ 'aria-label': 'Game ID' }}
            placeholder='Your quiz name'
            onChange={(e) => {
              console.log(e.target.value);
              setPlayerName(e.target.value);
            }}
          />
        </Paper>
        <Button
          variant="contained"
          sx={{ m: '10px' }}
          onClick={joinAndRedirectToGame}
          disabled = {playerName === ''}
        >
          Join Game
        </Button>
      </Paper>
    </Container>
  )
}

export default JoinGame;
