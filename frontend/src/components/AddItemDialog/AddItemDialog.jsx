import React, { useState } from 'react';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Grid } from '@mui/material';

function AddItemDialog ({ limit, current, handleSave, itemName }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [newItem, setNewItem] = useState('');

  const handleItemChange = (event) => {
    setNewItem(event.target.value);
  };

  const handleAddItem = () => {
    setModalOpen(true);
  };

  const handleSaveItem = () => {
    handleSave(newItem);
    setModalOpen(false);
    setNewItem('');
  };

  return (
    <>
      <Grid item xs={12}>
        <Button
          aria-label={`Add new ${itemName} button`}
          variant="outlined"
          color="primary"
          disabled={current >= limit}
          startIcon={<AddCircleIcon />}
          onClick={handleAddItem}
        >
          Add {itemName}
        </Button>
      </Grid>
      <Dialog maxWidth='lg' PaperProps={{ style: { minWidth: '60vh', maxWidth: '90vh' } }} open={modalOpen} onClose={() => setModalOpen(false)}>
        <DialogTitle>Add New {itemName}</DialogTitle>
        <DialogContent>
          <TextField
            aria-label={`Add new ${itemName} field`}
            label={itemName}
            autoFocus
            variant="outlined"
            margin="normal"
            value={newItem}
            onChange={handleItemChange}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button aria-label='cancel button' onClick={() => setModalOpen(false)}>Cancel</Button>
          <Button aria-label='save button' onClick={handleSaveItem} color="primary">Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default AddItemDialog;
