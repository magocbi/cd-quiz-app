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
  render(
    <Highscores
      highscores={[
        { score: 4, initials: 'NM' },
        { score: 6, initials: 'CD' },
        { score: 7, initials: 'FG' },
        { score: 1, initials: 'PE' },
      ]}
      setHighscores={jest.fn()}
    />
  );

  const goBackButton = screen.getByRole('button', { name: /go back/i });
  expect(goBackButton).toBeInTheDocument();

  const clearHighscoresButton = screen.getByRole('button', {
    name: /clear highscores/i,
  });
  expect(clearHighscoresButton).toBeInTheDocument();
});

test('render highscores from localStorage', () => {
  render(
    <Highscores
      highscores={[
        { score: 4, initials: 'NM' },
        { score: 6, initials: 'CD' },
        { score: 7, initials: 'FG' },
        { score: 1, initials: 'PE' },
      ]}
      setHighscores={jest.fn()}
    />
  );

  const scoresItems = screen.getAllByRole('listitem');
  const scoresText = scoresItems.map((score) => score.textContent);
  expect(scoresText).toEqual(['NM - 4', 'CD - 6', 'FG - 7', 'PE - 1']);
});

test('calls to clear highscores button is clicked', () => {
  const mockSetHighscores = jest.fn();
  render(
    <Highscores
      highscores={[
        { score: 4, initials: 'NM' },
        { score: 6, initials: 'CD' },
        { score: 7, initials: 'FG' },
        { score: 1, initials: 'PE' },
      ]}
      setHighscores={mockSetHighscores}
    />
  );
  const clearHighscoresButton = screen.getByRole('button', {
    name: /clear highscores/i,
  });
  userEvent.click(clearHighscoresButton);
  expect(mockSetHighscores).toBeCalledWith([]);
});
