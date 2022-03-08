import { render, screen } from '@testing-library/react';
import React from 'react';
import Card from './Card';

test('renders title prop', () => {
  render(<Card title={'My test title'} />);
  const title = screen.getByRole('heading', { name: 'My test title' });
  expect(title).toBeInTheDocument();
});

test('renders children', () => {
  render(
    <Card title='my test title'>
      <h2>My heading</h2>
      <ul>
        <li>My List</li>
      </ul>
    </Card>
  );

  const heading = screen.getByRole('heading', { name: /My heading/i });
  expect(heading).toBeInTheDocument();
  const listItem = screen.getByRole('listitem');
  expect(listItem).toBeInTheDocument();
});
