import React from 'react';
import { Content, Wrapper } from './Header.styles';

type Props = {};

const Header: React.FC<Props> = ({ children }) => {
  return (
    <Wrapper>
      <Content>{children}</Content>
    </Wrapper>
  );
};

export default Header;
