import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Games from './GameCard';
import { BrowserRouter } from 'react-router-dom';
import fetchAPI from '../../../utilities/fetch';

jest.mock('../../../utilities/fetch');

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('Games component', () => {
  it('renders a card with the quiz name, thumbnail, and metadata', async () => {
    const quiz = {
      name: 'Test Quiz',
      thumbnail: 'https://example.com/image.jpg',
    };
    const mockData = {
      createdAt: '2023-04-09T10:41:29.202Z',
      owner: '123@mail.com',
      name: 'Test Quiz',
      thumbnail: 'https://example.com/image.jpg',
      active: null,
      oldSessions: [],
      questions: [
        { id: 1, question: 'Question 1', timeLimit: 10 },
        { id: 2, question: 'Question 2', timeLimit: 10 }
      ],
    };
    fetchAPI.mockResolvedValue(mockData);

    render(
      <BrowserRouter>
        <Games quiz={quiz} />
      </BrowserRouter>
    );

    // Wait for the component to finish rendering
    await screen.findByText('Test Quiz');

    // renders all the information correctly
    expect(screen.getByText('Test Quiz')).toBeInTheDocument();
    expect(screen.getByAltText('Quiz thumbnail')).toHaveAttribute('src', 'https://example.com/image.jpg');
    expect(screen.getByRole('button', { name: /start quiz/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /delete/i })).toBeInTheDocument();
    fireEvent.mouseEnter(screen.getByAltText('Quiz thumbnail'));
    expect(screen.getByRole('button', { name: /edit game/i })).toBeInTheDocument();

    // fetch for question and time
    expect(fetchAPI).toHaveBeenCalledTimes(1);
    expect(fetchAPI).toHaveBeenCalledWith('GET', undefined, `admin/quiz/${quiz.id}`);
    await screen.findByText('Test Quiz');

    // expect 2 questions and 20 s to be in card
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('20 s')).toBeInTheDocument();
  });

  it('renders end quiz if quiz is active', async () => {
    const quiz = {
      name: 'Test Quiz',
      thumbnail: 'https://example.com/image.jpg',
      active: 123,
    };
    const mockData = {
      createdAt: '2023-04-09T10:41:29.202Z',
      owner: '123@mail.com',
      name: 'Test Quiz',
      thumbnail: 'https://example.com/image.jpg',
      active: 123,
      oldSessions: [],
      questions: [
        { id: 1, question: 'Question 1', timeLimit: 10 },
        { id: 2, question: 'Question 2', timeLimit: 10 }
      ],
    };
    fetchAPI.mockResolvedValue(mockData);

    render(
      <BrowserRouter>
        <Games quiz={quiz} />
      </BrowserRouter>
    );
    // Wait for the component to finish rendering
    await screen.findByText('Test Quiz');

    // renders all the information correctly
    expect(screen.getByRole('button', { name: /end quiz/i })).toBeInTheDocument();
  });

  it('calls the deleteQuiz function when the delete button is clicked', async () => {
    const quiz = {
      name: 'Test Quiz',
      thumbnail: 'https://example.com/image.jpg',
    };
    const mockData = {
      createdAt: '2023-04-09T10:41:29.202Z',
      owner: '123@mail.com',
      name: 'Test Quiz',
      thumbnail: 'https://example.com/image.jpg',
      active: null,
      oldSessions: [],
      questions: [
        { id: 1, question: 'Question 1', timeLimit: 10 },
        { id: 2, question: 'Question 2', timeLimit: 10 }
      ],
    };
    fetchAPI.mockResolvedValue(mockData);

    const mockFetchAllQuizzes = jest.fn();

    render(
      <BrowserRouter>
        <Games quiz={quiz} fetchAllQuizzes={mockFetchAllQuizzes}/>
      </BrowserRouter>
    );

    // Wait for the component to finish rendering
    await screen.findByText('Test Quiz');
    expect(fetchAPI).toHaveBeenCalledTimes(1);
    fireEvent.click(screen.getByRole('button', { name: /delete/i }));
    await waitFor(() => expect(fetchAPI.mock.calls.length).toBe(2));

    expect(fetchAPI).toHaveBeenCalledWith('DELETE', undefined, `admin/quiz/${quiz.id}`);
  });

  it('navigates to the edit game page when the edit button is clicked', async () => {
    const quiz = {
      name: 'Test Quiz',
      thumbnail: 'https://example.com/image.jpg',
    };
    const mockData = {
      createdAt: '2023-04-09T10:41:29.202Z',
      owner: '123@mail.com',
      name: 'Test Quiz',
      thumbnail: 'https://example.com/image.jpg',
      active: null,
      oldSessions: [],
      questions: [
        { id: 1, question: 'Question 1', timeLimit: 10 },
        { id: 2, question: 'Question 2', timeLimit: 10 }
      ],
    };
    fetchAPI.mockResolvedValue(mockData);

    const mockNavigate = jest.fn();

    render(
      <BrowserRouter>
        <Games quiz={quiz} navigate={mockNavigate}/>
      </BrowserRouter>
    );

    // Wait for the component to finish rendering
    await screen.findByText('Test Quiz');
    expect(fetchAPI).toHaveBeenCalledTimes(1);
    fireEvent.mouseEnter(screen.getByAltText('Quiz thumbnail'));
    // expect navigate to be called
    expect(screen.getByRole('button', { name: /edit game/i })).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /edit game/i }));
  });

  it('renders a start game button if the quiz is not active', () => {
    const quiz = {
      name: 'Test Quiz',
      thumbnail: 'https://example.com/image.jpg',
    };
    render(<Games quiz={quiz} isActive={false} />);
    expect(screen.getByRole('button', { name: /start quiz/i })).toBeInTheDocument();
  });
});
