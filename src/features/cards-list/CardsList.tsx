import React, {useEffect, useState} from "react";
import s from "./CardsList.module.scss";
import {
    CardsWithIdType,
    getCardsTC,
    modalDataType, RequestStatusType,
    selectedCardAC,
    selectedCheapestCardAC,
} from "./cards-list-reducer";
import {AppRootType, useAppDispatch} from "../../app/store";
import {useSelector} from "react-redux";
import {Spinner} from "../../components/spinner/Spinner";
import {ModalWindow} from "../../components/modal-window/ModalWindow";
import {Card} from "./card/Card";




export const CardsList = () => {
    //hooks and state
    const dispatch = useAppDispatch();
    const cards = useSelector<AppRootType, CardsWithIdType[]>(state => state.cards_list.cards);
    const data = useSelector<AppRootType, modalDataType>(state => state.cards_list.modalData);
    const status = useSelector<AppRootType, RequestStatusType>(state => state.cards_list.initialStatus);
    const [show, setShow] = useState(false);
    useEffect(() => {
        dispatch(getCardsTC());
    }, []);

    //functions onClick
    const selectedClickCard = (id?: string) => {
        if (id) {
            dispatch(selectedCardAC(id));
            setShow(true);
        }
    };
    const cheapestClickCard = () => {
        dispatch(selectedCheapestCardAC());
        setShow(true);

    }

    return (
        <>
            {status === "loading" && <Spinner show={show}/>}
            {status === "succeeded" && <div className={s.main__wrapper}>
            <div className={s.main_container}>
                <Card
                    onClick={selectedClickCard}
                    cards={cards}
                />
                {show && <ModalWindow
                    name={data.name}
                    category={data.category}
                    price={data.price}
                    show={show}
                    setShow={setShow}
                />}
            </div>
                <button className={s.main_container__button} onClick={cheapestClickCard}>
                <span>
                    Buy cheapest
                </span>
                </button>
            </div>}
        </>
    )
}