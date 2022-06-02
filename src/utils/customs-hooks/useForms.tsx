import React, {ChangeEvent, FocusEvent, useState} from "react";

export const useForms = (validate: (field: string, value: string) => string) => {
    //hook for onChange
    const [values, setValues] = useState({
        name: '',
        number: '',
    });
    //hooks for errors
    const [nameErr, setNameErr] = useState("");
    const [numberErr, setNumberErr] = useState("");
    //hooks for backLights
    const [blurNameErr, setBlurNameErr] = useState(false);
    const [blurNumberErr, setBlurNumberErr] = useState(false);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.currentTarget;
        if (blurNameErr) {
            setBlurNameErr(false);
            setNameErr("");
        }
        if (blurNumberErr) {
            setBlurNumberErr(false);
            setNumberErr("");
        }
        setValues({
            ...values,
            [name]: value
        });
    }

    const handleBlur = (e: FocusEvent<HTMLInputElement, Element>) => {
        switch (e.currentTarget.name) {
            case "name":
                setBlurNameErr(true);
                setNameErr(validate("name", e.currentTarget.value));
                break;
            case "number":
                setBlurNumberErr(true);
                setNumberErr(validate("number", e.currentTarget.value));
                break;
        }
    }

    const handleSubmit = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        setNameErr(validate("name", values.name));
        setNumberErr(validate("number", values.number));
        if (!nameErr && !numberErr) {
            if(!validate("name", values.name) && !validate("number", values.number))
            if (blurNameErr || blurNumberErr) {
                console.log(values);
            }
        }
    }


    const handleClear = (e: React.MouseEvent<HTMLElement>) => {
        const {id} = e.currentTarget;
        setValues({
            ...values,
            [id]: "",
        });
    }

    return {
        handleChange,
        handleBlur,
        handleSubmit,
        handleClear,
        values,
        nameErr,
        numberErr,
        blurNumberErr,
        blurNameErr,
    }
}
