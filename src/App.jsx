import { useState } from "react";

import ImageGallery from "./components/ImageGallery/ImageGallery.jsx";
import Searchbar from "./components/Searchbar/Searchbar.jsx";

import "./App.css";

const App = () => {
  const [query, setQuery] = useState("");

  const handleSearch = (searchQuery) => {
    setQuery(searchQuery);
  };

  return (
    <>
      <Searchbar onSubmit={handleSearch} />
      <ImageGallery searchQuery={query} />
    </>
  );
};

export default App;
