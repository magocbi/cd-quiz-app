import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Options from './Options';

test('renders buttons corresponding to options', () => {
  render(
    <Options
      options={['1. option 1', '2. option 2', '3. option 3', '4. option 4']}
      checkAnswer={jest.fn()}
    />
  );
  const optionsButtons = screen.getAllByRole('button', { name: /\d\./i });
  const optionsText = optionsButtons.map((option) => option.textContent);
  expect(optionsText).toEqual([
    '1. option 1',
    '2. option 2',
    '3. option 3',
    '4. option 4',
  ]);
});

test('calls checkAnswer with option index when option is clicked', () => {
  const mockCheckAnwer = jest.fn();
  render(
    <Options
      options={['1. option 1', '2. option 2', '3. option 3', '4. option 4']}
      checkAnswer={mockCheckAnwer}
    />
  );

  const option1 = screen.getByRole('button', { name: /option 1/i });
  userEvent.click(option1);
  expect(mockCheckAnwer).toBeCalledTimes(1);
  expect(mockCheckAnwer).toHaveBeenCalledWith(0);

  mockCheckAnwer.mockClear();

  const option3 = screen.getByRole('button', { name: /option 3/i });
  userEvent.click(option3);
  expect(mockCheckAnwer).toBeCalledTimes(1);
  expect(mockCheckAnwer).toHaveBeenCalledWith(2);
});
