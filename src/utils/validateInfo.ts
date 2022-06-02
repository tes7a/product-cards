import {validators} from "./validators";

export const validateInfo = (field: string, value: string) => {
    //conditions for input validation are stored here,
    // if you need to add a new validation or condition, then write here

    //validators for name input
    if (field === "name") {
        if (!value.trim()) {
            return "This field in required";
        } else if (!validators.nameValidator.test(String(value).toLowerCase())) {
            return "Only letters allowed";
        }
    }

    //validators for number input
    if (field === "number") {
        if (!value.trim()) {
            return "This field in required";
        } else if (!validators.phoneValidator.test(String(value).toLowerCase())) {
            return "Only numbers allowed";
        } else if (value.length < 12) {
            return "Should contain 12 characters";
        }
    }

    return "";
}

