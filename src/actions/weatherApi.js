import { create } from 'apisauce';
import { GET_WEATHER_DATA,
        GET_WEATHER_DATA_FAILED,
        GET_CITY_NAME,
        GET_CITY_NAME_FAILED } from "./types";

const api2 = create({
  baseURL: 'http://api.openweathermap.org/geo/1.0/',
  headers: { Accept: 'application/vnd.github.v3+json' },
});

export const getCityName = (latitude, longitude) => async(dispatch) => {
    try {
         const res = await api2.get(
            `reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=1f00cccbdf22d59d0a08748a65ec6a2e`,
            );
            dispatch({
              type: GET_CITY_NAME,
              payload: res.data,
            });
        } catch (error) {
            dispatch({
              type: GET_CITY_NAME_FAILED,
            });
          }
};

const api = create({
  baseURL: 'https://api.openweathermap.org/data/2.5/',
  headers: { Accept: 'application/vnd.github.v3+json' },
});

export const getWeatherData = (latitude, longitude) => async (dispatch) => {
  try {
    const res = await api.get(
    //   `onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly&appid=1f00cccbdf22d59d0a08748a65ec6a2e`,
      `onecall?lat=${latitude}&lon=${longitude}&exclude=minutely,hourly&appid=1f00cccbdf22d59d0a08748a65ec6a2e&units=metric`,
    );
    dispatch({
      type: GET_WEATHER_DATA,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_WEATHER_DATA_FAILED,
    });
  }
};

