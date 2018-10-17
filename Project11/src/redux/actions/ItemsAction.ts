import * as types from '../constants/ActionTypes';

export const checkCredentials = (username: any, password: any) => ({
  type: types.GET_USER_API,
  username,
  password,
});

export const LoginSuccess = () => ({
  type: types.LOGIN_SUCCESS,
});

export const LoginFaied = () => ({
  type: types.LOGIN_FAILED,
});

export const itemsLoadSuccess = (options: any) => ({
  type: types.ITEMS_LOAD_SUCCESS,
  options,
});

export const itemsLoadFailed = (message: any) => ({
  type: types.ITEMS_LOAD_FAILED,
  message,
});

export const getPlanetsData = (url: any) => ({
  type: types.GET_PLANETS,
  url,
});

export const planetsLoadSuccess = (options: any) => ({
  type: types.PLANETS_LOAD_SUCCESS,
  options,
});

export const planetsLoadFailed = (message: any) => ({
  type: types.PLANETS_LOAD_FAILED,
  message,
});

