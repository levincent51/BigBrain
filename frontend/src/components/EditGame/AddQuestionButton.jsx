import React, { useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Grid } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';

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
    const updatedQuestions = [...quizInfo.questions, { id: quizInfo.questions.at(-1).id + 1, question: newQuestion }];
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
          startIcon={<AddCircleIcon />}
          onClick={handleAddQuestion}
        >
          Add Question
        </Button>
      </Grid>
      <Dialog maxWidth='lg' PaperProps={{ style: { minWidth: '60vh' } }} open={modalOpen} onClose={() => setModalOpen(false)}>
        <DialogTitle>Add New Question</DialogTitle>
        <DialogContent>
          <TextField
            label="Question"
            variant="outlined"
            margin="normal"
            value={newQuestion}
            onChange={handleQuestionChange}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setModalOpen(false)}>Cancel</Button>
          <Button onClick={handleSaveQuestion} color="primary">Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default AddQuestionButton;