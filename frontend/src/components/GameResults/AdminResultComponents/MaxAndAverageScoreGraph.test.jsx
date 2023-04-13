
import React from 'react'
import { render, screen } from '@testing-library/react'
import MaxAndAverageScoreGraph from './MaxAndAverageScoreGraph'

describe('MaxAndAverageScoreGraph', () => {
  const data = [
    {
      name: 'Q 1',
      numCorrect: 1,
      totalPoints: 2,
      maxPoints: 15,
      maxTime: 15,
      totalTime: 12.848,
      correctTotalTime: 12.848,
      avg: 2,
      avgTime: 12.848,
      avgCorrectTime: 12.848
    },
    {
      name: 'Q 2',
      numCorrect: 1,
      totalPoints: 6,
      maxPoints: 10,
      maxTime: 10,
      totalTime: 4.189,
      correctTotalTime: 4.189,
      avg: 6,
      avgTime: 4.189,
      avgCorrectTime: 4.189
    },
    {
      name: 'Q 3',
      numCorrect: 1,
      totalPoints: 113,
      maxPoints: 150,
      maxTime: 150,
      totalTime: 37.498,
      correctTotalTime: 37.498,
      avg: 113,
      avgTime: 37.498,
      avgCorrectTime: 37.498
    }
  ]
  const numPlayers = 3

  it('should render the component without errors', () => {
    render(
      <MaxAndAverageScoreGraph data={data} numPlayers={numPlayers} />
    )
    expect(screen.getAllByText(/points/i)[0]).toBeInTheDocument()
    expect(screen.getAllByText(/avg/i)[0]).toBeInTheDocument()
    expect(screen.getByText(/maxpoints/i)).toBeInTheDocument()
    expect(screen.getAllByText(/Q 1/i).length === 2)
    expect(screen.getByText(/Q 2/i)).toBeInTheDocument()
    expect(screen.getByText(/Q 3/i)).toBeInTheDocument()
  })
})
