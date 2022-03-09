import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Result from './Result';

test('renders initial conditions', () => {
  render(<Result score={0} submitScore={jest.fn()} />);

  const title = screen.getByRole('heading', { name: /all done/i });
  expect(title).toBeInTheDocument();

  const score = screen.getByText(/Your final score is 0./i);
  expect(score).toBeInTheDocument();

  const submitButton = screen.getByRole('button', { name: /submit/i });
  expect(submitButton).toBeInTheDocument();

  const input = screen.getByRole('textbox', { name: /Enter initials:/i });
  expect(input).toBeInTheDocument();
});

test('input should have a maximum of 2 characters', () => {
  render(<Result score={0} submitScore={jest.fn()} />);

  const input = screen.getByRole('textbox', { name: /Enter initials:/i });
  userEvent.type(input, 'MNADS');
  expect(input).toHaveValue('MN');
});

test('should call for submit score with input value when submit button clicked', () => {
  const mockSubmitScore = jest.fn();
  render(<Result score={0} submitScore={mockSubmitScore} />);

  const input = screen.getByRole('textbox', { name: /Enter initials:/i });
  userEvent.type(input, 'MN');

  const submitButton = screen.getByRole('button', { name: /submit/i });
  userEvent.click(submitButton);

  expect(mockSubmitScore).toHaveBeenCalledWith(0, 'MN');
});
