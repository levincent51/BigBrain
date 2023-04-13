import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import Question from './Question'
import fetchAPI from '../../utilities/fetch'

jest.mock('../../utilities/fetch')

describe('Question', () => {
  const playerId = 'player123'
  const question = {
    id: 1,
    question: 'What is your favorite color?',
    multipleChoice: true,
    options: ['Red', 'Green', 'Blue'],
    score: 10,
    url: ''
  }
  const answer = null
  const timeLeft = 30

  it('renders the question', () => {
    render(<Question playerId={playerId} question={question} answer={answer} timeLeft={timeLeft} />)
    expect(screen.getByRole('heading', {
      name: /q: what is your favorite color\?/i
    })).toBeInTheDocument()
    expect(screen.getByText(/30 secs left/i)).toBeInTheDocument()
    expect(screen.getByText(/score: 10/i)).toBeInTheDocument()
  })

  it('allows the user to select options', () => {
    render(<Question playerId={playerId} question={question} answer={answer} timeLeft={timeLeft} />)
    const option1 = screen.getByLabelText('Red')
    const option2 = screen.getByLabelText('Green')
    const option3 = screen.getByLabelText('Blue')
    fireEvent.click(option1)
    fireEvent.click(option3)
    expect(option1).toBeChecked()
    expect(option2).not.toBeChecked()
    expect(option3).toBeChecked()
  })

  it('calls fetchAPI to send answer when an option is selected', () => {
    const mockData = { answerIds: [0] }
    fetchAPI.mockResolvedValue(mockData)
    render(<Question playerId={playerId} question={question} answer={answer} timeLeft={timeLeft}/>)
    const option1 = screen.getByLabelText('Red')
    fireEvent.click(option1)
    expect(fetchAPI).toHaveBeenCalledTimes(1)
    expect(fetchAPI).toHaveBeenCalledWith('PUT', null, `play/${playerId}/answer`, mockData)
  })
})
