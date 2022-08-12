import { LANGUAGE} from "../actions/actionTypes";

type ILanguage = {
    id: number,
    language: string,
    surname: string,
    icon: string
}

type IAction = {
    type: string;
    payload: ILanguage
}

const initialState = {
    language_redux: null
}

const languageReducer = (state = initialState, action: IAction) => {
    const {payload} = action;


    switch(action.type) {
        case LANGUAGE: {
            return {
                ...state,
                language_redux: payload
            };
        }
        default: 
        return state;
    }
};

export default languageReducer;