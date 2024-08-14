import Modal from 'react-modal';
import css from './ImageModal.module.css';

function ImageModal({ image, modalIsOpen, closeModal, onAfterClose }) {
  Modal.setAppElement('#modal');

  return (
    <Modal
      className={css.modal}
      overlayClassName={css.backdrop}
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      onAfterClose={onAfterClose}
      shouldCloseOnOverlayClick={true}
    >
      <img
        className={css.modalImg}
        src={image.urls.regular}
        alt={image.description}
      />
    </Modal>
  );
}

export default ImageModal;
