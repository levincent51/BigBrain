import React, { useState } from 'react';
// import AddCircleIcon from '@material-ui/icons/AddCircle';
import AddIcon from '@mui/icons-material/Add';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Grid } from '@mui/material';

function AddQuestionButton ({ quizInfo, setQuizInfo }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [newQuestion, setNewQuestion] = useState('');

  const handleQuestionChange = (event) => {
    setNewQuestion(event.target.value);
  };

  const handleAddQuestion = () => {
    setModalOpen(true);
  };

  const handleSaveQuestion = () => {
    const id = quizInfo.questions?.length !== 0 ? quizInfo.questions[quizInfo.questions.length - 1].id + 1 : 1;
    const updatedQuestions = [...quizInfo.questions, { id, question: newQuestion, score: 1, timeLimit: 10 }];
    setQuizInfo({ ...quizInfo, questions: updatedQuestions });

    setModalOpen(false);
    setNewQuestion('');
  };

  return (
    <>
      <Grid item xs={12}>
        <Button
          variant="outlined"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleAddQuestion}
          aria-label='Add new question button'
        >
          Add Question
        </Button>
      </Grid>
      <Dialog maxWidth='lg' PaperProps={{ style: { minWidth: '60vh', maxWidth: '90vh' } }} open={modalOpen} onClose={() => setModalOpen(false)}>
        <DialogTitle>Add New Question</DialogTitle>
        <DialogContent>
          <TextField
            label="Question"
            variant="outlined"
            margin="normal"
            autoFocus
            value={newQuestion}
            onChange={handleQuestionChange}
            aria-label='Add new question field'
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button aria-label='cancel button' onClick={() => setModalOpen(false)}>Cancel</Button>
          <Button aria-label='save button' onClick={handleSaveQuestion} color="primary">Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default AddQuestionButton;
