import React from 'react';


function Techs() {
    return (
        <section className="techs">
            <h2 className="techs__header">Технологии</h2>
            <div className="techs__container">
                <h3 className="techs__title">7 технологий</h3>
                <p className="techs__about">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
            </div>
            <ul className="techs__list">
                <li className="techs__stack">HTML</li>
                <li className="techs__stack">CSS</li>
                <li className="techs__stack">JS</li>
                <li className="techs__stack">React</li>
                <li className="techs__stack">Git</li>
                <li className="techs__stack">Express.js</li>
                <li className="techs__stack">mongoDB</li>
            </ul>
        </section>
    )
}

export default Techs;