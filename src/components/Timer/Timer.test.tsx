import { act, render, screen } from '@testing-library/react';
import Timer from './Timer';

beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.runOnlyPendingTimers();
  jest.useRealTimers();
});

test('should render with no timer', () => {
  render(
    <Timer
      gameStarted={false}
      setGameOver={jest.fn()}
      incorrectNumber={0}
      setTimeLeft={jest.fn()}
    />
  );
  const timer = screen.getByRole('timer');
  expect(timer).not.toHaveTextContent(/Time: \d/i);
});

test('should render timer with 50 seconds when quiz starts', () => {
  render(
    <Timer
      gameStarted={true}
      setGameOver={jest.fn()}
      incorrectNumber={0}
      setTimeLeft={jest.fn()}
    />
  );
  const timer = screen.getByRole('timer');
  expect(timer).toHaveTextContent('50');
});

test('should tick down timer every second', () => {
  render(
    <Timer
      gameStarted={true}
      setGameOver={jest.fn()}
      incorrectNumber={0}
      setTimeLeft={jest.fn()}
    />
  );
  const timer = screen.getByRole('timer');

  act(() => {
    jest.advanceTimersByTime(1000);
  });
  expect(timer).toHaveTextContent('49');

  act(() => {
    jest.advanceTimersByTime(1000);
  });
  expect(timer).toHaveTextContent('48');

  act(() => {
    jest.advanceTimersByTime(1000);
  });
  expect(timer).toHaveTextContent('47');
});
test('should deduct 10 seconds from timer per incorrect question', () => {
  render(
    <Timer
      gameStarted={true}
      setGameOver={jest.fn()}
      incorrectNumber={2}
      setTimeLeft={jest.fn()}
    />
  );
  const timer = screen.getByRole('timer');
  expect(timer).toHaveTextContent('30');
});
test('timer should not go below 0', () => {
  render(
    <Timer
      gameStarted={true}
      setGameOver={jest.fn()}
      incorrectNumber={6}
      setTimeLeft={jest.fn()}
    />
  );
  const timer = screen.getByRole('timer');
  expect(timer).toHaveTextContent('0');

  act(() => {
    jest.advanceTimersByTime(1000);
  });
  expect(timer).toHaveTextContent('0');
});

test('should call for game over when timer is 0', () => {
  const mockSetGameOver = jest.fn();

  render(
    <Timer
      gameStarted={true}
      setGameOver={mockSetGameOver}
      incorrectNumber={0}
      setTimeLeft={jest.fn()}
    />
  );
  const timer = screen.getByRole('timer');

  act(() => {
    jest.advanceTimersByTime(50000);
  });
  expect(timer).toHaveTextContent('0');
  expect(mockSetGameOver).toHaveBeenCalledTimes(1);
});
