import React, { useEffect, useState } from 'react';
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
import { useQuiz } from './hooks/useQuiz';

const titles = {
  start: 'Coding Quiz Challenge',
  highscores: 'Highscores',
  score: 'All done!',
};

type TitleKey = keyof typeof titles;

const answerStatus = {
  correct: 'Correct!',
  incorrect: 'Incorrect!',
};

export type AnswerStatusKey = keyof typeof answerStatus;

function App(): JSX.Element {
  const [quizPhase, setQuizPhase] = useState<TitleKey | 'questions'>('start');
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [highscores, setHighscores] = useHighscores();
  const [
    question,
    questionStatus,
    incorrectNumber,
    score,
    checkAnswer,
    reset,
    isFinished,
  ] = useQuiz();

  const getTitle = (): string => {
    if (titles.hasOwnProperty(quizPhase)) return titles[quizPhase as TitleKey];
    return question.questionText;
  };

  const startQuiz = (): void => {
    setQuizPhase('questions');
    setGameStarted(true);
  };

  const resetQuiz = (): void => {
    setQuizPhase('start');
    reset();
    setGameStarted(false);
  };

  const endQuiz = (): void => {
    setGameStarted(false);
    setQuizPhase('score');
  };

  const showHighscores = (): void => {
    setQuizPhase('highscores');
  };

  const submitScore = (newScore: number, initials: string): void => {
    setHighscores([...highscores, { score: newScore, initials }]);
    showHighscores();
  };

  const goToPreviousPhase = (): void => {
    resetQuiz();
  };

  useEffect(() => {
    if (isFinished) endQuiz();
  }, [isFinished]);

  return (
    <div>
      <GlobalStyle />
      <Header>
        <HighscoresButton showHighscores={showHighscores} />
        <Timer
          gameStarted={gameStarted}
          setGameOver={endQuiz}
          incorrectNumber={incorrectNumber}
          setTimeLeft={() => {}}
        />
      </Header>
      <Main>
        <Card title={getTitle()}>
          {quizPhase === 'start' ? (
            <Start startQuiz={startQuiz} />
          ) : quizPhase === 'questions' ? (
            <>
              <Options checkAnswer={checkAnswer} options={question.options} />
              {questionStatus ? (
                <>
                  <hr />
                  <div role='status'>{answerStatus[questionStatus]} </div>
                </>
              ) : null}
            </>
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
