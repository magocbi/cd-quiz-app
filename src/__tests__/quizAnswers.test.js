import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.runOnlyPendingTimers();
  jest.useRealTimers();
});

test('should show start quiz card by default', () => {
  render(<App />);

  const startQuizButton = screen.getByRole('button', { name: /start quiz/i });
  expect(startQuizButton).toBeInTheDocument();

  const title = screen.getByRole('heading', { name: /Coding Quiz Challenge/i });
  expect(title).toBeInTheDocument();
});

test('should show highscores if highscore button is clicked', () => {
  render(<App />);

  const highscoreButton = screen.getByRole('button', {
    name: /view highscores/i,
  });
  userEvent.click(highscoreButton);

  const highscoreTitle = screen.getByRole('heading', { name: /Highscores/i });
  expect(highscoreTitle).toBeInTheDocument();
});

test('should render questions and stop when time runs out and allow to enter highscore then back to start', () => {
  render(<App />);

  const startQuizButton = screen.getByRole('button', { name: /start quiz/i });
  userEvent.click(startQuizButton);

  act(() => {
    jest.advanceTimersByTime(50000);
  });

  const score = screen.getByText(/Your final score is/i);
  expect(score).toHaveTextContent('0.');

  const initialsInput = screen.getByRole('textbox', {
    name: /Enter initials/i,
  });
  userEvent.type(initialsInput, 'DE');

  const submitButton = screen.getByRole('button', { name: /submit/i });
  userEvent.click(submitButton);

  const highscores = screen.getAllByRole('listitem');
  const highscore = highscores.find((score) => score.textContent === 'DE - 0');

  expect(highscore).toBeInTheDocument();

  const goBackButton = screen.getByRole('button', { name: /go back/i });
  userEvent.click(goBackButton);

  const startQuizButtonAgain = screen.getByRole('button', {
    name: /start quiz/i,
  });
  expect(startQuizButtonAgain).toBeInTheDocument();
});
