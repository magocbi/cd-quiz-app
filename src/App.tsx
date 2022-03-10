import React, { useState } from 'react';
import { Main } from './App.styles';
import Card from './components/Card/Card';
import Header from './components/Header/Header';
import Highscores from './components/Highscores/Highscores';
import HighscoresButton from './components/HighscoresButton/HighscoresButton';
import Options from './components/Options/Options';
import Result from './components/Result/Result';
import Start from './components/Start/Start';
import Timer from './components/Timer/Timer';
import GlobalStyle from './GlobalStyle';
import { useHighscores } from './hooks/useHighscores';
import { questions } from './questions';

const titles = {
  start: 'Coding Quiz Challenge',
  highscores: 'Highscores',
  score: 'All done!',
};

type TitleKey = keyof typeof titles;

function App(): JSX.Element {
  const [quizPhase, setQuizPhase] = useState<TitleKey | 'questions'>('start');
  const [questionIndex, setQuestionIndex] = useState<number>(0);
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [highscores, setHighscores] = useHighscores();

  const getTitle = (): string => {
    if (titles.hasOwnProperty(quizPhase)) return titles[quizPhase as TitleKey];
    return questions[questionIndex].questionText;
  };

  const startQuiz = (): void => {
    setQuizPhase('questions');
    setGameStarted(true);
  };

  const endQuiz = (): void => {
    setGameStarted(false);
    setQuizPhase('score');
  };

  const showHighscores = () => {
    setQuizPhase('highscores');
  };

  const submitScore = (newScore: number, initials: string): void => {
    setHighscores([...highscores, { score: newScore, initials }]);
    showHighscores();
  };

  const goToPreviousPhase = () => {
    setQuizPhase('start');
  };

  return (
    <div>
      <GlobalStyle />
      <Header>
        <HighscoresButton showHighscores={showHighscores} />
        <Timer
          gameStarted={gameStarted}
          setGameOver={endQuiz}
          incorrectNumber={0}
          setTimeLeft={() => {}}
        />
      </Header>
      <Main>
        <Card title={getTitle()}>
          {quizPhase === 'start' ? (
            <Start startQuiz={startQuiz} />
          ) : quizPhase === 'questions' ? (
            <div></div>
          ) : quizPhase === 'score' ? (
            <Result score={score} submitScore={submitScore} />
          ) : quizPhase === 'highscores' ? (
            <Highscores
              highscores={highscores}
              setHighscores={setHighscores}
              goBack={goToPreviousPhase}
            />
          ) : null}
        </Card>
      </Main>
    </div>
  );
}

export default App;
