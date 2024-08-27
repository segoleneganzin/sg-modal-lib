import PropTypes from 'prop-types';

/**
 * Modal component provides a dialog interface that can be toggled open or closed.
 * It displays a title, content, and a close button. Optionally, it can have a custom button text and style theme.
 * If no btnText provided, no button is displayed.
 *
 * @param {Object} props
 * @param {boolean} props.isOpen - Indicates whether the modal is open or closed.
 * @param {function} props.toggleModal - Function to toggle the modal's visibility.
 * @param {Object} props.infos - Contains information for the modal.
 * @param {string} [props.infos.title] - The title of the modal, displayed in a header if provided.
 * @param {string} [props.infos.btnText] - The text for the button to close the modal, if provided.
 * @param {React.ReactNode} props.children - The content to be displayed inside the modal.
 * @param {string} [props.styleTheme] - Optional theme for the modal (e.g., 'light', 'dark').
 * @returns {JSX.Element} - A JSX element representing the modal.
 */
const Modal = ({ isOpen, toggleModal, infos, children, styleTheme }) => {
  const { title, btnText } = infos;
  return (
    <div
      className={
        styleTheme ? `sg-modal-lib sg-modal-lib--${styleTheme}` : 'sg-modal-lib'
      }
      aria-hidden={!isOpen}
      role='dialog'
      aria-describedby={title ? title : 'modal'}
      autoFocus
    >
      <div className='sg-modal-lib__bground'>
        <span className='sg-modal-lib__bground-element'></span>
      </div>
      <dialog className='sg-modal-lib__body'>
        <section className='sg-modal-lib__body-content'>
          <button
            className='sg-modal-lib__body-close'
            onClick={toggleModal}
            aria-label='Close modal'
            autoFocus
          >
            <svg version='1.1' viewBox='0 0 512 512'>
              <path d='M443.6,387.1L312.4,255.4l131.5-130c5.4-5.4,5.4-14.2,0-19.6l-37.4-37.6c-2.6-2.6-6.1-4-9.8-4c-3.7,0-7.2,1.5-9.8,4  L256,197.8L124.9,68.3c-2.6-2.6-6.1-4-9.8-4c-3.7,0-7.2,1.5-9.8,4L68,105.9c-5.4,5.4-5.4,14.2,0,19.6l131.5,130L68.4,387.1  c-2.6,2.6-4.1,6.1-4.1,9.8c0,3.7,1.4,7.2,4.1,9.8l37.4,37.6c2.7,2.7,6.2,4.1,9.8,4.1c3.5,0,7.1-1.3,9.8-4.1L256,313.1l130.7,131.1  c2.7,2.7,6.2,4.1,9.8,4.1c3.5,0,7.1-1.3,9.8-4.1l37.4-37.6c2.6-2.6,4.1-6.1,4.1-9.8C447.7,393.2,446.2,389.7,443.6,387.1z' />
            </svg>
          </button>
          {title && (
            <h2 className='sg-modal-lib__body-title' id='modalTitle'>
              {title}
            </h2>
          )}
          <div className='sg-modal-lib__body-children-container'>
            {children}
          </div>
        </section>
        {btnText && (
          <button className='sg-modal-lib__btn' onClick={toggleModal}>
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
