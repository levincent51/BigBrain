import React, { useState, useEffect } from 'react';
import { useContext, Context } from '../../../context';
import fetchAPI from '../../../utilities/fetch';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import brainLogo from './brainlogo.jpg'
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Chip from '@mui/material/Chip';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import StopIcon from '@mui/icons-material/Stop';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import { blue } from '@mui/material/colors';

const Games = ({ quiz, fetchAllQuizzes }) => {
  const navigate = useNavigate();

  const { getters } = useContext(Context);
  const [sessionId, setSessionId] = useState('');

  const fetchQuizData = async (quiz) => {
    const res = await fetchAPI('GET', getters?.token, `admin/quiz/${quiz.id}`)
    if (res.error) alert(res.error);
    else {
      setSessionId(quiz.sessionId);
    }
  }

  useEffect(async () => {
    console.log(quiz);
    await fetchQuizData(quiz);
  }, []);

  const viewResults = () => {
    navigate(`/game/result/${quiz.id}/${quiz.sessionId}`);
  }

  return (
    <Card sx={{ width: 200, height: 210, position: 'relative' }}>
      <CardMedia
        component="img"
        height="120"
        image={quiz.thumbnail ? quiz.thumbnail : brainLogo}
        alt="Quiz thumbnail"
      />
      <CardContent>
        <Typography gutterBottom variant="small" component="div">
          {quiz.name}
        </Typography>
      </CardContent>
      <CardActions
        sx={{ justifyContent: 'center' }}
      >
        <Button
            variant="contained"
            endIcon={<StopIcon/>}
            {...bindTrigger(PopupState)}
            sx={{ backgroundColor: blue[500], width: '90%', height: '24px', position: 'absolute', bottom: '5%', left: '5%', fontSize: '11px' }}
            onClick={viewResults}
        >
            View Results
        </Button>
      </CardActions>
    </Card>
  );
};

export default Games;
