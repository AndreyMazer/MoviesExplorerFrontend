import React from 'react';
import { Link } from 'react-router-dom';
import headerLogo from '../../images/logo.svg';
import { useFormWithValidation } from '../../hooks/useFormWithValidation';

function Register({ onRegister, errorMessage }) {
    const { values, errors, isValid, handleChange, resetForm } = useFormWithValidation();

    function handleSubmit(evt) {
        evt.preventDefault();
        const { name, email, password } = values;
        onRegister(name, email, password);
    }

    return (
        <main className="authorization">
            <section className="authorization__container">
                <Link to="/" className="authorization__logolink"><img className="authorization__logo" src={headerLogo} alt="Логотип" /></Link>
                <h2 className="authorization__title">Добро пожаловать!</h2>
                <form className="authorization__form" onSubmit={handleSubmit} noValidate>
                    <div className="authorization__label">
                        <p className="authorization__text">Имя</p>
                        <input type="text" name="name" value={values.name || ""} onChange={handleChange} pattern="^[a-zA-Zа-яА-Я \-]+$" placeholder="Имя" className="authorization__input authorization__input_type_name" id="name-input" minLength="2" maxLength="30" required />
                        <span className={`authorization__text-error name-input-error ${errors.name ? "authorization__text-error_active" : ""}`}>{errors.name}</span>
                    </div>
                    <div className="authorization__label">
                        <p className="authorization__text">E-mail</p>
                        <input type="email" name="email" value={values.email || ""} onChange={handleChange} pattern="^([^ ]+@[^ ]+\.[a-z]{2,6}|)$" placeholder="Email" className="authorization__input authorization__input_type_email" id="email-input" required />
                        <span className={`authorization__text-error email-input-error ${errors.email ? "authorization__text-error_active" : ""}`}>{errors.email}</span>
                    </div>
                    <div className="authorization__label">
                        <p className="authorization__text">Пароль</p>
                        <input type="password" name="password" value={values.password || ""} onChange={handleChange} placeholder="Пароль" className="authorization__input authorization__input_type_password" id="password-input" required />
                        <span className={`authorization__text-error password-input-error ${errors.password ? "authorization__text-error_active" : ""}`}>{errors.password}</span>
                    </div>
                    <div className="authorization__button-label authorization__button-register">
                        <span className="authorization__button-error">{errorMessage}</span>
                        <button type="submit" className={`authorization__button ${!isValid ? "authorization__button_unworked" : ""}`}>Зарегистрироваться</button>
                    </div>
                </form>
                <div className="authorization__sign">
                    <p className="authorization__question">Уже зарегистрированы?</p>
                    <Link to="/signin" className="authorization__login">
                        <p className="authorization__link">Войти </p>
                    </Link>
                </div>
            </section>
        </main>
    )
}

export default Register;