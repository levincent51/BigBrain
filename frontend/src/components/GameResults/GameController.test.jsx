import React from 'react'
import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import GameController from './GameController'
import { Context } from '../../context'
import { endGame, advanceGame } from '../../utilities/helpers'

jest.mock('../../utilities/helpers', () => ({
  endGame: jest.fn(),
  advanceGame: jest.fn()
}))

describe('GameController', () => {
  const sessionId = '123456'
  const quizId = '7890'
  const token = 'test-token'
  const loadGameStatusMock = jest.fn()

  it('advances game and calls advanceGame when button clicked', async () => {
    render(
      <Context.Provider value={{ getters: { token } }}>
        <BrowserRouter>
          <GameController
            sessionId={sessionId}
            quizId={quizId}
            loadGameStatus={loadGameStatusMock}
            quizProgress={0}
            totalQuestions={5}
          />
        </BrowserRouter>
      </Context.Provider>
    )
    const advanceGameButton = screen.getByText(/advance game/i)
    fireEvent.click(advanceGameButton)
    // check that the progress has incremented and that advance game is called
    await waitFor(() => {
      expect(advanceGame).toHaveBeenCalledWith(quizId, token)
      expect(loadGameStatusMock).toHaveBeenCalled()
    })
    expect(screen.getByText(/1 \/ 5/i)).toBeInTheDocument()
  })

  it('calls endGame when "Stop Game" button is clicked', async () => {
    render(
      <Context.Provider value={{ getters: { token } }}>
        <BrowserRouter>
          <GameController
            sessionId={sessionId}
            quizId={quizId}
            loadGameStatus={loadGameStatusMock}
            quizProgress={0}
            totalQuestions={2}
          />
        </BrowserRouter>
      </Context.Provider>
    )
    const stopGameButton = screen.getByText(/stop game/i)
    // clicking stop calls endGame
    fireEvent.click(stopGameButton)
    await waitFor(() => {
      expect(endGame).toHaveBeenCalledWith(quizId, token)
      expect(loadGameStatusMock).toHaveBeenCalled()
    })
  })

  it('see results button replaces advance game when quiz progress reaches total question', async () => {
    render(
      <Context.Provider value={{ getters: { token } }}>
        <BrowserRouter>
          <GameController
            sessionId={sessionId}
            quizId={quizId}
            loadGameStatus={loadGameStatusMock}
            quizProgress={1}
            totalQuestions={2}
          />
        </BrowserRouter>
      </Context.Provider>
    )
    // see results replaces advance game when 100% progress
    const seeResultsButton = screen.getByText(/see results/i)
    expect(seeResultsButton).toBeInTheDocument()
  })
})
