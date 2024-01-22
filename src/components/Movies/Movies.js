import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';

function Movies({ filteredMovies, onDeleteCard, onSaveCard, savedMovies }) {
    const [isLoading, setIsLoading] = React.useState(false);
    const [isSearchText, setIsSearchText] = React.useState('');
    const [isActiveCheckbox, setIsActiveCheckbox] = React.useState(false);
    const [shortMovies, setShortMovies] = React.useState([]);
    const [allMovies, setAllMovies] = React.useState([]);
    const [showNotFound, setShowNotFound] = React.useState(false);
    const [isFirstSearch, setIsFirstSearch] = React.useState(true); 

    React.useEffect(() => {
        if (isFirstSearch) { 
            getOnSearchMovies();
            setIsFirstSearch(false); 
        } else {
            setShortMovies(onSearchShortMovies(allMovies)); 
        }
    }, [isSearchText, isActiveCheckbox]);

    React.useEffect(() => {
        getOnSearchMovies();
        setShortMovies(onSearchShortMovies(allMovies));
    }, [isSearchText, isActiveCheckbox]);

    React.useEffect(() => {
        restoringPreviousSearch();
    }, []);

    function handleChangeCheckbox() {
        setIsActiveCheckbox(!isActiveCheckbox);
    }

    function onSearch(moviesList, searchMovie) {
        return moviesList.filter((movie) => {
            return (movie.nameRU.toLowerCase().includes(searchMovie.toLowerCase()) || movie.nameEN.toLowerCase().includes(searchMovie.toLowerCase()));
        });
    }

    function onSearchShortMovies(moviesList) {
        return moviesList.filter((movie) => {
            return movie.duration <= 40;
        });
    }

    function restoringPreviousSearch() {
        if (localStorage.getItem('previousText')) {
            setIsSearchText(localStorage.getItem('previousText'));
        }
        if (localStorage.getItem('previousCheckbox')) {
            setIsActiveCheckbox(JSON.parse(localStorage.getItem('previousCheckbox')));
        }
        if (localStorage.getItem('previousMovies')) {
            setAllMovies(JSON.parse(localStorage.getItem('previousMovies')));
        }
        return;
    }

    function getOnSearchMovies() {
        setIsLoading(true); 
        setAllMovies([]);
        try {
            if (isSearchText.length > 0) {
                const moviesData = onSearch(filteredMovies, isSearchText);
                setAllMovies(moviesData);
                setShortMovies(onSearchShortMovies(moviesData));
                setShowNotFound(moviesData.length === 0);
                localStorage.setItem('previousText', isSearchText);
                localStorage.setItem('previousMovies', JSON.stringify(moviesData));
                localStorage.setItem('previousCheckbox', JSON.stringify(isActiveCheckbox));
            } else {
                setShowNotFound(false);
            }
        } catch (err) {
            console.log(err);
        } finally {
            setTimeout(() => {
                setIsLoading(false); 
            }, 1000);
        }
    }
    return (
        <main className="movies">
            <SearchForm onSearch={setIsSearchText} handleChangeCheckbox={handleChangeCheckbox} isSearchText={isSearchText} isActiveCheckbox={isActiveCheckbox} />
            {isLoading && !showNotFound && <Preloader />}
            {showNotFound && !isLoading && (
                <p className='search-form__input-error_notfound'>Ничего не найдено</p>
            )}
            {allMovies.length > 0 && !isLoading && (
                <MoviesCardList movies={isActiveCheckbox ? shortMovies : allMovies} isSavedCard={false} onDeleteCard={onDeleteCard} onSaveCard={onSaveCard} savedMovies={savedMovies} />
            )}
        </main>
    );
}

export default Movies;