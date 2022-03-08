import React from 'react';

type Props = {
  title: string;
};

const Card: React.FC<Props> = ({ title, children }) => {
  return (
    <div>
      <h1>{title}</h1>
      {children}
    </div>
  );
};

export default Card;
