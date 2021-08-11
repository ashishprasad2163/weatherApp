import { GET_WEATHER_DATA, GET_WEATHER_DATA_FAILED, GET_CITY_NAME, GET_CITY_NAME_FAILED } from '../actions/types';

const initialState = {
  loading: true,
  wdata: [],
  cityName: '',
};

export default function (state = initialState, action) {
  const {type, payload} = action;

  switch (type) {
    case GET_WEATHER_DATA:
      return {
        ...state,
        wdata: payload,
        loading: false,
      };
    case GET_WEATHER_DATA_FAILED:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case GET_CITY_NAME:
        return {
            ...state,
            cityName: payload,
            loading: false,
        };
    case GET_CITY_NAME_FAILED:
        return {
            ...state,
            error: payload,
            loading: false,
        };
    default:
      return state;
  }
};