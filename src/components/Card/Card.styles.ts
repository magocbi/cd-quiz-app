import styled from 'styled-components';

export const Wrapper = styled.div`
  min-width: 50%;
  margin-inline: 1rem;
  padding: 3em;
  border: 1px solid hsla(0, 0%, 0%, 0.25);
  border-radius: 1rem;
  box-shadow: 5px 3px 3px 0 hsla(0, 0%, 0%, 0.15);
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const Title = styled.h1`
  font-size: var(--fs-600);
`;
