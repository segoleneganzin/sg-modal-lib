import { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import IconClose from '../icons/IconClose';

/**
 * Modal component provides a dialog interface that can be toggled open or closed.
 * It displays content and, by default a close button.
 * Optionally, it can have a title, a custom button text, a style theme.
 * It is possible to unset the escape for close functionality
 * It is possible to unset the click on overlay for close functionality
 * It is possible to unset the close button
 * It is possible to set a fade duration for smoothly diplay
 *
 * @param {Object} props
 * @param {boolean} props.isOpen - Indicates whether the modal is open or closed.
 * @param {function} props.toggleModal - Function to toggle the modal's visibility.
 * @param {boolean} [props.escapeClose] - Allows the user to close the modal by pressing `ESC`.
 * @param {boolean} [props.overlayClickClose] - Allows the user to close the modal by clicking the overlay.
 * @param {boolean} [props.showClose] - Shows a (X) icon/link in the top-right corner.
 * @param {string} [props.title] - The title of the modal, displayed on top if provided. If no title provided, no title is displayed.
 * @param {string} [props.btnText] - The text for the button to close the modal, if provided. If no btnText provided, no button is displayed.
 * @param {number} [props.fadeDuration] - Number of milliseconds the fade transition takes (0 by default)
 * @param {string} [props.styleTheme] - Optional theme for the modal (e.g., 'light', 'dark'). If no provided, light theme is applied
 * @param {React.ReactNode} props.children - The content to be displayed inside the modal.
 * @returns {JSX.Element}
 */
const Modal = ({
  isOpen,
  toggleModal,
  escapeClose = true,
  overlayClickClose = true,
  showClose = true,
  title,
  btnText,
  styleTheme = 'light',
  fadeDuration = 0,
  children,
}) => {
  const modalRef = useRef(null);

  // Pure function to determine body overflow style
  const getBodyOverflowStyle = (isOpen) => (isOpen ? 'hidden' : 'unset');

  // Effect to lock or unlock scrolling on the body when the modal opens or closes
  useEffect(() => {
    document.body.style.overflow = getBodyOverflowStyle(isOpen);
    return () => {
      document.body.style.overflow = 'unset'; // reset on unmount
    };
  }, [isOpen]);

  // Function to handle overlay clicks to close the modal
  const handleOverlayClick = (event) => {
    if (overlayClickClose && modalRef.current === event.target) {
      toggleModal();
    }
  };

  // Function to handle closing the modal with the Escape key
  const handleEscKey = (event) => {
    if (event.key === 'Escape' && escapeClose && isOpen) {
      toggleModal();
    }
  };

  // Effect to handle closing the modal with the Escape key
  useEffect(() => {
    if (escapeClose && isOpen) {
      document.addEventListener('keydown', handleEscKey);
      return () => {
        document.removeEventListener('keydown', handleEscKey);
      };
    }
  }, [isOpen, escapeClose]);

  return (
    <div
      ref={modalRef}
      onClick={handleOverlayClick}
      data-testid='modal-parent'
      className={`sg-modal-lib sg-modal-lib--${styleTheme} ${
        isOpen ? 'sg-modal-lib--open' : 'sg-modal-lib--close'
      }`}
      style={
        isOpen
          ? {
              transition: `visibility 0ms`,
            }
          : {
              transition: `visibility 0ms ${fadeDuration}ms`, // delay to permitted dialog animation before disappear
            }
      }
      aria-hidden={!isOpen}
    >
      <dialog
        className={`sg-modal-lib__dialog ${
          isOpen ? 'sg-modal-lib__dialog--open' : 'sg-modal-lib__dialog--close'
        }`}
        style={{
          transition: `opacity ${fadeDuration}ms ease-in-out, transform ${fadeDuration}ms ease-in-out`,
        }}
        aria-describedby={title ? title : 'modal'}
      >
        {title && (
          <h2
            className='sg-modal-lib__title'
            id='modalTitle'
            data-testid='modal-title'
          >
            {title}
          </h2>
        )}
        {showClose && (
          <button
            className='sg-modal-lib__close'
            onClick={toggleModal}
            data-testid='modal-close'
            aria-label='Close modal'
            autoFocus
          >
            <IconClose />
          </button>
        )}
        <div className='sg-modal-lib__children'>{children}</div>
        {btnText && (
          <button
            className='sg-modal-lib__btn'
            onClick={toggleModal}
            data-testid='modal-additional-button'
          >
            {btnText}
          </button>
        )}
      </dialog>
    </div>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggleModal: PropTypes.func.isRequired,
  escapeClose: PropTypes.bool,
  overlayClickClose: PropTypes.bool,
  showClose: PropTypes.bool,
  title: PropTypes.string,
  btnText: PropTypes.string,
  fadeDuration: PropTypes.number,
  styleTheme: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default Modal;
