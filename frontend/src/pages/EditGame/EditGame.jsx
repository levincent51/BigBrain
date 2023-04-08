import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import fetchAPI from '../../utilities/fetch';
import { Context, useContext } from '../../context';
import BackButton from '../../components/BackButton/BackButton';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import CardMedia from '@mui/material/CardMedia';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Paper, Grid, IconButton } from '@mui/material';
import Delete from '@mui/icons-material/Delete';
import ImageIcon from '@mui/icons-material/Image';
import Edit from '@mui/icons-material/Edit';
import brainlogo from '../../components/Dashboard/GameCard/brainlogo.jpg'
import AddQuestionButton from '../../components/EditGame/AddQuestionButton';

function EditGame (props) {
  const navigate = useNavigate();
  const { getters } = useContext(Context);
  const { gameId } = useParams();
  const initialValues = { name: '', questions: [], thumbnail: '' };
  const [savedInfo, setSavedInfo] = useState(initialValues);
  const [quizInfo, setQuizInfo] = useState(initialValues);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setQuizInfo({ ...quizInfo, thumbnail: reader.result });
    };

    reader.readAsDataURL(file);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuizInfo({ ...quizInfo, [name]: value });
  }

  const handleDeleteQuestion = (index) => {
    const updatedQuestions = [...quizInfo.questions];
    updatedQuestions.splice(index, 1);
    setQuizInfo({ ...quizInfo, questions: updatedQuestions });
  };

  const fetchQuizData = async () => {
    const res = await fetchAPI('GET', getters.token, `admin/quiz/${gameId}`)
    console.log(res);
    if (res.error) alert(res.error);
    else {
      setSavedInfo(res);
      setQuizInfo(res);
    }
  }
  useEffect(async () => {
    await fetchQuizData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetchAPI('PUT', getters.token, `admin/quiz/${gameId}`, quizInfo)
    if (res.error) alert(res.error);
    else {
      alert('saved changes');
      fetchQuizData();
    }
  }

  const disabledEdit = (id) => {
    console.log(id);
    const ob = savedInfo.questions?.find(x => x.id === id);
    if (ob) return false;
    else return true;
  }

  const navigateToQuestion = (id) => {
    navigate(`/editgame/${gameId}/${id}`);
  }

  return (
    <Container maxWidth="sm">
    <Box my={4}>
      <Paper variant="outlined">
        <form onSubmit={fetchQuizData}>
          <Box p={2}>
            <Box display="flex" justifyContent='space-between'>
              <Typography variant="h6" gutterBottom>
                Edit Game
              </Typography>
              <Box display="flex" justifyContent="flex-end" mb={2}>
                <BackButton path={'/'}/>
              </Box>
            </Box>
            <TextField
              label="Name"
              variant="outlined"
              margin="normal"
              name='name'
              value={quizInfo?.name}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Thumbnail Url"
              variant="outlined"
              margin="normal"
              value={quizInfo?.thumbnail ? quizInfo?.thumbnail : 'No Thumbnail'}
              disabled
              fullWidth
            />
            <Box>
              <CardMedia
                component="img"
                height="100%"
                image={quizInfo?.thumbnail ? quizInfo?.thumbnail : brainlogo}
                alt="Quiz thumbnail"
              />
            </Box>
            <input
              style={{ display: 'none' }}
              accept=".jpg, .jpeg, .png"
              id="file-upload"
              type="file"
              onChange={handleFileChange}
            />
            <label htmlFor="file-upload">
              <Button
                component="span"
                size="medium"
                endIcon={<ImageIcon />}
              >
                Upload New Thumbnail
              </Button>
            </label>
            <Typography variant="h6" gutterBottom>
              Questions
            </Typography>
            <Grid container spacing={2}>
              {quizInfo.questions?.map((q, index) => (
                <Grid item xs={12} key={index} style={{ display: 'flex', alignItems: 'center' }}>
                  <TextField
                    label={`Question ${index + 1}`}
                    variant="outlined"
                    margin="normal"
                    value={q.question}
                    InputProps={{ readOnly: true }}
                    fullWidth
                  />
                  <IconButton disabled={quizInfo.questions?.length <= 1} onClick={() => handleDeleteQuestion(index)}>
                    <Delete />
                  </IconButton>
                  <IconButton disabled={disabledEdit(q.id)} onClick={() => navigateToQuestion(q.id)}>
                    <Edit />
                  </IconButton>
                </Grid>
              ))}
              <AddQuestionButton quizInfo={quizInfo} setQuizInfo={setQuizInfo}></AddQuestionButton>

            </Grid>
              <Box mt={2} display="flex" justifyContent="center">
              <Button fullWidth variant="contained" color="primary" type="submit" onClick={handleSubmit}>
                Save Changes
              </Button>
            </Box>
          </Box>
        </form>
      </Paper>
    </Box>
  </Container>
  );
}

export default EditGame;
