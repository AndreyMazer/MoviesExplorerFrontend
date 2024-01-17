import React, { useState } from 'react';
import { useFormValidation } from '../../hooks/useFormValidation';

function SearchForm({ onSearch, handleChangeCheckbox, isSearchText, isActiveCheckbox }) {
    const { values, errors, isValid, handleChange, resetForm } = useFormValidation();
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);
    const [searchResult, setSearchResult] = useState(null);

    React.useEffect(() => {
        resetForm({ movieTitle: isSearchText })
    }, [isSearchText]);

    function handleSubmit(evt) {
        evt.preventDefault();
        setIsFormSubmitted(true);
        if (values.movieTitle) {
            setSearchResult("Результаты поиска");
            onSearch(values.movieTitle);
        } else {
            setSearchResult("Ничего не найдено");
        }
    }

    function handleCheckboxChange(evt) {
        handleChangeCheckbox(evt.target.checked);
    }


    return (
        <section className="search-form">
            <form className="search-form__container" onSubmit={handleSubmit} noValidate>
                <div className="search-form__scan">
                    <input type="text" name="movieTitle" value={values.movieTitle || ""} onChange={handleChange} placeholder="Фильм" className="search-form__input search-form__input_type_film" id="film-input" required />
                    <span className={`search-form__input-error ${isFormSubmitted && !values.movieTitle ? "search-form__input-error_active" : ""}`}>{isFormSubmitted && !values.movieTitle ? "Нужно ввести ключевое слово" : ""}</span>
                    <button disabled={!isValid || (isFormSubmitted && errors.movieTitle)} type="submit" className={`search-form__button ${(!isValid || (isFormSubmitted && errors.movieTitle)) ? "search-form__button_unworked" : ""}`} aria-label="Поиск фильмов"></button>
                </div>
                <div className="search-form__label-choice">
                    <div className="search-form__choice">
                        <input type="checkbox"
                            onChange={handleCheckboxChange}
                            id="switch"
                            className="search-form__input-tumb"
                            checked={isActiveCheckbox}
                            value={isActiveCheckbox}
                        />
                        <label htmlFor="switch"
                            className="search-form__toggle"></label>
                    </div>
                    <p className="search-form__text">Короткометражки</p>
                </div>
            </form>
        </section >
    )
}

export default SearchForm;