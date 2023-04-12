import React, { useEffect, useRef } from 'react'
import ElevatorMusic from './elevator-music.mp3'
import LobbyVideo from './lobbyVideo.webm'
import ReactPlayer from 'react-player'

const gamePage = () => {
  let audio = useRef()

  useEffect(async () => {
    audio = new Audio(ElevatorMusic)
    audio.loop = true
    audio.volume = 0.5
    audio.play()
  }, [])

  useEffect(() => {
    return () => {
      audio.pause()
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
  )
}

export default gamePage
