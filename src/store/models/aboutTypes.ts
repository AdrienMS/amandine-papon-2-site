import * as CONSTANTS from './constants';
export const SET_ABOUT = 'SET_ABOUT';

export interface About {
    title: string;
    subTitle: string;
    text: string;
    profil: string;
    background: string;
}

export interface AboutState {
    about: About | null;
    loading: boolean;
    error: string;
}

interface SetAboutAction {
    type: typeof SET_ABOUT;
    payload: About;
}

interface SetLoadingAction {
  type: typeof CONSTANTS.SET_LOADING;
  payload: boolean;
}

interface SetErrorAction {
  type: typeof CONSTANTS.SET_ERROR;
  payload: string;
}

export type AboutAction = SetAboutAction | SetLoadingAction | SetErrorAction;