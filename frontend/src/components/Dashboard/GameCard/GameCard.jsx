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
import StartGameButton from './StartGameButton';

const Games = ({ quiz, fetchAllQuizzes }) => {
  const { getters } = useContext(Context);

  const [numQuestions, setNumQuestions] = useState(0);
  const [quizLength, setQuizLength] = useState(0);
  const [hoveringEdit, setHoveringEdit] = useState(false);
  const [isActive, setIsActive] = useState(null)

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
      setIsActive(res.active);
    }
  }

  const editGame = async () => {
    console.log('editgame')
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
    <Card sx={{ width: 200, height: 210, position: 'relative' }}>
        <CardMedia
          component="img"
          height="120"
          image={quiz.thumbnail ? quiz.thumbnail : brainLogo}
          alt="Quiz thumbnail"
          onMouseEnter={() => setHoveringEdit(true)}
          onMouseLeave={() => setHoveringEdit(false)}
        />
        <IconButton 
          sx={{ position: 'absolute', right: '2%', top: '2%', backgroundColor: 'white', height: '20px', width: '20px' }}
          aria-label="delete" 
          size="small"
          onClick={deleteQuiz}>
          <DeleteIcon sx={{ height: '15px'}}/>
        </IconButton>
        {hoveringEdit && <IconButton
          aria-label="edit game"
          size="small"
          onClick={editGame}
          sx={{ position: 'absolute', right: '40%', top: '20%', backgroundColor: 'white' }}
          onMouseEnter={() => setHoveringEdit(true)}
        >
          <EditIcon size="inherit"/>
        </IconButton>
        }
        <Stack
          direction="row" 
          spacing={1}
          sx={{ position: 'absolute', bottom: '46%', right: '2%'}}
        >
          <Chip icon={<QuestionMarkIcon sx={{ height: '85%'}} />} label={numQuestions} size="small" sx={{ backgroundColor: 'white', height: '18px'}} variant="outlined"/>
          <Chip icon={<AccessTimeFilledIcon sx={{ height: '85%'}} />} label={quizLength + ' s'} size="small" sx={{ backgroundColor: 'white', height: '18px'}} variant="outlined"/>
        </Stack>
        <CardContent>
        <Typography gutterBottom variant="small" component="div">
          {quiz.name}
        </Typography>
        </CardContent>
        <CardActions
          sx={{ justifyContent: 'center' }}
        >
        <StartGameButton quizId={quiz.id} isActive={isActive} setIsActive={setIsActive} fetchAllQuizzes={fetchAllQuizzes}/>
      </CardActions>
    </Card>
  );
};

export default Games;
