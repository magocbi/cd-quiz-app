import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Start from './Start';

test('renders initial conditions', () => {
  render(<Start startQuiz={jest.fn()} />);

  const description = screen.getByText(/Try to answer the following/i);
  expect(description).toBeInTheDocument();

  const instructions = screen.getByText(/incorrect answers will penalize/i);
  expect(instructions).toBeInTheDocument();

  const startButton = screen.getByRole('button', { name: /start quiz/i });
  expect(startButton).toBeInTheDocument();
  expect(startButton).toBeEnabled();
});

test('calls start quiz when button clicked', () => {
  const mockStartQuiz = jest.fn();
  render(<Start startQuiz={mockStartQuiz} />);

  const startButton = screen.getByRole('button', { name: /start quiz/i });

  userEvent.click(startButton);
  expect(mockStartQuiz).toHaveBeenCalledTimes(1);
});
