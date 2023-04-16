import React, { useState } from 'react'
import { useContext, Context } from '../../../context'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import startGame from './startGame.jpg'
import CardActions from '@mui/material/CardActions'
import AddIcon from '@mui/icons-material/Add'
import IconButton from '@mui/material/IconButton'
import Paper from '@mui/material/Paper'
import InputBase from '@mui/material/InputBase'
import Divider from '@mui/material/Divider'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import { createPost, handleGameUpload } from '../../../utilities/helpers'

const CreateGameCard = ({ fetchAllQuizzes }) => {
  const { getters } = useContext(Context)
  const [newGameName, setNewGameName] = useState('')
  const [open, setOpen] = React.useState(false)
  const [hasUploadedFileOpen, setHasUploadedFileOpen] = React.useState(false)
  const [uploadGameData, setUploadGameData] = useState(undefined)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleFileChange = (event) => {
    const file = event.target.files[0]
    const reader = new FileReader()
    reader.readAsText(file)
    reader.onloadend = () => {
      setUploadGameData(JSON.parse(reader.result))
      setHasUploadedFileOpen(true)
    }
  }

  const uploadGame = async () => {
    const uploadedGameId = await createPost(getters.token, uploadGameData.name, fetchAllQuizzes)
    handleGameUpload(getters.token, uploadedGameId, uploadGameData, fetchAllQuizzes)
    handleClose()
  }

  return (
    <Card sx={{ width: 200, height: 210 }}>
      <CardMedia
      component="img"
      height="120"
      image={startGame}
      alt="Quiz thumbnail"
      />
      <CardActions sx={{ display: 'flex', flexDirection: 'column' }}>
        <Paper
          component="form"
          sx={{ display: 'flex', alignItems: 'center', mb: '5px', width: '100%' }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="New game name"
            name="new-game-input"
            inputProps={{ 'aria-label': 'upload game' }}
            onChange={e => setNewGameName(e.target.value)}
          />
          <Divider sx={{ height: 18, m: 0.2 }} orientation="vertical" />
          <IconButton aria-label="createGame" name="create-game" size="small" color="success" onClick={() => createPost(getters.token, newGameName, fetchAllQuizzes)}>
            <AddIcon/>
          </IconButton>
        </Paper>
        <Button
          variant="outlined" onClick={handleClickOpen}
          sx={{ display: 'flex', alignItems: 'center', width: '100%' }}
        >
          Upload Game
          </Button>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogContent>
            <input
              style={{ }}
              accept=".json"
              id="file-upload"
              type="file"
              onChange={handleFileChange}
            />
            </DialogContent>
            <DialogActions>
              <Button
                onClick={uploadGame}
                disabled={!hasUploadedFileOpen}
              >
                Upload Game
              </Button>
            </DialogActions>
          </Dialog>
      </CardActions>
    </Card>
  )
}

export default CreateGameCard
