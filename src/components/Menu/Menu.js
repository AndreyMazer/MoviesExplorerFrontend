import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import accountLogo from '../../images/acclog.svg';


function Menu({ isOpen, onClose }) {

    return (
        <div className={isOpen ? `menu menu_opened` : `menu`}>
            <nav className="menu__container">
                <button className="menu__btn-close" onClick={onClose}></button>
                <div className="menu__info">
                    <Link className="menu__link" to="/">Главная</Link>
                    <Link className="menu__link" to="/movies">Фильмы</Link>
                    <Link className="menu__link" to="/saved-movies">Сохранённые фильмы</Link>
                </div>
                <div className="menu__account">
                    <Link className="menu__accounttext" to="/profile">Аккаунт
                        <img src={accountLogo} className="menu__accountlogo" alt="Логотип" />
                    </Link>
                </div>
            </nav>
        </div>
    )
}

export default Menu;