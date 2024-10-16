import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Modal from '../Modal';

describe('<Modal>', () => {
  const defaultProps = {
    isOpen: true,
    toggleModal: vi.fn(), // Mock function
    children: <div>Modal Content</div>,
  };

  const setup = (props = defaultProps) => {
    return render(<Modal {...props} />);
  };

  it('renders the modal with content when open', () => {
    setup();
    expect(screen.getByText('Modal Content')).toBeTruthy();
  });

  it('renders the modal without title if no provided', () => {
    setup();
    expect(screen.queryByTestId('modal-title')).toBeNull();
  });

  it('renders the modal with title if provided', () => {
    const props = {
      ...defaultProps,
      title: 'Test Modal',
    };
    setup(props);
    expect(screen.queryByTestId('modal-title')).toBeTruthy();
    expect(screen.getByText('Test Modal')).toBeTruthy();
  });

  it('renders the modal without button if no provided', () => {
    setup();
    expect(screen.queryByTestId('modal-additional-button')).toBeNull();
  });

  it('renders the modal with button if provided', () => {
    const props = {
      ...defaultProps,
      btnText: 'Close',
    };
    setup(props);
    expect(screen.queryByTestId('modal-additional-button')).toBeTruthy();
    expect(screen.getByText('Close')).toBeTruthy();
  });

  it('calls toggleModal when the close button is clicked', () => {
    setup();
    fireEvent.click(screen.getByTestId('modal-close'));
    expect(defaultProps.toggleModal).toHaveBeenCalled(1);
  });

  it('applies the correct theme class when styleTheme is provided', () => {
    const props = {
      ...defaultProps,
      styleTheme: 'dark',
    };
    setup(props);
    const modalElement = screen.getByTestId('modal-parent');
    expect(modalElement.classList.contains('sg-modal-lib--dark')).toBe(true);
  });

  it('closes the modal when clicking on the overlay if overlayClickClose is not in props (true as default value)', () => {
    setup();
    fireEvent.click(screen.getByTestId('modal-parent'));
    expect(defaultProps.toggleModal).toHaveBeenCalled(1);
  });

  it('does not close the modal when clicking on the overlay if overlayClickClose is false', () => {
    const toggleModalMock = vi.fn();
    const props = {
      ...defaultProps,
      toggleModal: toggleModalMock,
      overlayClickClose: false,
    };
    setup(props);
    fireEvent.click(screen.getByTestId('modal-parent'));
    expect(toggleModalMock).not.toHaveBeenCalled();
  });

  it('closes the modal when pressing Escape if escapeClose is not in props (true as default value)', () => {
    setup();
    fireEvent.keyDown(document, { key: 'Escape', code: 'Escape' });
    expect(defaultProps.toggleModal).toHaveBeenCalled(1);
  });

  it('does not close the modal when pressing Escape if escapeClose is false', () => {
    const toggleModalMock = vi.fn();
    const props = {
      ...defaultProps,
      toggleModal: toggleModalMock,
      escapeClose: false,
    };
    setup(props);
    fireEvent.keyDown(document, { key: 'Escape', code: 'Escape' });
    expect(toggleModalMock).not.toHaveBeenCalled();
  });

  it('shows the close button if showClose is not in props (true as default value)', () => {
    setup();
    expect(screen.queryByTestId('modal-close')).toBeTruthy();
  });

  it('does not show the close button if showClose is false', () => {
    const props = {
      ...defaultProps,
      showClose: false,
    };
    setup(props);
    expect(screen.queryByTestId('modal-close')).toBeNull();
  });

  it('applies the correct fade duration for visibility and transition', () => {
    const props = {
      ...defaultProps,
      fadeDuration: 500,
    };
    setup(props);
    const dialogElement = screen.getByTestId('modal-dialog');
    expect(dialogElement.style.transition).toBe(
      'opacity 500ms ease-in-out, transform 500ms ease-in-out'
    );
  });

  it('applies aria-hidden="true" when the modal is closed', () => {
    const props = {
      ...defaultProps,
      isOpen: false,
    };
    setup(props);
    const modalParent = screen.getByTestId('modal-parent');
    expect(modalParent.getAttribute('aria-hidden')).to.equal('true');
  });

  it('applies aria-hidden="false" when the modal is open', () => {
    setup();
    const modalParent = screen.getByTestId('modal-parent');
    expect(modalParent.getAttribute('aria-hidden')).to.equal('false');
  });

  it('locks body scrolling when the modal is open', () => {
    setup();
    expect(document.body.style.overflow).toBe('hidden');
  });

  it('unlocks body scrolling when the modal is closed', () => {
    const props = {
      ...defaultProps,
      isOpen: false,
    };
    setup(props);
    expect(document.body.style.overflow).toBe('unset');
  });
});
