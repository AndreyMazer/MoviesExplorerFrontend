import React, { useState, useEffect } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function SavedMovies({ filteredMovies, onDeleteCard, onSaveCard, savedMovies }) {
  const [isSearchText, setIsSearchText] = useState('');
  const [isActiveCheckbox, setIsActiveCheckbox] = useState(false);
  const [allMovies, setAllMovies] = useState([]);

  useEffect(() => {
    setAllMovies(applyFilters(filteredMovies, isSearchText, isActiveCheckbox));
  }, [filteredMovies, isSearchText, isActiveCheckbox]);

  function applyFilters(movies, searchText, isShort) {
    let filtered = movies;
    if (searchText) {
      filtered = movies.filter((movie) => {
        return (
          movie.nameRU.toLowerCase().includes(searchText.toLowerCase()) ||
          movie.nameEN.toLowerCase().includes(searchText.toLowerCase())
        );
      });
    }
    if (isShort) {
      filtered = filtered.filter((movie) => movie.duration <= 40);
    }
    return filtered;
  }

  function handleSearch(searchText) {
    setIsSearchText(searchText);
  }

  function handleChangeCheckbox() {
    setIsActiveCheckbox(!isActiveCheckbox);
  }

  function handleDeleteCard(movieId) {
    onDeleteCard(movieId);
    if (isSearchText) {
      setAllMovies(applyFilters(filteredMovies, isSearchText, isActiveCheckbox));
    }
  }

  return (
    <main className="movies">
      <SearchForm
        onSearch={handleSearch}
        handleChangeCheckbox={handleChangeCheckbox}
        isSearchText={isSearchText}
        isActiveCheckbox={isActiveCheckbox}
      />
      <MoviesCardList
        movies={allMovies}
        isSavedCard={true}
        onDeleteCard={handleDeleteCard}
        onSaveCard={onSaveCard}
        savedMovies={savedMovies}
      />
    </main>
  );
}

export default SavedMovies;
