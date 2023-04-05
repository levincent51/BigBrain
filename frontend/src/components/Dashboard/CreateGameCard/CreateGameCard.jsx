import React from 'react';
import { useContext, Context } from '../../../context';
import fetchAPI from '../../../utilities/fetch';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import brainLogo from '../GameCard/brainlogo.jpg'
import CardActions from '@mui/material/CardActions';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';

const CreateGameCard = ({ fetchAllQuizzes }) => {
  const { getters } = useContext(Context);

  const createPost = async () => {
    const res = await fetchAPI('POST', getters.token, 'admin/quiz/new', {
      name: 'test'
    })
    if (res.error) alert(res.error);
    await fetchAllQuizzes();
  }

  return (
    <Card sx={{ width: 200 }}>
      <CardMedia
      component="img"
      height="183"
      image={brainLogo}
      alt="Quiz thumbnail"
      />
      <CardContent>
        <IconButton aria-label="delete" size="small" color="success" onClick={createPost}>
          <AddIcon size="inherit"/>
        </IconButton>
      </CardContent>
      <CardActions>
      </CardActions>
    </Card>
  );
};

export default CreateGameCard;
