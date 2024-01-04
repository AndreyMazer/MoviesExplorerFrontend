import React from 'react';
import strela from '../../images/strela.svg'


function Portfolio() {
    return (
        <section className="portfolio">
            <h2 className="portfolio__header">Портфолио</h2>
            <ul className="portfolio__list">
                <li className="portfolio__el">
                    <a href="https://github.com/AndreyMazer/how-to-learn.git" className="portfolio__link" rel="noreferrer" target="_blank">Статичный сайт
                        <img src={strela} className="portfolio__image"
                            alt="переход" />
                    </a>
                </li>
                <li className="portfolio__el"><a href="https://andreymazer.github.io/russian-travel/index.html" className="portfolio__link" rel="noreferrer" target="_blank">Адаптивный сайт <img src={strela} className="portfolio__image"
                    alt="переход" /></a></li>
                <li className="portfolio__el"><a href="https://github.com/AndreyMazer/react-mesto-auth.git" className="portfolio__link" rel="noreferrer" target="_blank">Одностраничное приложение <img src={strela} className="portfolio__image"
                    alt="переход" /></a></li>
            </ul>
        </section>
    )
}

export default Portfolio;