import PropTypes from 'prop-types';
import { Image, Item } from './ImageGalleryItem.styled';
import { Modal } from '../Modal/Modal';
import { useState } from 'react';

export const ImageGalleryItem = ({ img, largeImg, tags }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleKeyDown = e => {
    if (e.key === 'Escape') {
      toggleOpenModal();
    }
  };

  const toggleOpenModal = () => {
    setModalIsOpen(!modalIsOpen);
  };

  return (
    <Item onClick={toggleOpenModal}>
      <Image src={`${img}`} alt={`${tags}`} />

      {modalIsOpen && (
        <>
          <Modal img={largeImg} alt={tags} closeModal={handleKeyDown} />
        </>
      )}
    </Item>
  );
};

ImageGalleryItem.propTypes = {
  img: PropTypes.string.isRequired,
  largeImg: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};
