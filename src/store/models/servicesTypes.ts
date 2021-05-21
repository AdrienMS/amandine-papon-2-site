import * as CONSTANTS from './constants';
export const SET_SERVICES = 'SET_SERVICES';
export const SET_DISPLAY = 'SET_DISPLAY';
export const SET_CURRENT_INDEX = 'SET_CURRENT_INDEX';
export const SET_MOBILE = 'SET_MOBILE';
export const SET_TICKING = 'SET_TICKING';

export interface Service {
    name: string;
    desc: string;
    content: string;
    image: string;
}

export interface Services {
    title: string;
    subTitle: string;
    items: Array<Service>;
}

export interface ServiceDisplay {
  service: Service;
  isDown?: boolean;
  isUp?: boolean;
}

export interface ServicesState {
    services: Services | null;
    loading: boolean;
    error: string;
    display: Array<ServiceDisplay> | null;
    currentIndex: number;
    mobile: boolean;
    ticking: boolean;
}

interface SetServicesAction {
    type: typeof SET_SERVICES;
    payload: Services;
}

interface SetDisplayAction {
  type: typeof SET_DISPLAY;
  payload: Array<ServiceDisplay> | null;
}

interface SetCurrentIndexAction {
  type: typeof SET_CURRENT_INDEX;
  payload: number;
}

interface SetMobileAction {
  type: typeof SET_MOBILE;
  payload: boolean;
}

interface SetTickingAction {
  type: typeof SET_TICKING;
  payload: boolean;
}

interface SetLoadingAction {
  type: typeof CONSTANTS.SET_LOADING;
  payload: boolean;
}

interface SetErrorAction {
  type: typeof CONSTANTS.SET_ERROR;
  payload: string;
}

export type ServicesAction = SetServicesAction | SetDisplayAction | SetCurrentIndexAction | SetMobileAction | SetTickingAction | SetLoadingAction | SetErrorAction;