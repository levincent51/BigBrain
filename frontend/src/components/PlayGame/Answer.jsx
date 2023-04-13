import React from 'react'
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material'

const Answers = ({ answers }) => {
  return (
    <Box p={2}>
      <Typography variant="h5" component="h2" align="center" gutterBottom>
        Answers
      </Typography>
      <List>
        {answers.map((answer, index) => (
          <ListItem key={index}>
            <ListItemText primary={answer} />
          </ListItem>
        ))}
      </List>
    </Box>
  )
}

export default Answers
