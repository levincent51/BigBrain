import React, { useState, useEffect } from 'react';
import List from '@mui/material/List';
// import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import StarIcon from '@mui/icons-material/Star';

const LeaderBoard = ({ userPerformance }) => {
  const sortedUserPerformance = Object
    .values(userPerformance)
    .sort((a, b) => {
      return b.points > a.points
        ? 1
        : b.points < a.points
          ? -1
          : 0;
    })
    .slice(0, 5);

  const leaderBoard = sortedUserPerformance
    .map((userStats) => {
      return (
      <ListItemButton key={userStats.user.name}>
        <ListItemIcon>
          <StarIcon />
        </ListItemIcon>
        <ListItemText primary={userStats.user.name} />
        <ListItemText primary={userStats.points} />
      </ListItemButton>
      )
    })

  useEffect(() => {
    console.log(userPerformance)
  }, [userPerformance]);

  return (
    <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      aria-label="contacts"
    >
      <h2>LeaderBoard</h2>
      {leaderBoard}
    </List>
  );
}

export default LeaderBoard;
