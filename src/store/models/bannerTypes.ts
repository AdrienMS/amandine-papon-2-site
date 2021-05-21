import * as CONSTANTS from './constants';
export const SET_BANNER = 'SET_BANNER';

export interface Banner {
    title: string;
    subTitle: string;
    subSubTitle: string;
    image: string;
}

export interface BannerState {
    banner: Banner | null;
    error: string;
    loading: boolean;
}

interface SetBannerAction {
    type: typeof SET_BANNER;
    payload: Banner;
}

interface SetLoadingAction {
  type: typeof CONSTANTS.SET_LOADING;
  payload: boolean;
}

interface SetErrorAction {
  type: typeof CONSTANTS.SET_ERROR;
  payload: string;
}

export type BannerAction = SetBannerAction | SetLoadingAction | SetErrorAction;