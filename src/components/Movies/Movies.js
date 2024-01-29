import React, { useEffect, useState } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';

function Movies({ filteredMovies, onDeleteCard, onSaveCard, savedMovies }) {
  const [isSearchText, setIsSearchText] = useState('');
  const [isActiveCheckbox, setIsActiveCheckbox] = useState(false);
  const [shortMovies, setShortMovies] = useState([]);
  const [allMovies, setAllMovies] = useState([]);
  const [showNotFound, setShowNotFound] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    restorePreviousSearch();
  }, []);

  useEffect(() => {
    if (isSearchText || isActiveCheckbox) {
      const searchResult = onSearch(filteredMovies, isSearchText);
      if (isActiveCheckbox) {
        setShortMovies(onSearchShortMovies(searchResult));
      }
      setAllMovies(searchResult);
      setShowNotFound(searchResult.length === 0);
      saveSearchData(isSearchText, isActiveCheckbox, searchResult);
    }
  }, [isSearchText, isActiveCheckbox, filteredMovies]);

  function handleChangeCheckbox() {
    setIsActiveCheckbox(!isActiveCheckbox);
  }

  function handleSubmit(searchText) {
    setIsSearchText(searchText);
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

  function restorePreviousSearch() {
    const previousText = localStorage.getItem('previousText');
    const previousCheckbox = localStorage.getItem('previousCheckbox');
    const previousMovies = localStorage.getItem('previousMovies');
    if (previousText) {
      setIsSearchText(previousText);
    }
    if (previousCheckbox) {
      setIsActiveCheckbox(JSON.parse(previousCheckbox));
    }
    if (previousMovies) {
      setAllMovies(JSON.parse(previousMovies));
      if (JSON.parse(previousCheckbox)) {
        setShortMovies(onSearchShortMovies(JSON.parse(previousMovies)));
      }
    }
  }

  function saveSearchData(text, checkbox, movies) {
    localStorage.setItem('previousText', text);
    localStorage.setItem('previousCheckbox', JSON.stringify(checkbox));
    localStorage.setItem('previousMovies', JSON.stringify(movies));
  }

  return (
    <main className="movies">
      <SearchForm
        onSearch={handleSubmit}
        handleChangeCheckbox={handleChangeCheckbox}
        isSearchText={isSearchText}
        isActiveCheckbox={isActiveCheckbox}
      />
      {showNotFound && isSearchText && (
        <p className='search-form__input-error_notfound'>Ничего не найдено</p>
      )}
      {isSearchText && allMovies.length > 0 && (
        <MoviesCardList
          movies={isActiveCheckbox ? shortMovies : allMovies}
          isSavedCard={false}
          onDeleteCard={onDeleteCard}
          onSaveCard={onSaveCard}
          savedMovies={savedMovies}
        />
      )}
    </main>
  );
}

export default Movies;