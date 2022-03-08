import React from 'react';
import Button from '../Button';

type Props = {
  startQuiz: () => void;
};

const Start: React.FC<Props> = ({ startQuiz }) => {
  return (
    <div>
      <p>
        Try to answer the following code-related questions within the time
        limit.
      </p>
      <p>
        Keep in mind that incorrect answers will penalize your score/time by ten
        seconds!
      </p>
      <Button onClick={startQuiz}>Start Quiz</Button>
    </div>
  );
};

export default Start;
