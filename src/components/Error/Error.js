import React from 'react';
import { Link } from 'react-router-dom';

function Error() {
    return (
        <main className="error">
            <section className="error__container">
                <h1 className="error__title">404</h1>
                <h2 className="error__subtitle">Страница не найдена</h2>
                <Link to={-1} className="error__back">Назад</Link>
            </section>
        </main>
    )
}

export default Error;