import { useState } from "react";
import PropTypes from "prop-types";

import { ImageGalleryItem } from "../ImageGalleryItem/ImageGalleryItem";
import { Button } from "../Button/Button";
import { ImageGalleryList } from "./ImageGallery.styled.js";
import Modal from "../Modal/Modal.jsx";

export default function ImageGallery({ items, onLoadMore }) {
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const openModal = (largeImageURL, alt) => {
    setShowModal(true);
    setSelectedImage({ largeImageURL, alt });
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedImage(null);
  };

  return (
    <>
      <ImageGalleryList>
        {items.map(({ webformatURL, largeImageURL, tags, id }) => {
          return (
            <ImageGalleryItem
              key={webformatURL}
              webformatURL={webformatURL}
              tags={tags}
              id={id}
              onClick={() => openModal(largeImageURL, tags)}
            ></ImageGalleryItem>
          );
        })}
      </ImageGalleryList>

      {showModal && <Modal onClose={closeModal}>{selectedImage}</Modal>}

      {items.length !== 0 && <Button onClick={onLoadMore}></Button>}
    </>
  );
}

ImageGallery.propTypes = {
  onLoadMore: PropTypes.func,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    })
  ).isRequired,
};
