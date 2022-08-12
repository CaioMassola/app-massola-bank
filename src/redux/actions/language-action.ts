import { LANGUAGE } from "./actionTypes";

export type ILanguage = {
    id: number,
    language: string,
    surname: string,
    icon: string
}

export const setLanguageAction= (value: ILanguage) => ({
    type: LANGUAGE,
    payload: value,
});
