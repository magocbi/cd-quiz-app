import { useEffect, useState } from 'react';

export type HighscoreEntry = {
  score: number;
  initials: string;
};

type HighscoresHook = [
  [] | HighscoreEntry[],
  React.Dispatch<React.SetStateAction<[] | HighscoreEntry[]>>
];

export const useHighscores = (): HighscoresHook => {
  const [highscores, setHighscores] = useState<HighscoreEntry[] | []>(() =>
    JSON.parse(window.localStorage.getItem('highscores') || '[]')
  );

  useEffect(() => {
    window.localStorage.setItem('highscores', JSON.stringify(highscores));
  }, [highscores]);

  return [highscores, setHighscores];
};
