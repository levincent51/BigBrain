/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from 'react';
import { useContext, Context } from '../../context';
import { useParams } from 'react-router-dom';
import { playerGetStatus } from '../../utilities/helpers';
import ElevatorMusic from './elevator-music.mp3';
import LobbyVideo from './lobbyVideo.webm';
import ReactPlayer from 'react-player';

const gamePage = ({ quizId }) => {
  const params = useParams();
  const playerId = params.playerId;
  const { getters } = useContext(Context);
  const [quizStatus, setQuizStatus] = useState({});

  let audio = useRef();

  useEffect(async () => {
    audio = new Audio(ElevatorMusic);
    audio.loop = true;
    audio.volume = 0.5;
    audio.play();
  }, []);

  useEffect(() => {
    return () => {
      audio.pause()
      console.log("in cleanup")
    }
  }, [])

  return (
    <>
      <h1>
        Lobby
      </h1>
      <ReactPlayer
        url={LobbyVideo}
        playing={true}
        width={'100%'}
        height={'100%'}
      />
    </>
  );
};

export default gamePage;
