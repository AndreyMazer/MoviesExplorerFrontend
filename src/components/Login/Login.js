import React from 'react';
import { Link } from 'react-router-dom';
import headerLogo from '../../images/logo.svg';
import data from '../../utils/constants';

function Login({ loginInto }) {

    return (
        <main className="authorization">
            <section className="authorization__container">
                <Link to="/" className="authorization__logo-link"><img className="authorization__logo" src={headerLogo} alt="Логотип" /></Link>
                <h2 className="authorization__title">Рады видеть!</h2>
                <form className="authorization__form">
                    <div className="authorization__label">
                        <p className="authorization__text">E-mail</p>
                        <input value={data.email} type="email" placeholder="Email" className="authorization__input authorization__input_type_email" id="email-input" required />
                        <span className="authorization__text-error email-input-error"></span>
                    </div>
                    <div className="authorization__label">
                        <p className="authorization__text">Пароль</p>
                        <input value={data.password} type="password" placeholder="Пароль" className="authorization__input authorization__input_type_password" id="password-input" minLength="2" maxLength="200" required />
                        <span className="authorization__text-error password-input-error"></span>
                    </div>
                    <button type="submit" className="authorization__button authorization__button-login">Войти</button>
                </form>
                <div className="authorization__sign">
                    <p className="authorization__question">Ещё не зарегистрированы?</p>
                    <Link to="/signup" className="authorization__login">
                        <p className="authorization__link">Регистрация</p>
                    </Link>
                </div>
            </section>
        </main>
    )
}

export default Login;