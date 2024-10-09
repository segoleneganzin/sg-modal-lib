import PropTypes from 'prop-types';
import IconClose from '../icons/IconClose';

/**
 * Modal component provides a dialog interface that can be toggled open or closed.
 * It displays a title, content, and a close button.
 * Optionally, it can have a custom button text and style theme.
 *
 * @param {Object} props
 * @param {boolean} props.isOpen - Indicates whether the modal is open or closed.
 * @param {function} props.toggleModal - Function to toggle the modal's visibility.
 * @param {Object} props.infos - Contains information for the modal.
 * @param {string} [props.infos.title] - The title of the modal, displayed on top if provided. If no title provided, no title is displayed.
 * @param {string} [props.infos.btnText] - The text for the button to close the modal, if provided. If no btnText provided, no button is displayed.
 * @param {string} [props.styleTheme] - Optional theme for the modal (e.g., 'light', 'dark'). If no provided, light theme is applied
 * @param {React.ReactNode} props.children - The content to be displayed inside the modal.
 * @returns {JSX.Element}
 */
const Modal = ({ isOpen, toggleModal, infos, styleTheme, children }) => {
  const { title, btnText } = infos;

  const theme = styleTheme || 'light';

  document.body.style.overflow = 'hidden';

  const closeModal = () => {
    document.body.style.overflow = 'unset';
    toggleModal();
  };

  return (
    <div
      data-testid='modal-parent'
      className={`sg-modal-lib sg-modal-lib--${theme}`}
      aria-hidden={!isOpen}
      role='dialog'
      aria-describedby={title ? title : 'modal'}
      autoFocus
    >
      <dialog className={`sg-modal-lib__dialog`}>
        {title && (
          <h2
            className='sg-modal-lib__title'
            id='modalTitle'
            data-testid='modal-title'
          >
            {title}
          </h2>
        )}
        <button
          className='sg-modal-lib__close'
          onClick={closeModal}
          data-testid='modal-close'
          aria-label='Close modal'
          autoFocus
        >
          <IconClose />
        </button>
        <div className='sg-modal-lib__children'>{children}</div>
        {btnText && (
          <button
            className='sg-modal-lib__btn'
            onClick={closeModal}
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
  infos: PropTypes.shape({
    title: PropTypes.string,
    btnText: PropTypes.string,
  }),
  children: PropTypes.node.isRequired,
  styleTheme: PropTypes.string,
};

export default Modal;
