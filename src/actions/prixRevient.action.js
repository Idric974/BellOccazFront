export const GET_PRIXREVIENT = 'GET_PRIXREVIENT';
export const ADD_PRIXREVIENT = 'ADD_PRIXREVIENT';

export const getPrixRevient = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: GET_PRIXREVIENT, payload: data });
    } catch (err) {
      return console.log(err);
    }
  };
};

export const addPrixRevient = (data) => {
  return async (dispatch) => {
    try {
      dispatch({ type: ADD_PRIXREVIENT, payload: data });
    } catch (err) {
      return console.log(err);
    }
  };
};
