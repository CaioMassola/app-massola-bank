import { CLOSE_MODAL } from "../actions/actionTypes";

type IAction = {
  type: string;
  payload: boolean;
};

const initialState = {
  close: false,
};

const modalReducer = (state = initialState, action: IAction) => {
  const { payload } = action;

  switch (action.type) {
    case CLOSE_MODAL: {
      return {
        ...state,
        close: payload,
      };
    }
    default:
      return state;
  }
};

export default modalReducer;
