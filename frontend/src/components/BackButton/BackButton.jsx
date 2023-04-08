import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const BackButton = ({ path }) => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(path);
  };

  return (
    <IconButton onClick={handleBack} aria-label='back button'>
      <ArrowBackIcon />
    </IconButton>
  );
};
export default BackButton;
