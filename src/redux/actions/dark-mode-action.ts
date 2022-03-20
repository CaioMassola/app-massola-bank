import { DARK_MODE, DARK_MODE_COLOR } from "./actionTypes";

type IDarkColor = {
    primary: string;
    secundary: string;
}

export const setDarkMode = (value: boolean) => ({
    type: DARK_MODE,
    payload: value,
});

export const dark_mode_color = (value: IDarkColor) => ({
    type: DARK_MODE_COLOR,
    payload: value

});