import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import AddQuestionButton from './AddQuestionButton'

describe('AddQuestionButton', () => {
  const mockQuizInfo = {
    name: 'quiz name',
    owner: 'quizowner@gmail.com',
    questions: [
      {
        id: 1,
        question: 'testquestion'
      }
    ]
  }
  const mockSetQuizInfo = jest.fn()

  it('should open the dialog when the add new question button button is clicked', () => {
    render(
      <AddQuestionButton quizInfo={mockQuizInfo} setQuizInfo={mockSetQuizInfo} />
    )
    const addQuestionButton = screen.getByRole('button', { name: /add new question button/i })
    userEvent.click(addQuestionButton)
    // dialog pop up
    expect(screen.getByRole('dialog')).toBeInTheDocument()
  })

  it('should close the dialog when the cancel button is clicked', () => {
    render(
      <AddQuestionButton quizInfo={mockQuizInfo} setQuizInfo={mockSetQuizInfo} />
    )
    const addQuestionButton = screen.getByRole('button', { name: /add new question button/i })
    userEvent.click(addQuestionButton)
    const cancelButton = screen.getByRole('button', { name: /cancel/i })
    // can press cancell and it disappears
    userEvent.click(cancelButton)
    expect(screen.queryByRole('dialog')).not.toBeVisible()
  })

  it('should add a new question to the quiz info when the save button is clicked', () => {
    render(
      <AddQuestionButton quizInfo={mockQuizInfo} setQuizInfo={mockSetQuizInfo} />
    )
    const addQuestionButton = screen.getByRole('button', { name: /add new question button/i })
    userEvent.click(addQuestionButton)
    const questionInput = screen.getByLabelText('Question')
    userEvent.type(questionInput, 'New Question')
    const saveButton = screen.getByRole('button', { name: /save/i })
    userEvent.click(saveButton)
    // expect a new question to be added, or at least the function to do so has been called.
    expect(mockSetQuizInfo).toHaveBeenCalledTimes(1)
    expect(mockSetQuizInfo).toHaveBeenCalledWith({
      ...mockQuizInfo,
      questions: [
        ...mockQuizInfo.questions,
        {
          id: 2,
          question: 'New Question',
          score: 1,
          timeLimit: 10
        }
      ]
    })
    expect(screen.queryByRole('dialog')).not.toBeVisible()
  })
})
