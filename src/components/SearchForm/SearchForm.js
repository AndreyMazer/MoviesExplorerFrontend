import React, { useEffect, useState } from 'react';
import { useFormValidation } from '../../hooks/useFormValidation';
import Preloader from '../Preloader/Preloader';

function SearchForm({ onSearch, handleChangeCheckbox, isSearchText, isActiveCheckbox }) {
  const { values, errors, isValid, handleChange, resetForm } = useFormValidation();
  const [isFormSubmitted, setIsFormSubmitted] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (isSearchText === false) {
      resetForm();
      if (searchQuery) {
        handleChange({ target: { value: searchQuery, name: 'movieTitle' } });
      }
    }
  }, [isSearchText, resetForm, searchQuery]);

  useEffect(() => {
    if (isSearchText === false) {
      resetForm();
    }
  }, [isSearchText, resetForm]);
  

  function handleSubmit(evt) {
    evt.preventDefault();
    setIsFormSubmitted(true);
    if (values.movieTitle) {
      setIsLoading(true);
      if (typeof onSearch === 'function') {
        const searchResult = onSearch(values.movieTitle);
        if (searchResult instanceof Promise) {
          searchResult
            .then((res) => {
              setSearchQuery(values.movieTitle);
            })
            .catch(err => {
            })
            .finally(() => {
              setTimeout(() => {
                setIsLoading(false);
              }, 1000);
            });
        } else {
          setTimeout(() => {
            setIsLoading(false);
          }, 1000);
        }
      } else {
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      }
    }
    setIsFormSubmitted(true);
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
          <span className={`search-form__input-error ${isFormSubmitted && !values.movieTitle && !isValid ? "search-form__input-error_active" : ""}`}>
            {isFormSubmitted && !values.movieTitle && !isValid ? "Нужно ввести ключевое слово" : ""}
          </span>
          <button
            type="submit"
            className="search-form__button"
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
      {isLoading && <Preloader />}
    </section>
  );
}

export default SearchForm;
