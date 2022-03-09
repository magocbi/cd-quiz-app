import React, { useState } from 'react';
import Button from '../Button';
import { Form } from './Result.styles';

type Props = {
  score: number;
  submitScore: (score: number, initials: string) => void;
};

const Result: React.FC<Props> = ({ score, submitScore }) => {
  const [initials, setInitials] = useState('');

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e): void => {
    e.preventDefault();
    submitScore(score, initials);
  };

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (e): void => {
    setInitials(e.target.value);
  };

  return (
    <div>
      <p>Your final score is {score}.</p>
      <Form onSubmit={onSubmit}>
        <label htmlFor='score-initials'>Enter initials:</label>
        <input
          type='text'
          name='initial'
          id='score-initials'
          maxLength={2}
          value={initials}
          onChange={onChange}
        />
        <Button type='submit'>Submit</Button>
      </Form>
    </div>
  );
};

export default Result;
