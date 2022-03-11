import React, { useEffect, useRef, useState } from 'react';
import { TimerSpan } from './Timer.styles';

type Props = {
  gameStarted: boolean;
  setGameOver: React.Dispatch<React.SetStateAction<boolean>>;
  incorrectNumber: number;
  setTimeLeft: (timeLeft: number) => void;
};

const Timer: React.FC<Props> = ({
  gameStarted,
  setGameOver,
  incorrectNumber,
  setTimeLeft,
}) => {
  const [timer, setTimer] = useState(50);
  let intervalId = useRef<undefined | number>(undefined);

  const calculateTimeLeft = (timeLeft: number, deductions: number): number => {
    const timePerDeduction: number = 10;
    return Math.max(0, timeLeft - deductions * timePerDeduction);
  };

  useEffect(() => {
    if (gameStarted) {
      setTimer(50);
      intervalId.current = window.setInterval(() => {
        setTimer((state) => state - 1);
      }, 1000);
    } else {
      window.clearInterval(intervalId.current);
    }
    return () => {
      window.clearInterval(intervalId.current);
    };
  }, [gameStarted]);

  useEffect(() => {
    if (calculateTimeLeft(timer, incorrectNumber) <= 0 && gameStarted) {
      window.clearInterval(intervalId.current);
      setGameOver(true);
    }
  }, [incorrectNumber, setGameOver, timer, gameStarted]);

  return (
    <div role='timer'>
      Time:{' '}
      <TimerSpan>
        {gameStarted ? calculateTimeLeft(timer, incorrectNumber) : null}
      </TimerSpan>
    </div>
  );
};

export default Timer;
