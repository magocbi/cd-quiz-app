import React from 'react';
import { TransparentButton } from './HighscoresButton.styles';

type Props = {
  showHighscores: () => void;
};

const HighscoresButton: React.FC<Props> = ({ showHighscores }) => {
  return (
    <TransparentButton onClick={showHighscores}>
      View Highscores<i className='fas fa-hand-point-left fa-lg'></i>
    </TransparentButton>
  );
};

export default HighscoresButton;
