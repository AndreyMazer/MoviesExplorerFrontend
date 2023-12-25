import React from 'react';

function MoviesCard({ movie }) {
    const [isSavedCard, setSavedCard] = React.useState(false)

    function handleSavedClick() {
        setSavedCard(!isSavedCard)
    }

    return (
        <div className="element">
            <img className="element__image" src={movie.image} alt={`${movie.name}`} />
            <div className="element__description">
                <div className="element__texts">
                    <h2 className="element__text">{movie.name}</h2>
                    <p className="element__time">{movie.duration}</p>
                </div>
                <button onClick={handleSavedClick} type="button" className={isSavedCard ? "element__btn-unsaved element__btn-saved" : "element__btn-unsaved"} aria-label="Сохранить фильм"></button>
            </div>
        </div>

    )
}

export default MoviesCard;