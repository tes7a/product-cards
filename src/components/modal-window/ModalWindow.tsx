import React, {useEffect} from "react";
import s from "./ModalWindow.module.scss";
import "../../assets/fonts/style.scss";
import {useForms} from "../../utils/customs-hooks/useForms";
import {validateInfo} from "../../utils/validateInfo";
import {getClassName} from "../../utils/get-class-name";

export const ModalWindow: React.FC<ModalWindowType> = (
    {name, category, price,show, setShow}
) => {
    //hooks
    const {
        handleBlur,
        handleChange,
        handleSubmit,
        handleClear,
        values,
        nameErr,
        numberErr,
        blurNameErr,
        blurNumberErr,
    } = useForms(validateInfo);

    //onClick
    const closeSelectCard = () => {
        setShow(false);
    };


    //hide overflow
    useEffect(() => {
        if(show){
            document.body.style.overflow = "hidden";
        }

        return  () => {
            document.body.style.overflow = "unset";
        }
    }, [show]);

    return (
        <div className={s.modal}>
            <div className={s.modal__container}>
                <a className={`${s.modal__close_button} _icon-x-black`} onClick={closeSelectCard}></a>
                <div className={s.modal__data_container}>
                    <h2 className={s.modal__category}>{category}</h2>
                    <span className={s.modal__name}>{name}</span>
                    <span className={s.modal__price}>
                        <span>$</span>{price}
                    </span>
                </div>
                <form className={s.modal__form}>
                    <div className={s.modal__name_container}>
                        <input
                            className={getClassName({
                                errName: nameErr,
                                value: s.modal__input,
                                blurErr: blurNameErr,
                            })}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            name={"name"}
                            type={"text"}
                            placeholder={"Name"}
                            value={values.name}
                        />
                        {(nameErr && blurNameErr) && <span className={s.modal__error}>{nameErr}</span>}
                        {(nameErr && blurNameErr) &&
                            <a id={"name"} className={`${s.modal__name_reset} _icon-x`} onClick={handleClear}></a>}
                    </div>
                    <div className={s.modal__name_container}>
                        <input
                            className={
                                getClassName({
                                    errName: numberErr,
                                    value: s.modal__input,
                                    blurErr: blurNumberErr,
                                })}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            name={"number"}
                            type="text"
                            placeholder={"Number"}
                            value={values.number}
                        />
                        {(numberErr && blurNumberErr) && <span className={s.modal__error}>{numberErr}</span>}
                        {(numberErr && blurNumberErr) &&
                            <a id={"number"} className={`${s.modal__phone_reset} _icon-x`} onClick={handleClear}></a>}
                    </div>
                    <button onClick={handleSubmit} className={s.modal__form__submit_button}>
                        <span>Order</span>
                    </button>
                </form>
            </div>
        </div>
    )
}

//types
type ModalWindowType = {
    name: string,
    category: string,
    price: number,
    setShow: (value: boolean) => void,
    show: boolean,
}