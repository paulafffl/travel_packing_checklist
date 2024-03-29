import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Modal from './Modal';

const mockCloseAction = jest.fn();
const mockConfirmAction = jest.fn();

const modalProps = {
  message: 'Are you sure you want to proceed?',
  confirmButton: 'Confirm',
  confirmIcon: <span>✅</span>,
  confirmAction: mockConfirmAction,
  closeAction: mockCloseAction,
};

describe('Modal component', () => {
  test('renders correctly', () => {
    const { getByText } = render(<Modal {...modalProps} />);

    expect(getByText('Are you sure you want to proceed?')).toBeInTheDocument();
    expect(getByText('Cancel')).toBeInTheDocument();
    expect(getByText('Confirm')).toBeInTheDocument();
  });

  test('calls confirmAction and closeAction when Confirm button is clicked', () => {
    const { getByText } = render(<Modal {...modalProps} />);
    fireEvent.click(getByText('Confirm'));

    expect(mockConfirmAction).toHaveBeenCalledTimes(1);
    expect(mockCloseAction).toHaveBeenCalledTimes(1);
  });

  test('calls closeAction when Cancel button is clicked', () => {
    const { getByText } = render(<Modal {...modalProps} />);
    fireEvent.click(getByText('Cancel'));

    expect(mockConfirmAction).not.toHaveBeenCalled();
    expect(mockCloseAction).toHaveBeenCalledTimes(1);
  });
});
