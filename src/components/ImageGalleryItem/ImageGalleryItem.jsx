import PropTypes from 'prop-types';
import { Image, Item } from './ImageGalleryItem.styled';
import { Modal } from '../Modal/Modal';
import { Component } from 'react';

export class ImageGalleryItem extends Component {
  state = {
    modalIsOpen: false,
  };

  toggleOpenModal = () => {
    this.setState(prev => ({ modalIsOpen: !prev.modalIsOpen }));
  };

  handleKeyDown = e => {
    if (e.key === 'Escape') {
      this.toggleOpenModal();
    }
  };

  render() {
    const { modalIsOpen } = this.state;
    let { img, largeImg, tags } = this.props;

    return (
      <Item className="gallery-item" onClick={this.toggleOpenModal}>
        <Image src={`${img}`} alt={`${tags}`} />

        {modalIsOpen && (
          <>
            <Modal img={largeImg} alt={tags} closeModal={this.handleKeyDown} />
          </>
        )}
      </Item>
    );
  }
}

ImageGalleryItem.propTypes = {
  img: PropTypes.string.isRequired,
  largeImg: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};
