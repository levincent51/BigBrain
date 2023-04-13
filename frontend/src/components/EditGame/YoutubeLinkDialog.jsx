import React, { useState } from 'react'
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material'

const YoutubeLinkDialog = ({ open, onClose, questionInfo, setQuestionInfo }) => {
  const [link, setLink] = useState('')

  const handleLinkChange = (event) => {
    event.preventDefault()

    const text = event.clipboardData.getData('text/plain')
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/
    const match = text.match(regExp)
    if (match) {
      const videoId = match[7]
      setLink(`https://www.youtube.com/embed/${videoId}`)
    } else {
      alert('Invalid youtube link, please ensure you copy a valid youtube link')
    }
  }

  const handleCancel = () => {
    setLink('')
    onClose()
  }

  const handleSave = () => {
    setQuestionInfo({ ...questionInfo, url: link })
    setLink('')
    onClose()
  }

  return (
    <Dialog maxWidth='lg' PaperProps={{ style: { minWidth: '60vh', maxWidth: '90vh' } }} open={open} onClose={handleCancel}>
      <DialogTitle>Insert YouTube Link</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Paste your YouTube link here"
          type="url"
          value={link}
          readOnly
          onPaste={handleLinkChange}
          fullWidth
          aria-label='Paste youtube link'
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel} aria-label='cancel button' color="primary">
          Cancel
        </Button>
        <Button onClick={handleSave} aria-label='save button' color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  )
}
export default YoutubeLinkDialog
