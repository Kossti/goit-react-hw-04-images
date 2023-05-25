import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from 'components/Modal/Modal';
import css from './ImageGalleryItem.module.css';

export default class ImageGalleryItem extends Component {
  state = {
    statusModal: false,
  };

  toggleModal = () => {
    this.setState(({ statusModal }) => ({
      statusModal: !statusModal,
    }));
  };

  render() {
    const { id, webformatURL, largeImageURL, type } = this.props.item;

    return (
      <>
        <li key={id} className={css.ImageGalleryItem}>
          <img
            className={css.ImageGalleryItemImage}
            id={id}
            src={webformatURL}
            alt={type}
            onClick={this.toggleModal}
          />
        </li>
        {this.state.statusModal && (
          <Modal onClose={this.toggleModal} image={largeImageURL}>
            <img src={largeImageURL} alt="largeImage" />
          </Modal>
        )}
      </>
    );
  }
}

ImageGalleryItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  }).isRequired,
};
