import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';

function MoviesCardList({ movies }) {
    const [isActivePreloader, setActivePreloader] = React.useState(false)

    function handlePreloader() {
        setActivePreloader(!isActivePreloader)
    }
    return (
        <section className="elements">
            <ul className="elements__list">
                {movies.map((movie) => (
                    <MoviesCard movie={movie} key={movie._id} />
                ))}
            </ul>
            {isActivePreloader ? (<Preloader />) : (<button onClick={handlePreloader} type="button" className="elements__btn" aria-label="Показать больше">
                Ещё
            </button>)}
        </section>
    )
}

export default MoviesCardList;