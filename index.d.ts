declare module 'sg-modal-lib' {
  export interface ModalProps {
    isOpen: boolean; // Indicates if the modal is open
    toggleModal: () => void; // Function to toggle the modal's visibility
    infos?: {
      title?: string; // Optional title for the modal
      btnText?: string; // Optional text for a button in the modal
    };
    children: React.ReactNode; // Content to display inside the modal
    styleTheme?: string; // Optional theme for the modal (e.g., 'light', 'dark')
    escapeClose?: boolean; // Allows closing the modal with the Escape key
    overlayClickClose?: boolean; // Allows closing the modal by clicking the overlay
    showClose?: boolean; // Shows a close button/icon
    fadeDuration?: number; // Duration for fade transition in milliseconds
  }

  export const Modal: React.FC<ModalProps>;
}
