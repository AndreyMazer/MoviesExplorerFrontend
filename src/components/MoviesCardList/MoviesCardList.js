import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';
import { DESKTOP_SIZE, MEDIUM_SIZE, MOBILE_SIZE, } from '../../utils/constants';

function MoviesCardList({ movies, isLoading, isSavedCard, onDeleteCard, onSaveCard, savedMovies }) {
  const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);
  const [moviesCount, setMoviesCount] = React.useState(0);
  const [biggerMoviesCount, setBiggerMoviesCount] = React.useState(0);
  const [moviesToList, setMoviesToList] = React.useState([]);

  React.useEffect(() => {
    checkedCountMovies();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [windowWidth]);

  const checkedCountMovies = () => {
    if (isSavedCard) {
      setMoviesCount(movies.length);
      setBiggerMoviesCount(0);
    } else {
      if (windowWidth >= DESKTOP_SIZE) {
        setMoviesCount(4 * 4); 
        setBiggerMoviesCount(4); 
      } else if (windowWidth >= MEDIUM_SIZE && windowWidth < DESKTOP_SIZE) {
        setMoviesCount(4 * 3); 
        setBiggerMoviesCount(3); 
      } else if (windowWidth >= MOBILE_SIZE && windowWidth < MEDIUM_SIZE) {
        setMoviesCount(4 * 2); 
        setBiggerMoviesCount(2); 
      } else {
        setMoviesCount(5 * 1); 
        setBiggerMoviesCount(2); 
      }
    }
  }

  function handleResize() {
    setWindowWidth(window.innerWidth);
  }

  React.useEffect(() => {
    setMoviesToList(movies.slice(0, moviesCount));
  }, [movies, moviesCount]);

  return (
    <section className="elements">
      <ul className="elements__list">
        {isLoading ? (
          <Preloader />
        ) : (
          moviesToList.map((movie) => (
            <MoviesCard
              movie={movie}
              key={movie.movieId}
              isSavedCard={isSavedCard}
              onDeleteCard={onDeleteCard}
              onSaveCard={onSaveCard}
              savedMovies={savedMovies}
            />
          ))
        )}
      </ul>
      {!isSavedCard && movies.length > moviesCount && (
        <button
          onClick={() => setMoviesCount(moviesCount + biggerMoviesCount)}
          type="button"
          className="elements__btn"
          aria-label="Показать больше фильмов"
        >
          Ещё
        </button>
      )}
    </section>
  );
}

export default MoviesCardList;