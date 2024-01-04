import React from 'react';

function AboutProject() {
    return (
        <section className="aboutproject" id="about-project">
            <h2 className="aboutproject__header">О проекте</h2>
            <div className="aboutproject__container">
                <div className="aboutproject__about">
                    <h3 className="aboutproject__title">Дипломный проект включал 5 этапов</h3>
                    <p className="aboutproject__subtitle">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
                </div>
                <div className="aboutproject__about">
                    <h3 className="aboutproject__title">На выполнение диплома ушло 5 недель</h3>
                    <p className="aboutproject__subtitle">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
                </div>
            </div>

            <div className="aboutproject__week">
                <h4 className="aboutproject__backend">1 неделя</h4>
                <h4 className="aboutproject__frontend">4 неделя</h4>
            </div>
            <div className="aboutproject__week">
                <h4 className="aboutproject__text">Back-end</h4>
                <h4 className="aboutproject__text">Front-end</h4>
            </div>
        </section>
    )
}

export default AboutProject;