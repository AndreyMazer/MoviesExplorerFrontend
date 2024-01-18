import React, { useState, useEffect } from 'react';
import { useFormValidation } from '../../hooks/useFormValidation';
import Preloader from '../Preloader/Preloader';

function SearchForm({ onSearch, handleChangeCheckbox, isSearchText, isActiveCheckbox }) {
  const { values, errors, isValid, handleChange, resetForm } = useFormValidation();
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [searchResult, setSearchResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    if (isSearchText) {
      resetForm({ movieTitle: isSearchText });
      handleSearch(isSearchText);
    }
  }, [isSearchText, resetForm]);

  function handleSearch(query) {
    setIsLoading(true);
    onSearch(query, (result) => {
      if (result) {
        setSearchResult("Результаты поиска");
        setHasSearched(true);
      } else {
        setSearchResult("Ничего не найдено");
        setHasSearched(false);
      }
      setIsLoading(false);
    });
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    setIsFormSubmitted(true);
    setHasSearched(false);
    if (values.movieTitle) {
      handleSearch(values.movieTitle);
    } else {
      setSearchResult("Нужно ввести ключевое слово");
      setHasSearched(false);
    }
  }

  function handleCheckboxChange(evt) {
    handleChangeCheckbox(evt.target.checked);
  }

  return (
    <section className="search-form">
      <form className="search-form__container" onSubmit={handleSubmit} noValidate>
        <div className="search-form__scan">
          <input
            type="text"
            name="movieTitle"
            value={values.movieTitle || ""}
            onChange={handleChange}
            placeholder="Фильм"
            className="search-form__input search-form__input_type_film"
            id="film-input"
            required
          />
          <span className={`search-form__input-error ${isFormSubmitted && !values.movieTitle ? "search-form__input-error_active" : ""}`}>
            {isFormSubmitted && !values.movieTitle ? "Нужно ввести ключевое слово" : ""}
          </span>
          <button
            type="submit"
            className={`search-form__button ${!values.movieTitle ? "search-form__button_unworked" : ""}`}
            aria-label="Поиск фильмов"
          ></button>
        </div>
        <div className="search-form__label-choice">
          <div className="search-form__choice">
            <input
              type="checkbox"
              onChange={handleCheckboxChange}
              id="switch"
              className="search-form__input-tumb"
              checked={isActiveCheckbox}
              value={isActiveCheckbox}
            />
            <label htmlFor="switch" className="search-form__toggle"></label>
          </div>
          <p className="search-form__text">Короткометражки</p>
        </div>
      </form>
      {searchResult === "Ничего не найдено" && isFormSubmitted && hasSearched && !isLoading && <p >Ничего не найдено</p>}
      {isLoading && !hasSearched && <Preloader />}
    </section>
  );
}

export default SearchForm;