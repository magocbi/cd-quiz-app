import React from 'react';
import Button from '../Button';
import { List, ListItem } from './Options.styles';

type Props = {
  options: string[];
  checkAnswer: (index: number) => void;
};

const Options: React.FC<Props> = ({ options, checkAnswer }) => {
  const optionsElems: JSX.Element[] = options.map((option, index) => (
    <ListItem key={index}>
      <Button onClick={() => checkAnswer(index)}>{option}</Button>
    </ListItem>
  ));

  return <List>{optionsElems}</List>;
};

export default Options;
