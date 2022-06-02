import s from "../components/modal-window/ModalWindow.module.scss";

export const getClassName = (
    {errName, value, blurErr}:{errName: string, value: string, blurErr: boolean,}
) => {
    let className = value;
    if(blurErr && !errName){
        className += ` ${s.modal__input_valid}`
    }else if(errName){
        className += ` ${s.modal__input_error}`
    }

    return className;
}