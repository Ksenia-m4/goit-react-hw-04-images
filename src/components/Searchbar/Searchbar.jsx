import { useState } from "react";
import { CiSearch } from "react-icons/ci";

import Notiflix from "notiflix";
import PropTypes from "prop-types";

import {
  Header,
  SearchForm,
  SearchFormButton,
  SearchFormInput,
} from "./Searchbar.styled";

export default function Searchbar({ onSubmit }) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (searchQuery === "") {
      Notiflix.Notify.failure("Please enter a search query.");
      return;
    }

    onSubmit(searchQuery);

    setSearchQuery("");
  };

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setSearchQuery(value);
  };

  return (
    <Header>
      <SearchForm onSubmit={handleSubmit}>
        <SearchFormInput
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleChange}
          value={searchQuery}
        />

        <SearchFormButton type="submit">
          <CiSearch size={24} />
        </SearchFormButton>
      </SearchForm>
    </Header>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
