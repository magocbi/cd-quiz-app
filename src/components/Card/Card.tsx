import React from 'react';
import { Content, Wrapper } from './Card.styles';

type Props = {
  title: string;
};

const Card: React.FC<Props> = ({ title, children }) => {
  return (
    <Wrapper>
      <h1>{title}</h1>
      <Content>{children}</Content>
    </Wrapper>
  );
};

export default Card;
