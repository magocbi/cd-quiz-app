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
import { questions } from './questions';

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

type AnswerStatusKey = keyof typeof answerStatus;

function App(): JSX.Element {
  const [quizPhase, setQuizPhase] = useState<TitleKey | 'questions'>('start');
  const [questionIndex, setQuestionIndex] = useState<number>(0);
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [highscores, setHighscores] = useHighscores();
  const [questionStatus, setQuestionStatus] = useState<AnswerStatusKey | null>(
    null
  );

  const [incorrectNumber, setIncorrectNumber] = useState<number>(0);

  const getTitle = (): string => {
    if (titles.hasOwnProperty(quizPhase)) return titles[quizPhase as TitleKey];
    return questions[questionIndex].questionText;
  };

  const startQuiz = (): void => {
    setQuizPhase('questions');
    setGameStarted(true);
  };

  const resetQuiz = (): void => {
    setQuizPhase('start');
    setScore(0);
    setQuestionIndex(0);
    setQuestionStatus(null);
    setGameStarted(false);
    setIncorrectNumber(0);
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

  const checkAnswer = (index: number): void => {
    if (
      questions[questionIndex].options[index] ===
      questions[questionIndex].answer
    ) {
      setQuestionStatus('correct');
      setScore((prev) => prev + 1);
      if (questionIndex >= questions.length - 1) endQuiz();
      else setQuestionIndex((prev) => prev + 1);
    } else {
      setQuestionStatus('incorrect');
      setIncorrectNumber((prev) => prev + 1);
    }
  };

  useEffect(() => {
    if (questionIndex >= questions.length) {
      endQuiz();
    }
  }, [questionIndex]);

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
              <Options
                checkAnswer={checkAnswer}
                options={questions[questionIndex].options}
              />
              {questionStatus ? (
                <div role='status'>{answerStatus[questionStatus]} </div>
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
