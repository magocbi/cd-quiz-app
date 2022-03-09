import React, { useEffect, useState } from 'react';
import Button from '../Button';
import { ControlContainer } from './Highscores.styles';

export type HighscoreEntry = {
  score: number;
  initials: string;
};

const Highscores: React.FC = () => {
  const [highscores, setHighscores] = useState<HighscoreEntry[] | []>(() =>
    JSON.parse(window.localStorage.getItem('highscores') || '[]')
  );

  useEffect(() => {
    window.localStorage.setItem('highscores', JSON.stringify(highscores));
  }, [highscores]);

  return (
    <div>
      <ol>
        {highscores.map((entry: HighscoreEntry, index: number) => (
          <li key={index}>
            {entry.initials} - {entry.score}
          </li>
        ))}
      </ol>
      <ControlContainer>
        <Button>Go Back</Button>
        <Button onClick={() => setHighscores([])}>Clear Highscores</Button>
      </ControlContainer>
    </div>
  );
};

export default Highscores;
