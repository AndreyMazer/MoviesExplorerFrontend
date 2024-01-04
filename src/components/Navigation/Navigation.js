import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import accountLogo from '../../images/acclog.svg';

function Navigation({ openMenu, classNameAccountLogo }) {
    return (
        <nav className="navigation">
            <div className="navigation__elements">
                <Link to="/movies" className="navigation__element">Фильмы</Link>
                <Link to="/saved-movies" className="navigation__element">Сохранённые фильмы</Link>
            </div>
            <div className="navigation__account">
                <Link to="/profile" className="navigation__accounttext">Аккаунт
                    <img src={accountLogo} className={classNameAccountLogo} alt="Лого" /></Link>
            </div>
            <button className="navigation__menu" onClick={openMenu}></button>
        </nav>
    )
}

export default Navigation;