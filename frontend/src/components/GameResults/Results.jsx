/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useContext, Context } from '../../context';
import { useParams } from 'react-router-dom';
import { fetchGameResults } from '../../utilities/helpers';

const Results = () => {
  const params = useParams();
  const sessionId = params.sessionId;
  const { getters } = useContext(Context);
  const [results, setResults] = useState({});

  useEffect(async () => {
    console.log('LOADING IN RESULTS');
    setResults(await fetchGameResults(getters.token, sessionId));
  }, []);

  return (
    <>
        Results
    </>
  )
}

export default Results
