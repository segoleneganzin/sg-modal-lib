import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Modal from '../Modal';

describe('Modal Component', () => {
  const defaultProps = {
    isOpen: true,
    toggleModal: vi.fn(), // Mock function
    title: 'Test Modal',
    btnText: 'Close',
    children: <div>Modal Content</div>,
  };

  it('renders the modal with title and content when open', () => {
    render(<Modal {...defaultProps} />);
    // Checks that the title is displayed
    expect(screen.queryByTestId('modal-title')).toBeTruthy();
    expect(screen.getByText('Test Modal')).toBeTruthy();
    // Checks that content is displayed
    expect(screen.getByText('Modal Content')).toBeTruthy();
    // Checks that button is displayed
    expect(screen.queryByTestId('modal-additional-button')).toBeTruthy();
    expect(screen.getByText('Close')).toBeTruthy();
  });

  it('renders the modal without button and title if no provided', () => {
    render(<Modal {...defaultProps} title='' btnText='' />);
    // Checks that title is not displayed
    expect(screen.queryByTestId('modal-title')).toBeNull();
    // Checks that button is not displayed
    expect(screen.queryByTestId('modal-additional-button')).toBeNull();
  });

  it('calls toggleModal when the close button is clicked', () => {
    render(<Modal {...defaultProps} />);
    // Click on the close button
    fireEvent.click(screen.getByTestId('modal-close'));
    // Checks that the toggleModal function has been called
    expect(defaultProps.toggleModal).toHaveBeenCalled();
  });

  it('applies the correct theme class when styleTheme is provided', () => {
    render(<Modal {...defaultProps} styleTheme='dark' />);
    // Checks that the theme class is applied
    const modalElement = screen.getByTestId('modal-parent');
    expect(modalElement.classList.contains('sg-modal-lib--dark')).toBe(true);
  });
});
