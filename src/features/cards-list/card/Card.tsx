import React from "react";
import {CardsWithIdType} from "../cards-list-reducer";
import s from "./Card.module.scss";
import  "../../../assets/fonts/style.scss";

export const Card: React.FC<CardType> = ({cards, onClick}) => {
    return <>
        {cards.map((card) =>
            <div className={s.card_container} key={card.id}>
                <div className={s.card_container__name_category}>
                    <h2 className={s.card_container__category}>{card.category}</h2>
                    <span className={s.card_container__name}>{card.name}</span>
                </div>
                <div className={s.card_container__price_button}>
                    <span className={s.card_container__price}>
                        <span>$</span>{card.price}
                    </span>
                    <button className={s.card_container__button} onClick={() => onClick(card.id)}>BUY</button>
                </div>
            </div>
        )}
    </>
}

//types
type CardType = {
    cards: CardsWithIdType[],
    onClick: (id?: string) => void,
}