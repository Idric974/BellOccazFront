import { GET_PRIXREVIENT } from '../actions/prixRevient.action';

const initialState = {};

export default function prixRevientReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PRIXREVIENT:
      return action.payload;

    default:
      return state;
  }
}
