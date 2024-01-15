import React from 'react';
import { Link } from 'react-router-dom';
import headerLogo from '../../images/logo.svg';
import { useFormValidation } from '../../hooks/useFormValidation'

function Login({ onLogin, errorMessage }) {

    const { values, errors, isValid, handleChange, resetForm } = useFormValidation();
    React.useEffect(() => {
        resetForm()
    }, [resetForm]);

    function handleSubmit(evt) {
        const { email, password } = values;
        evt.preventDefault();
        onLogin(email, password);
    }

    return (
        <main className="authorization">
            <section className="authorization__container">
                <Link to="/" className="authorization__logo-link"><img className="authorization__logo" src={headerLogo} alt="Логотип" /></Link>
                <h2 className="authorization__title">Рады видеть!</h2>
                <form className="authorization__form" onSubmit={handleSubmit} noValidate>
                    <div className="authorization__label">
                        <p className="authorization__text">E-mail</p>
                        <input value={values.email || ""} type="email" name="email" placeholder="Email" onChange={handleChange} pattern="^([^ ]+@[^ ]+\.[a-z]{2,6}|)$" className="authorization__input authorization__input_type_email" id="email-input" required />
                        <span className={`authorization__text-error email-input-error ${errors.email ? "authorization__text-error_active" : ""}`}>{errors.email}</span>
                    </div>
                    <div className="authorization__label">
                        <p className="authorization__text">Пароль</p>
                        <input value={values.password || ""} onChange={handleChange} type="password" name="password" placeholder="Пароль" className="authorization__input authorization__input_type_password" id="password-input" minLength="2" maxLength="200" required />
                        <span className={`authorization__text-error password-input-error ${errors.password ? "authorization__text-error_active" : ""}`}>{errors.password}</span>
                    </div>
                    <div className="authorization__button-label authorization__button-login">
                        <span className="authorization__button-error">{errorMessage}</span>
                        <button type="submit" className={`authorization__button ${!isValid ? "authorization__button_unworked" : ""}`}>Войти</button>
                    </div>
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