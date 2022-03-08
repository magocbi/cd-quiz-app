import React from 'react';
import { Content, Title, Wrapper } from './Card.styles';

type Props = {
  title: string;
};

const Card: React.FC<Props> = ({ title, children }) => {
  return (
    <Wrapper>
      <Title>{title}</Title>
      <Content>{children}</Content>
    </Wrapper>
  );
};

export default Card;
