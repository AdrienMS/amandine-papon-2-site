import { ThunkAction } from 'redux-thunk';

import * as CONSTANTS from '../models/constants';
import { About, AboutAction, SET_ABOUT } from '../models/aboutTypes';

import { RootState } from '..';
import firebase from '../../firebase/config';

export const setLoading = (value: boolean): ThunkAction<void, RootState, null, AboutAction> => {
    return dispatch => {
        dispatch({
            type: CONSTANTS.SET_LOADING,
            payload: value
        });
    }
}

export const getAbout = (isCalled?: boolean): ThunkAction<void, RootState, null, AboutAction> => {
    return async dispatch => {
        try {
            dispatch(setLoading(true));
            firebase.database().ref('about/').on('value', (data: firebase.database.DataSnapshot) => {
                if (data.val()) {
                    dispatch({
                        type: SET_ABOUT,
                        payload: data.val()
                    });
                    dispatch(setLoading(false));
                }
            }, error => {
                dispatch(setError(error.message));
                dispatch(setLoading(false));
            });
        } catch (err) {
            console.log(err);
            dispatch(setError(err));
            dispatch(setLoading(false));
        }
    }
}

export const setAbout = (about: About, callback: (isSuccess: boolean) => void): ThunkAction<void, RootState, null, AboutAction> => {
    return async dispatch => {
        try {
            dispatch(setLoading(true));
            await firebase.database().ref('about/').set(about);
            dispatch(getAbout());
            callback(true);
            dispatch(setLoading(false));
        } catch (err) {
            console.log(err);
            callback(false);
            dispatch(setLoading(false));
        }
    }
}

export const setError = (msg: string): ThunkAction<void, RootState, null, AboutAction> => {
    return dispatch => {
        dispatch({
            type: CONSTANTS.SET_ERROR,
            payload: msg
        });
    }
}