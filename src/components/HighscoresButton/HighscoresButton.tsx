import React from 'react';
import { TransparentButton } from './HighscoresButton.styles';

type Props = {};

const HighscoresButton: React.FC<Props> = (props: Props) => {
  return (
    <TransparentButton>
      View Highscores<i className='fas fa-hand-point-left fa-lg'></i>
    </TransparentButton>
  );
};

export default HighscoresButton;
