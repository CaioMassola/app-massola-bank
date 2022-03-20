import { DARK_MODE, DARK_MODE_COLOR } from "../actions/actionTypes";

type IAction = {
    type: string;
    payload: boolean
}

const initialState = {
    dark_mode: false
}

const darkModeReducer = (state = initialState, action: IAction) => {
    const {payload} = action;

    // console.log('here', payload)

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