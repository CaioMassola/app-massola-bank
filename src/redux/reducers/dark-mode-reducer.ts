import { DARK_MODE} from "../actions/actionTypes";

type IAction = {
    type: string;
    payload: boolean
}

const initialState = {
    dark_mode: false
}

const darkModeReducer = (state = initialState, action: IAction) => {
    const {payload} = action;

    switch(action.type) {
        case DARK_MODE: {
            return {
                ...state,
                dark_mode: payload
            };
        }
        default: 
        return state;
    }
};

export default darkModeReducer;