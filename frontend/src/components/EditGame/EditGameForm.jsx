import React from 'react';
import brainlogo from '../../components/Dashboard/GameCard/brainlogo.jpg';
import AddQuestionButton from '../../components/EditGame/AddQuestionButton';
import BackButton from '../BackButton/BackButton';

import Box from '@mui/material/Box';
import CardMedia from '@mui/material/CardMedia';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Grid, IconButton } from '@mui/material';
import Delete from '@mui/icons-material/Delete';
import ImageIcon from '@mui/icons-material/Image';
import Edit from '@mui/icons-material/Edit';

const EditGameForm = ({ quizInfo, savedInfo, setQuizInfo, handleSubmit, navigateToQuestion }) => {
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

  const disabledEdit = (id) => {
    console.log(id);
    const ob = savedInfo.questions?.find(x => x.id === id);
    if (ob) return false;
    else return true;
  }

  return (
    <form onSubmit={handleSubmit}>
        <Box display="flex" justifyContent='space-between'>
        <Typography variant="h6" gutterBottom>
          Edit Game
        </Typography>
        <Box display="flex" justifyContent="flex-end" mb={2}>
          <BackButton path={'/'} />
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
          aria-label='Quiz thumbnail'
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
          aria-label='upload thumbnail'
          component="span"
          size="medium"
          endIcon={<ImageIcon aria-label='upload thumbnail icon' />}
        >
          Upload New Thumbnail
        </Button>
      </label>
      <Typography variant="h6" gutterBottom>
        Questions
      </Typography>
      <Grid container spacing={2} paddingBottom={2}>
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
            <IconButton disabled={quizInfo.questions?.length <= 1} onClick={() => handleDeleteQuestion(index)} aria-label='delete question'>
              <Delete />
            </IconButton>
            <IconButton disabled={disabledEdit(q.id)} onClick={() => navigateToQuestion(q.id)} aria-label='edit question'>
              <Edit />
            </IconButton>
          </Grid>
        ))}
        <AddQuestionButton aria-label='Add question' quizInfo={quizInfo} setQuizInfo={setQuizInfo}></AddQuestionButton>
      </Grid>
      <Typography variant='subtitle2'>Note: You must save changes for new questions to access them</Typography>
      <Box mt={2} display="flex" justifyContent="center">
        <Button fullWidth aria-label='save game changes' variant="contained" color="primary" type="submit" onClick={handleSubmit}>
          Save Changes
        </Button>
      </Box>
    </form>
  );
}

export default EditGameForm;
