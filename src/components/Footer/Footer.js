import React from 'react';

function Footer() {
    return (
        <footer className="footer">
            <h2 className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</h2>
            <div className="footer__info">
                <h3 className="footer__text">&#169; 2023</h3>
                <ul className="footer__elements">
                    <li className="footer__element"><a className="footer__link" href="https://practicum.yandex.ru" rel="noreferrer" target="_blank">Яндекс.Практикум</a></li>
                    <li className="footer__element"><a className="footer__link" href="https://github.com/AndreyMazer" rel="noreferrer" target="_blank">Github</a></li>
                </ul>
            </div>
        </footer>
    )
}

export default Footer;