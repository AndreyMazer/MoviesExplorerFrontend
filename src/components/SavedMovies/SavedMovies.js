import React, { useState, useEffect } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';

function SavedMovies({ filteredMovies, onDeleteCard, onSaveCard, savedMovies }) {
  const [isSearchText, setIsSearchText] = useState('');
  const [isActiveCheckbox, setIsActiveCheckbox] = useState(false);
  const [allMovies, setAllMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setAllMovies(filteredMovies);
  }, [filteredMovies]);

  useEffect(() => {
    setAllMovies(onSearch(filteredMovies, isSearchText));
  }, [isSearchText]);

  function handleChangeCheckbox() {
    setIsActiveCheckbox(!isActiveCheckbox);
  }

  function onSearch(moviesList, searchMovie) {
    return moviesList.filter((movie) => {
      return (
        movie.nameRU.toLowerCase().includes(searchMovie.toLowerCase()) ||
        movie.nameEN.toLowerCase().includes(searchMovie.toLowerCase())
      );
    });
  }

  function onSearchShortMovies(moviesList) {
    return moviesList.filter((movie) => {
      return movie.duration <= 40;
    });
  }

  function getOnSearchMovies() {
    if (!isSearchText) {
      return;
    }
    setIsLoading(true);
    try {
      const moviesData = onSearch(filteredMovies, isSearchText);
      setAllMovies(moviesData);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }

  function handleDeleteCard(movieId) {
    onDeleteCard(movieId);
    getOnSearchMovies();
  }

  return (
    <main className="movies">
      <SearchForm
        onSearch={setIsSearchText}
        handleChangeCheckbox={handleChangeCheckbox}
        isSearchText={isSearchText}
        isActiveCheckbox={isActiveCheckbox}
        getOnSearchMovies={getOnSearchMovies}
      />
      {isLoading && <Preloader />}
      <MoviesCardList
        movies={!isSearchText ? (isActiveCheckbox ? onSearchShortMovies(filteredMovies) : filteredMovies) : (isActiveCheckbox ? onSearchShortMovies(filteredMovies) : allMovies)}
        isSavedCard={true}
        onDeleteCard={handleDeleteCard}
        onSaveCard={onSaveCard}
        savedMovies={savedMovies}
      />
    </main>
  );
}

export default SavedMovies;