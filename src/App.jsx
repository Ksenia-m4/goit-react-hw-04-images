import { Component } from "react";

import { Searchbar } from "./components/Searchbar/Searchbar.jsx";
import { ImageGallery } from "./components/ImageGallery/ImageGallery.jsx";

import "./App.css";

class App extends Component {
  state = {
    searchQuery: "",
  };

  handleSearch = (searchQuery) => {
    this.setState({ searchQuery });
  };

  render() {
    const { searchQuery } = this.state;
    return (
      <>
        <Searchbar onSubmit={this.handleSearch} />
        <ImageGallery searchQuery={searchQuery} />
      </>
    );
  }
}

export default App;
