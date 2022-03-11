import { useState } from 'react';
import { AnswerStatusKey } from '../App';
import { questions } from '../questions';

export const useQuiz = () => {
  const [questionIndex, setQuestionIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [questionStatus, setQuestionStatus] = useState<AnswerStatusKey | null>(
    null
  );
  const [incorrectNumber, setIncorrectNumber] = useState<number>(0);
  const [isFinished, setIsFinished] = useState(false);
  const question = questions[questionIndex];

  const checkAnswer = (index: number): void => {
    if (question.options[index] === question.answer) {
      setQuestionStatus('correct');
      setScore((prev) => prev + 1);
      if (questionIndex >= questions.length - 1) setIsFinished(true);
      else setQuestionIndex((prev) => prev + 1);
    } else {
      setQuestionStatus('incorrect');
      setIncorrectNumber((prev) => prev + 1);
    }
  };

  const resetQuiz = (): void => {
    setScore(0);
    setQuestionIndex(0);
    setQuestionStatus(null);
    setIncorrectNumber(0);
    setIsFinished(false);
  };

  return [
    question,
    questionStatus,
    incorrectNumber,
    score,
    checkAnswer,
    resetQuiz,
    isFinished,
  ] as const;
};
