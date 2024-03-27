import React from 'react';
import { render } from '@testing-library/react';
import Icon from './Icon';

describe('Icon component', () => {
  test('renders icon - close', () => {
    const { container } = render(<Icon symbol="close" />);
    const svgIcon = container.querySelector('svg');
    expect(svgIcon).toBeInTheDocument();
  });

  test('renders icon - collapse', () => {
    const { container } = render(<Icon symbol="collapse" />);
    const svgIcon = container.querySelector('svg');
    expect(svgIcon).toBeInTheDocument();
  });

  test('renders icon - delete', () => {
    const { container } = render(<Icon symbol="delete" />);
    const svgIcon = container.querySelector('svg');
    expect(svgIcon).toBeInTheDocument();
  });

  test('renders icon - edit', () => {
    const { container } = render(<Icon symbol="edit" />);
    const svgIcon = container.querySelector('svg');
    expect(svgIcon).toBeInTheDocument();
  });

  test('renders icon - expand', () => {
    const { container } = render(<Icon symbol="expand" />);
    const svgIcon = container.querySelector('svg');
    expect(svgIcon).toBeInTheDocument();
  });

  test('renders icon - save', () => {
    const { container } = render(<Icon symbol="save" />);
    const svgIcon = container.querySelector('svg');
    expect(svgIcon).toBeInTheDocument();
  });
});
