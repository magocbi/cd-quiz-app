import styled from 'styled-components';

export const List = styled.ul`
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  list-style: none;
`;

export const ListItem = styled.li`
  display: flex;

  button {
    flex-grow: 1;
    display: flex;
    justify-content: flex-start;
  }
`;
