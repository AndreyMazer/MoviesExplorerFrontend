import React from 'react';
import avatarImage from '../../images/vitalya.jpg'


function AboutMe() {
    return (
        <section className="aboutme">
            <h2 className="aboutme__header">Студент</h2>
            <div className="aboutme__container">
                <div className="aboutme__info">
                    <h3 className="aboutme__title">Виталий</h3>
                    <p className="aboutme__subtitle">Фронтенд-разработчик, 30 лет</p>
                    <p className="aboutme__bio">Я&nbsp;родился и&nbsp;живу в&nbsp;Саратове,
                        закончил факультет экономики СГУ. У&nbsp;меня есть жена
                        и&nbsp;дочь. Я&nbsp;люблю слушать музыку, а&nbsp;ещё увлекаюсь бегом.
                        Недавно начал кодить. С&nbsp;2015 года работал в&nbsp;компании &laquo;СКБ Контур&raquo;.
                        После того, как прошёл курс по&nbsp;веб-разработке,
                        начал заниматься фриланс-заказами и&nbsp;ушёл с&nbsp;постоянной работы.</p>
                    <a className="aboutme__link" href="https://github.com/AndreyMazer" rel="noreferrer" target="_blank">Github</a>
                </div>
                <img src={avatarImage} className="aboutme__avatar" alt="Виталя" />
            </div>
        </section>
    )
}

export default AboutMe;