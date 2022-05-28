import { ModalImage, Overlay } from './Modal.styled';
import PropTypes from 'prop-types';
import { useEffect } from 'react';

export const Modal = ({ img, toggleOpenModal, alt }) => {
  const closeModal = () => {
    toggleOpenModal();
  };

  useEffect(() => {
    document.addEventListener('keydown', closeModal);
    return () => document.removeEventListener('keydown', closeModal);
  });

  return (
    <Overlay>
      <ModalImage src={`${img}`} alt={`${alt}`} />
    </Overlay>
  );
};

Modal.propTypes = {
  img: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
  alt: PropTypes.string.isRequired,
};
