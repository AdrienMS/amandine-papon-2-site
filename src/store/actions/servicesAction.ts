import { ThunkAction } from 'redux-thunk';

import * as CONSTANTS from '../models/constants';
import { ServicesAction, SET_SERVICES, SET_DISPLAY, ServiceDisplay, SET_CURRENT_INDEX, SET_MOBILE, SET_TICKING, Service, Services } from '../models/servicesTypes';

import { RootState } from '..';
import firebase from '../../firebase/config';

export const setLoading = (value: boolean): ThunkAction<void, RootState, null, ServicesAction> => {
    return dispatch => {
        dispatch({
            type: CONSTANTS.SET_LOADING,
            payload: value
        });
    }
}

export const getServices = (): ThunkAction<void, RootState, null, ServicesAction> => {
    return async dispatch => {
        try {
            dispatch(setLoading(true));
            firebase.database().ref('services/').on('value', (data: firebase.database.DataSnapshot) => {
                if (data.val()) {
                    dispatch({
                        type: SET_SERVICES,
                        payload: data.val()
                    });
                    dispatch(setLoading(false));
                }
            }, error => {
                dispatch(setError(error.message));
                dispatch(setLoading(false));
            });
        } catch (err) {
            dispatch(setLoading(false));
        }
    }
}

export const setServicesInformations = (services: Services, callback: (isSuccess: boolean) => void): ThunkAction<void, RootState, null, ServicesAction> => {
    return async dispatch => {
        try {
            dispatch(setLoading(true));
            await firebase.database().ref('services/').child('title').set(services.title);
            await firebase.database().ref('services/').child('subTitle').set(services.subTitle);
            dispatch(getServices());
            callback(true);
            dispatch(setLoading(false));
        } catch (err) {
            console.log(err);
            callback(false);
            dispatch(setLoading(false));
        }
    }
}

export const setSingleService = (service: Service, index: number, isNew: boolean, callback: (isSuccess: boolean) => void): ThunkAction<void, RootState, null, ServicesAction> => {
    return async dispatch => {
        try {
            dispatch(setLoading(true));
            if (isNew) {
                await firebase.database().ref('services/items/').push(service);
            } else {
                await firebase.database().ref('services/items/').child(index.toString()).set(service);
            }
            dispatch(getServices());
            callback(true);
            dispatch(setLoading(false));
        } catch (err) {
            console.log(err);
            callback(false);
            dispatch(setLoading(false));
        }
    }
}

export const deleteService = (index: number, callback: (isSuccess: boolean) => void): ThunkAction<void, RootState, null, ServicesAction> => {
    return async dispatch => {
        try {
            dispatch(setLoading(true));
            await firebase.database().ref('services/items/').child(index.toString()).remove();
            dispatch(getServices());
            callback(true);
            dispatch(setLoading(false));
        } catch (err) {
            console.log(err);
            callback(false);
            dispatch(setLoading(false));
        }
    }
}

export const setDisplay = (displays: Array<ServiceDisplay> | null): ThunkAction<void, RootState, null, ServicesAction> => {
    return dispatch => {
        dispatch({
            type: SET_DISPLAY,
            payload: displays
        });
    }
}

export const setCurrentIndex = (index: number): ThunkAction<void, RootState, null, ServicesAction> => {
    return dispatch => {
        dispatch({
            type: SET_CURRENT_INDEX,
            payload: index
        });
    }
}

export const setMobile = (mobile: boolean): ThunkAction<void, RootState, null, ServicesAction> => {
    return dispatch => {
        dispatch({
            type: SET_MOBILE,
            payload: mobile
        });
    }
}

export const setTicking = (ticking: boolean): ThunkAction<void, RootState, null, ServicesAction> => {
    return dispatch => {
        dispatch({
            type: SET_TICKING,
            payload: ticking
        });
    }
}

export const setError = (msg: string): ThunkAction<void, RootState, null, ServicesAction> => {
    return dispatch => {
        dispatch({
            type: CONSTANTS.SET_ERROR,
            payload: msg
        });
    }
}