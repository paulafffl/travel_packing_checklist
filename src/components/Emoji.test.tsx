import React from 'react';
import { render } from '@testing-library/react';
import Emoji from './Emoji';

test('renders emoji correctly', () => {
  const { getByRole } = render(<Emoji name="listZeroWaste" />);

  const emojiElement = getByRole('img');

  expect(emojiElement).toBeInTheDocument();
  expect(emojiElement).toHaveAttribute('aria-label', 'listZeroWaste');
  expect(emojiElement).toHaveTextContent('💚');
});
