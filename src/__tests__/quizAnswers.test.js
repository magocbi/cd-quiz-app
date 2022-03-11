import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { questions } from '../questions';

jest.mock('../questions', () => ({
  questions: [
    {
      questionText: 'Commonly used data types DO NOT include:',
      options: ['1. strings', '2. booleans', '3. alerts', '4. numbers'],
      answer: '3. alerts',
    },
    {
      questionText: 'Arrays in JavaScript can be used to store ______.',
      options: [
        '1. numbers and strings',
        '2. other arrays',
        '3. booleans',
        '4. all of the above',
      ],
      answer: '4. all of the above',
    },
    {
      questionText:
        'String values must be enclosed within _____ when being assigned to variables.',
      options: [
        '1. commas',
        '2. curly brackets',
        '3. quotes',
        '4. parentheses',
      ],
      answer: '3. quotes',
    },
  ],
}));

beforeAll(() => {
  const highscores = [
    { score: 4, initials: 'NM' },
    { score: 6, initials: 'CD' },
    { score: 7, initials: 'FG' },
    { score: 1, initials: 'PE' },
  ];
  window.localStorage.setItem('highscores', JSON.stringify(highscores));
});

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

test('showing highscores after game started should restart the the quiz', () => {
  render(<App />);

  const startQuizButton = screen.getByRole('button', { name: /start quiz/i });
  userEvent.click(startQuizButton);

  const options1 = screen.getAllByRole('button', { name: /\d\./i });
  const correctOption1 = options1.find(
    (option) => option.textContent === questions[0].answer
  );
  userEvent.click(correctOption1);

  const options2 = screen.getAllByRole('button', { name: /\d\./i });
  const incorrectOption2 = options2.find(
    (option) => option.textContent !== questions[1].answer
  );
  userEvent.click(incorrectOption2);

  act(() => jest.advanceTimersByTime(20000));

  const highscoreButton = screen.getByRole('button', {
    name: /view highscores/i,
  });
  userEvent.click(highscoreButton);

  const goBackButton = screen.getByRole('button', { name: /go back/i });
  userEvent.click(goBackButton);

  const startQuizButtonAgain = screen.getByRole('button', {
    name: /start quiz/i,
  });
  userEvent.click(startQuizButtonAgain);

  const timeLeft = screen.getByRole('timer');
  expect(timeLeft).toHaveTextContent(/time: 50/i);

  act(() => jest.advanceTimersByTime(50000));

  const score = screen.getByText(/Your final score is/i);
  expect(score).toHaveTextContent('0.');
});

test('if all answered correctly it shows corresponding score and then highscore if initials submitted', () => {
  render(<App />);

  const startQuizButton = screen.getByRole('button', { name: /start quiz/i });
  userEvent.click(startQuizButton);

  const options1 = screen.getAllByRole('button', { name: /\d\./i });
  const correctOption1 = options1.find(
    (option) => option.textContent === questions[0].answer
  );
  userEvent.click(correctOption1);

  const options2 = screen.getAllByRole('button', { name: /\d\./i });
  const correctOption2 = options2.find(
    (option) => option.textContent === questions[1].answer
  );
  userEvent.click(correctOption2);

  const options3 = screen.getAllByRole('button', { name: /\d\./i });
  const correctOption3 = options3.find(
    (option) => option.textContent === questions[2].answer
  );
  userEvent.click(correctOption3);

  const score = screen.getByText(/Your final score is/i);
  expect(score).toHaveTextContent('3.');

  const initialsInput = screen.getByRole('textbox', {
    name: /Enter initials/i,
  });
  userEvent.type(initialsInput, 'DE');

  const submitButton = screen.getByRole('button', { name: /submit/i });
  userEvent.click(submitButton);

  const highscores = screen.getAllByRole('listitem');
  const highscore = highscores.find((score) => score.textContent === 'DE - 3');

  expect(highscore).toBeInTheDocument();

  const goBackButton = screen.getByRole('button', { name: /go back/i });
  userEvent.click(goBackButton);

  const startQuizButtonAgain = screen.getByRole('button', {
    name: /start quiz/i,
  });
  expect(startQuizButtonAgain).toBeInTheDocument();
});

test('should show feedback when question is answered and time out if enough questions are answered incorrectly', () => {
  render(<App />);

  const startQuizButton = screen.getByRole('button', { name: /start quiz/i });
  userEvent.click(startQuizButton);

  const options1 = screen.getAllByRole('button', { name: /\d\./i });
  const correctOption1 = options1.find(
    (option) => option.textContent === questions[0].answer
  );
  userEvent.click(correctOption1);

  const correctFeedback1 = screen.getByRole('status');
  expect(correctFeedback1).toHaveTextContent(/correct!/i);

  const options2 = screen.getAllByRole('button', { name: /\d\./i });
  const incorrectOption2 = options2.find(
    (option) => option.textContent !== questions[1].answer
  );

  userEvent.click(incorrectOption2);

  const timeLeft = screen.getByRole('timer');
  expect(timeLeft).toHaveTextContent(/time: 40/i);

  const incorrectFeedback2 = screen.getByRole('status');
  expect(incorrectFeedback2).toHaveTextContent(/incorrect!/i);

  act(() => {
    jest.advanceTimersByTime(30000);
  });

  const options3 = screen.getAllByRole('button', { name: /\d\./i });
  const incorrectOption3 = options3.find(
    (option) => option.textContent !== questions[2].answer
  );

  userEvent.click(incorrectOption3);

  const scoresHeading = screen.getByRole('heading', { name: /All done/i });
  expect(scoresHeading).toBeInTheDocument();
});
