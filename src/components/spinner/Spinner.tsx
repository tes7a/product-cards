import React, {useEffect} from "react";
import "./Spinner.scss";

export const Spinner = (props: {show: boolean}) => {
    //hide overflow
    useEffect(() => {
        if(!props.show){
            document.body.style.overflow = "hidden";
        }

        return  () => {
            document.body.style.overflow = "unset";
        }
    }, [props.show]);

    return(
        <div className={"loader"}>Loading...</div>
    )
}