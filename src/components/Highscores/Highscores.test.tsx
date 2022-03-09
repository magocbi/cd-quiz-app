import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Highscores from './Highscores';

beforeAll(() => {
  const highscores = [
    { score: 4, initials: 'NM' },
    { score: 6, initials: 'CD' },
    { score: 7, initials: 'FG' },
    { score: 1, initials: 'PE' },
  ];
  window.localStorage.setItem('highscores', JSON.stringify(highscores));
});

test('renders go back button and clear highschores button', () => {
  render(<Highscores />);

  const goBackButton = screen.getByRole('button', { name: /go back/i });
  expect(goBackButton).toBeInTheDocument();

  const clearHighscoresButton = screen.getByRole('button', {
    name: /clear highscores/i,
  });
  expect(clearHighscoresButton).toBeInTheDocument();
});

test('render highscores from localStorage', () => {
  render(<Highscores />);

  const scoresItems = screen.getAllByRole('listitem');
  const scoresText = scoresItems.map((score) => score.textContent);
  expect(scoresText).toEqual(['NM - 4', 'CD - 6', 'FG - 7', 'PE - 1']);
});

test('clears highscores if clear highscores button is clicked', () => {
  render(<Highscores />);
  const clearHighscoresButton = screen.getByRole('button', {
    name: /clear highscores/i,
  });
  userEvent.click(clearHighscoresButton);
  const scoresItems = screen.queryByRole('listitem');
  expect(scoresItems).not.toBeInTheDocument();
});
