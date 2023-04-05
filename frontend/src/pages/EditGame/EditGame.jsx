import React from 'react';

import { useParams } from 'react-router-dom';

const EditGame = (props) => {
  const params = useParams();
  console.log(params.gameid)

  return (
    <div>
      <h1>Hello</h1>
      {params.gameid}
    </div>
  );
};

export default EditGame;
