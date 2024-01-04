import React from 'react';

function SearchForm() {
    return (
        <section className="search-form">
            <form className="search-form__container">
                <div className="search-form__scan">
                    <input type="text" placeholder="Фильм" className="search-form__input search-form__input_type_film" id="film-input" required />
                    <button type="submit" className="search-form__button" aria-label="Поиск фильмов"></button>
                </div>
                <div className="search-form__label-choice">
                    <div className="search-form__choice">
                        <input type="checkbox"
                            id="switch"
                            className="search-form__input-tumb" />
                        <label for="switch"
                            className="search-form__toggle"></label>
                    </div>
                    <p className="search-form__text">Короткометражки</p>
                </div>
            </form>
        </section >
    )
}

export default SearchForm;