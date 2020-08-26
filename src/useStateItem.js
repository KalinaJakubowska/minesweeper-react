import { useState, useEffect } from "react";

export const useStateItem = (keyName, initialValue) => {
    const getInitialState = () => {
        if (localStorage.getItem(keyName) === null) {
            return initialValue;
        }
        return JSON.parse(localStorage.getItem(keyName));
    };

    const [state, setState] = useState(getInitialState);

    useEffect(() => {
        localStorage.setItem(keyName, JSON.stringify(state));
    }, [state]);

    return [state, setState];
};
