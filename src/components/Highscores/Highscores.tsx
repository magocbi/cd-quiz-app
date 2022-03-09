import React, { useEffect, useState } from 'react';

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
      <div>
        <button>Go Back</button>
        <button onClick={() => setHighscores([])}>Clear Highscores</button>
      </div>
    </div>
  );
};

export default Highscores;
