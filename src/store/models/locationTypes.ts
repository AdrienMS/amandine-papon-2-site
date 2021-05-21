import * as CONSTANTS from './constants';
export const SET_LOCATION = 'SET_LOCATION';
export const SET_SIZE = 'SET_SIZE';

export interface Location {
    title: string;
    text: string| null;
}

export interface LocationState {
    location: Location | null;
    error: string;
    loading: boolean;
    size: number | undefined;
}

interface SetLocationAction {
  type: typeof SET_LOCATION;
  payload: Location;
}
interface SetSizeAction {
    type: typeof SET_SIZE;
    payload: number | undefined;
}

interface SetLoadingAction {
  type: typeof CONSTANTS.SET_LOADING;
  payload: boolean;
}

interface SetErrorAction {
  type: typeof CONSTANTS.SET_ERROR;
  payload: string;
}

export type LocationAction = SetLocationAction | SetSizeAction | SetLoadingAction | SetErrorAction;