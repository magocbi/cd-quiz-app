import React from 'react';
import { HighscoreEntry } from '../../hooks/useHighscores';
import Button from '../Button';
import { ControlContainer } from './Highscores.styles';

type Props = {
  highscores: HighscoreEntry[];
  setHighscores: (highscores: HighscoreEntry[]) => void;
  goBack: () => void;
};

const Highscores: React.FC<Props> = ({ highscores, setHighscores, goBack }) => {
  return (
    <div>
      <ol>
        {highscores.map((entry: HighscoreEntry, index: number) => (
          <li key={index}>{`${entry.initials} - ${entry.score}`}</li>
        ))}
      </ol>
      <ControlContainer>
        <Button onClick={goBack}>Go Back</Button>
        <Button onClick={() => setHighscores([])}>Clear Highscores</Button>
      </ControlContainer>
    </div>
  );
};

export default Highscores;
