import React from 'react';
import { useFormWithValidation } from '../../hooks/useFormWithValidation';

function SearchForm({ onSearch, handleChangeCheckbox, isSearchText, isActiveCheckbox }) {
    const { values, errors, isValid, handleChange, resetForm } = useFormWithValidation();
    const { movieTitle } = values;

    React.useEffect(() => {
        resetForm({ movieTitle: isSearchText })
    }, [isSearchText]);


    function handleSubmit(evt) {
        evt.preventDefault();
        onSearch(movieTitle);
    }

    return (
        <section className="search-form">
            <form className="search-form__container" onSubmit={handleSubmit} noValidate>
                <div className="search-form__scan">
                    <input type="text" name="movieTitle" value={values.movieTitle || ""} onChange={handleChange} placeholder="Фильм" className="search-form__input search-form__input_type_film" id="film-input" required />
                    <span className={`search-form__input-error ${errors.movieTitle ? "search-form__input-error_active" : ""}`}>{errors.movieTitle}</span>
                    <button disabled={!isValid} type="submit" className={`search-form__button ${!isValid ? "search-form__button_unworked" : ""}`} aria-label="Поиск фильмов">Поиск</button>
                </div>
                <div className="search-form__label-choice">
                    <div className="search-form__choice">
                        <input type="checkbox"
                            onChange={handleChangeCheckbox}
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