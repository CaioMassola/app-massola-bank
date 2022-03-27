import { DARK_MODE } from "./actionTypes";

type IDarkColor = {
    primary: string;
    secundary: string;
}

export const setDarkMode = (value: boolean) => ({
    type: DARK_MODE,
    payload: value,
});
