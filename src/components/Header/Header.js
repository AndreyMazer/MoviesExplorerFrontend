import headerLogo from '../../images/logo.svg';
import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';

function Header({ classNames, loggedIn, openMenu, classNameAccountLogo }) {
    return (
        <header className={classNames}>
            <Link to="/" className="header__logo-link"><img src={headerLogo} className="header__logo" alt="Логотип" /></Link>
            {loggedIn ? (
                <Navigation openMenu={openMenu} classNameAccountLogo={classNameAccountLogo} />
            ) : (
                <div className="header__container">
                    <Link to="/signup" className="header__link">Регистрация</Link>
                    <Link to="/signin" className="header__link">Войти</Link>
                </div>
            )}
        </header>
    )
}

export default Header;