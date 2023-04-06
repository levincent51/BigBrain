import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import fetchAPI from '../../utilities/fetch';
import { Context, useContext } from '../../context';
import AddQuestionButton from '../../components/EditGame/AddQuestionButton';

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

function EditGame (props) {
  // eslint-disable-next-line no-unused-vars
  const navigate = useNavigate();
  const { getters } = useContext(Context);
  const { id } = useParams();
  const initialValues = { name: '', questions: [], thumbnail: '' };
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
    console.log(id);
    const res = await fetchAPI('GET', getters.token, `admin/quiz/${id}`)
    console.log(res);
    if (res.error) alert(res.error);
    else {
      setQuizInfo(res);
    }
  }
  useEffect(async () => {
    await fetchQuizData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetchAPI('PUT', getters.token, `admin/quiz/${id}`, quizInfo)
    if (res.error) alert(res.error);
    else {
      alert('saved changes');
    }
  }

  return (
    <Container maxWidth="sm">
    <Box my={4}>
      <Paper variant="outlined">
        <form onSubmit={fetchQuizData}>
          <Box p={2}>
            <Typography variant="h6" gutterBottom>
              Edit Game
            </Typography>
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
            <Box width={'100%'} height={200}>
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
                  <IconButton onClick={() => handleDeleteQuestion(index)}>
                    <Delete />
                  </IconButton>
                  <IconButton onClick={() => fetchQuizData /* TODO */}>
                    <Edit />
                  </IconButton>
                </Grid>
              ))}
            </Grid>
            <AddQuestionButton quizInfo={quizInfo} setQuizInfo={setQuizInfo}/>
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
