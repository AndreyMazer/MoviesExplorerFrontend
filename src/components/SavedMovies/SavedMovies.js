import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import savedMovies from '../../utils/Saved-Movies';

function SavedMovies() {
    return (
        <main className="movies">
            <SearchForm />
            <MoviesCardList movies={savedMovies} />
        </main>
    )
}

export default SavedMovies;