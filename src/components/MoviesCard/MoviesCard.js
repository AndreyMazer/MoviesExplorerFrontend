import React from 'react';

function MoviesCard({ movie, isSavedCard, onDeleteCard, onSaveCard, savedMovies }) {
    let isLiked = false

    let likedId;
    isLiked = savedMovies.some((card) => {
        if (card.movieId === movie.movieId) {
            likedId = card._id;
            return true
        }
        return false;
    })
    const duration = movie.duration;
    function handleDuration(duration) {
        const hours = Math.floor(duration / 60);
        const convertedHoursToMin = hours * 60;
        const min = duration - convertedHoursToMin;
        if (hours !== 0) {
            return `${hours}ч ${min}м`;
        } else {
            return `${min}м`;
        }
    }

    function handleSavedClick() {
        if (isLiked || isSavedCard) {
            onDeleteCard(movie._id ? movie._id : likedId)
        } else {
            onSaveCard(movie);
        }
    }

    return (
        <div className="element">
            <a className="element__image-link" href={movie.trailerLink} rel="noreferrer" target="_blank"><img className="element__image" src={movie.image} alt={`${movie.name}`} /></a>
            <div className="element__description">
                <div className="element__texts">
                    <h2 className="element__text">{movie.nameRU}</h2>
                    <p className="element__time">{handleDuration(duration)}</p>
                </div>
                <button onClick={handleSavedClick} type="button" className={isSavedCard ? "element__btn-unsaved element__btn-delete" : isLiked ? "element__btn-unsaved element__btn-saved" : "element__btn-unsaved"} aria-label="Сохранить фильм"></button>
            </div>
        </div>

    )
}

export default MoviesCard;



