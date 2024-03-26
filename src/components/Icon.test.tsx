import React from 'react';
import { render } from '@testing-library/react';
import Icon from './Icon';

describe('Icon component', () => {
  test('renders add icon by default', () => {
    const { container } = render(<Icon />);
    const addIcon = container.querySelector('span');
    expect(addIcon).toBeInTheDocument();
    addIcon ? expect(addIcon.textContent).toBe('+') : fail('Add icon not found');
  });

  test('renders icon - remove', () => {
    const { container } = render(<Icon symbol="remove" />);
    const removeIcon = container.querySelector('span');
    expect(removeIcon).toBeInTheDocument();
    removeIcon ? expect(removeIcon.textContent).toBe('-') : fail('Add icon not found');
  });

  test('renders icon - edit', () => {
    const { container } = render(<Icon symbol="edit" />);
    const svgIcon = container.querySelector('svg');
    expect(svgIcon).toBeInTheDocument();
  });

  test('renders icon - delete', () => {
    const { container } = render(<Icon symbol="delete" />);
    const svgIcon = container.querySelector('svg');
    expect(svgIcon).toBeInTheDocument();
  });

  test('renders icon - save', () => {
    const { container } = render(<Icon symbol="save" />);
    const svgIcon = container.querySelector('svg');
    expect(svgIcon).toBeInTheDocument();
  });
});
