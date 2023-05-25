import React from 'react';
import css from './ImageGallery.module.css';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';

export default function ImageGallery({ imageData, onClick }) {
  return (
    <>
      <>
        <ul className={css.ImageGallery} onClick={onClick}>
          {imageData.map((item, index) => (
            <ImageGalleryItem key={`${item.id}-${index}`} item={item} />
          ))}
        </ul>
      </>
    </>
  );
}
