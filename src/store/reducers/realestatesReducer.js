import {
  REALESTATES_FETCH_SUCCESS,
  REALESTATES_FETCH_FAIL
} from "../actions/types";

const INITIAL_STATE = {
  realestates: [],
  loading: true,
  error: "",
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case REALESTATES_FETCH_SUCCESS:
      return {
        ...state,
        realestates: action.payload,
        loading: false
      };
    case REALESTATES_FETCH_FAIL:
      return { ...state, error: "Realestatefetching Failed.", loading: false };
    default:
      return state;
  }
};
