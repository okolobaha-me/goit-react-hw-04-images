import PropTypes from 'prop-types';
import { Image, Item } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ img, largeImg, tags, toggleOpenModal }) => {
  return (
    <Item
      onClick={() => {
        toggleOpenModal(largeImg);
      }}
    >
      <Image src={`${img}`} alt={`${tags}`} />
    </Item>
  );
};

ImageGalleryItem.propTypes = {
  img: PropTypes.string.isRequired,
  largeImg: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};
