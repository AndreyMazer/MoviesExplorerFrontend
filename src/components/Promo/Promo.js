import React from 'react';
import globus from '../../images/globus.svg';


function Promo() {
    return (
        <section className="promo">
            <div className="promo__container">
                <h1 className="promo__title">Учебный проект студента факультета Веб&#8722;разработки.</h1>
                <h2 className="promo__subtitle">Листайте ниже, чтобы узнать больше про этот проект и его создателя.</h2>
            </div>
            <img src={globus} className="promo__image"
                alt="Глобус" />
        </section>
    )
}

export default Promo;