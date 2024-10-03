import { useEffect, useState } from "react";
import Notiflix from "notiflix";
import PropTypes from "prop-types";

import getImages from "./../../services/getImages";

import { ImageGalleryItem } from "../ImageGalleryItem/ImageGalleryItem";
import { Button } from "../Button/Button";
import Modal from "../Modal/Modal";
import { Loader } from "../Loader/Loader";
import { ImageGalleryList } from "./ImageGallery.styled.js";

export default function ImageGallery({ searchQuery }) {
  const [query, setQuery] = useState("");
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Обновляем query при изменении searchQuery
  useEffect(() => {
    setQuery(searchQuery);
    setImages([]);
    setPage(1);
  }, [searchQuery]);

  // Загружаем изображения при изменении query или page
  useEffect(() => {
    if (!query) return;

    function fetchImages() {
      setIsLoading(true);

      getImages(query, page)
        .then((resp) => {
          if (resp.length === 0) {
            Notiflix.Notify.failure(
              "Sorry, there are no images matching your search query. Please try again."
            );
            return;
          }
          setImages((prevImages) => [...prevImages, ...resp]);
        })
        .catch(() => {
          Notiflix.Notify.failure(
            "Failed to load images. Please try again later."
          );
        })
        .finally(() => setIsLoading(false));
    }

    fetchImages();
  }, [page, query]);

  const openModal = (largeImageURL, alt) => {
    setShowModal(true);
    setSelectedImage({ largeImageURL, alt });
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedImage(null);
  };

  const onLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <>
      {isLoading && <Loader />}
      {images.length !== 0 && (
        <ImageGalleryList>
          {images.map(({ webformatURL, largeImageURL, tags, id }) => {
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
      )}

      {showModal && <Modal onClose={closeModal}>{selectedImage}</Modal>}

      {images.length !== 0 && <Button onClick={onLoadMore}></Button>}
    </>
  );
}

ImageGallery.propTypes = {
  searchQuery: PropTypes.string.isRequired,
};
