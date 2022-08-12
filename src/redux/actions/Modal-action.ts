import { CLOSE_MODAL } from "./actionTypes";

export const setCloseModalAction = (value: boolean) => ({
  type: CLOSE_MODAL,
  payload: value,
});
