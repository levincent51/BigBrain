import React, { useState } from 'react';
import { useContext, Context } from '../../../context';
import fetchAPI from '../../../utilities/fetch';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import startGame from './startGame.jpg';
import CardActions from '@mui/material/CardActions';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';

const CreateGameCard = ({ fetchAllQuizzes }) => {
  const { getters } = useContext(Context);
  const [newGameName, setNewGameName] = useState('');

  const createPost = async () => {
    const res = await fetchAPI('POST', getters.token, 'admin/quiz/new', {
      name: newGameName
    })
    if (res.error) alert(res.error);
    await fetchAllQuizzes();
  }

  return (
    <Card sx={{ width: 200, height: 210 }}>
      <CardMedia
      component="img"
      height="120"
      image={startGame}
      alt="Quiz thumbnail"
      />
      <CardActions>
        <Paper
          component="form"
          sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400, marginTop: '19px' }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="New game name"
            inputProps={{ 'aria-label': 'search google maps' }}
            onChange={e => setNewGameName(e.target.value)}
          />
          <Divider sx={{ height: 18, m: 0.2 }} orientation="vertical" />
          <IconButton aria-label="createGame" size="small" color="success" onClick={createPost}>
            <AddIcon/>
          </IconButton>
        </Paper>
      </CardActions>
    </Card>
  );
};

export default CreateGameCard;
