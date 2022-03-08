import React, { useEffect, useState } from 'react';
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

  const calculateTimeLeft = (timeLeft: number, deductions: number): number => {
    const timePerDeduction: number = 10;
    return Math.max(0, timeLeft - deductions * timePerDeduction);
  };

  useEffect(() => {
    let intervalId: NodeJS.Timer;
    if (gameStarted) {
      intervalId = setInterval(() => {
        setTimer((state) => state - 1);
      }, 1000);
    }
    return () => {
      clearInterval(intervalId);
    };
  }, [gameStarted]);

  useEffect(() => {
    if (calculateTimeLeft(timer, incorrectNumber) <= 0) {
      setGameOver(true);
    }
  }, [incorrectNumber, setGameOver, timer]);

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
