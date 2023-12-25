import React from 'react';
import { Link } from 'react-router-dom';
import data from '../../utils/constants';

function Profile() {

    return (
        <main className="profile">
            <section className="profile__container">
                <h2 className="profile__title">Привет, {data.name}!</h2>
                <form className="profile__form">
                    <div className="profile__label">
                        <p className="profile__text">Имя</p>
                        <input value={data.name} type="text" placeholder="Имя" className="profile__input profile__input_type_name" id="name-input" required />

                    </div>
                    <div className="profile__label">
                        <p className="profile__text">E-mail</p>
                        <input value={data.email} type="email" placeholder="Email" className="profile__input profile__input_type_email" id="email-input" required />
                    </div>
                </form>
                <button type="submit" className="profile__change">Редактировать</button>
                <Link to="/" className="profile__logout">
                    <p className="profile__link">Выйти из аккаунта</p>
                </Link>
            </section>
        </main>
    )
}

export default Profile;