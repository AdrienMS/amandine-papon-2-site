import * as CONSTANTS from './constants';
export const SET_IMAGES = 'SET_IMAGES';

export interface Image {
    full: string;
    pixelized: string;
    key: string;
}

export interface ImagesState {
    images: Array<Image> | null;
    error: string;
    loading: boolean;
}

interface SetImagesAction {
    type: typeof SET_IMAGES;
    payload: Array<Image>;
}

interface SetLoadingAction {
  type: typeof CONSTANTS.SET_LOADING;
  payload: boolean;
}

interface SetErrorAction {
  type: typeof CONSTANTS.SET_ERROR;
  payload: string;
}

export type ImagesAction = SetImagesAction | SetLoadingAction | SetErrorAction;