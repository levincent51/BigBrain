import React, { useState, useEffect } from 'react';
import { useContext, Context } from '../../../context';
import fetchAPI from '../../../utilities/fetch';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import brainLogo from './brainlogo.jpg'
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import Stack from '@mui/material/Stack';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Chip from '@mui/material/Chip';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const Games = ({ quiz, fetchAllQuizzes }) => {
  const [numQuestions, setNumQuestions] = useState(0);
  const [quizLength, setQuizLength] = useState(0);

  const { getters } = useContext(Context);

  const fetchQuizData = async () => {
    const res = await fetchAPI('GET', getters.token, `admin/quiz/${quiz.id}`)
    if (res.error) alert(res.error);
    else {
      console.log(res);
      setNumQuestions(res.questions.length)
      let total = 0;
      res.questions.forEach(q => {
        total += q.timeLimit;
      })
      setQuizLength(total);
    }
  }

  const editGame = async () => {

  }

  const deleteQuiz = async () => {
    const res = await fetchAPI('DELETE', getters.token, `admin/quiz/${quiz.id}`)
    if (res.error) alert(res.error);
    else {
      await fetchAllQuizzes();
    }
  }

  useEffect(async () => {
    await fetchQuizData();
  }, []);

  return (
    <Card sx={{ width: 200 }}>
        <CardMedia
          component="img"
          height="120"
          image={quiz.thumbnail ? quiz.thumbnail : brainLogo}
          alt="Quiz thumbnail"
        />
        <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {quiz.name}
        </Typography>
        <Stack direction="row" spacing={1}>
          <Chip icon={<QuestionMarkIcon />} label={numQuestions} size="small" />
          <Chip icon={<AccessTimeFilledIcon />} label={quizLength + ' s'} size="small"/>
        </Stack>
        </CardContent>
        <CardActions>
        <IconButton aria-label="delete" size="small" color="error" onClick={deleteQuiz}>
          <DeleteIcon size="inherit"/>
        </IconButton>
        <IconButton aria-label="edit game" size="small" color="success" onClick={editGame}>
          <EditIcon size="inherit"/>
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default Games;
