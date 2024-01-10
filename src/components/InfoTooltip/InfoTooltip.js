import React from 'react';
import okPic from "../../images/galka.svg";
import errorPic from "../../images/neverno.svg";

function InfoTooltip(props) {
    return (
        <div className={`popup ${props.isOpen ? 'popup_opened' : ''}`}>
            <div className="popup__infotooltip">
                <img className="popup__regImage" src={props.status ? okPic : errorPic} alt="результат" />
                <h2 className="popup__feedback">{props.status ? props.succes : "Что-то пошло не так... Повоторите попытку снова"}</h2>
                <button onClick={props.onClose} type="button" className="popup__close-button" aria-label="Закрыть"></button>
            </div>
        </div>
    )
}

export default InfoTooltip;


