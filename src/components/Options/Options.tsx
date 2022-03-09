import React from 'react';
import Button from '../Button';

type Props = {
  options: string[];
  checkAnswer: (index: number) => void;
};

const Options: React.FC<Props> = ({ options, checkAnswer }) => {
  const optionsElems: JSX.Element[] = options.map((option, index) => (
    <li key={index}>
      <Button onClick={() => checkAnswer(index)}>{option}</Button>
    </li>
  ));

  return <ul>{optionsElems}</ul>;
};

export default Options;
