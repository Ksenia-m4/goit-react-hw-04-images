import { useEffect, useState } from "react";
import Notiflix from "notiflix";

import ImageGallery from "./components/ImageGallery/ImageGallery.jsx";
import Searchbar from "./components/Searchbar/Searchbar.jsx";
import { Loader } from "./components/Loader/Loader.jsx";

import getImages from "./services/getImages.js";
import "./App.css";

const App = () => {
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);

  const handleSearch = (searchQuery) => {
    if (searchQuery !== query) {
      setQuery(searchQuery);
      setImages([]);
      setPage(1);
    }
  };

  useEffect(() => {
    if (!query) return;

    async function fetchImages() {
      try {
        setIsLoading(true);
        const images = await getImages(query, page);
        setImages((prevImages) => [...prevImages, ...images]);
      } catch {
        Notiflix.Notify.failure(
          "Failed to load images. Please try again later."
        );
      } finally {
        setIsLoading(false);
      }
    }

    fetchImages();
  }, [page, query]);

  const onLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <>
      {isLoading && <Loader />}
      <Searchbar onSubmit={handleSearch} />
      {images.length !== 0 && (
        <ImageGallery items={images} onLoadMore={onLoadMore}></ImageGallery>
      )}
    </>
  );
};

export default App;
