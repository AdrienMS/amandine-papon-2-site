import { ThunkAction } from 'redux-thunk';

import * as CONSTANTS from '../models/constants';
import { AuthAction, SignInData } from '../models/authTypes';

import { RootState } from '..';
import firebase from '../../firebase/config';

export const setLoading = (value: boolean): ThunkAction<void, RootState, null, AuthAction> => {
    return dispatch => {
        dispatch({
            type: CONSTANTS.SET_LOADING,
            payload: value
        });
    }
}

export const setUser = (): ThunkAction<void, RootState, null, AuthAction> => {
    return dispatch => {
        dispatch({
            type: CONSTANTS.SET_USER,
            payload: { email: '' }
        });
    }
}

export const signin = (data: SignInData, onError: () => void): ThunkAction<void, RootState, null, AuthAction> => {
    return async dispatch => {
        try {
            dispatch(setLoading(true));
            const login = await firebase.auth().signInWithEmailAndPassword(data.email, data.password);
            if (login.user) {
                dispatch({
                    type: CONSTANTS.SET_USER,
                    payload: { email: data.email }
                });
                dispatch(setLoading(false));
            }
        } catch (err) {
            console.log(err);
            onError();
            dispatch(setError(err.message));
        }
    }
}

export const logout = (): ThunkAction<void, RootState, null, AuthAction> => {
    return async dispatch => {
        try {
            dispatch(setLoading(true));
            await firebase.auth().signOut();
            dispatch({
                type: CONSTANTS.SIGN_OUT
            });
            dispatch(setLoading(false));
        } catch (err) {
            console.log(err);
            dispatch(setLoading(false));
        }
    }
}

export const setError = (msg: string): ThunkAction<void, RootState, null, AuthAction> => {
    return dispatch => {
        dispatch({
            type: CONSTANTS.SET_ERROR,
            payload: msg
        });
    }
}

export const setSuccess = (msg: string): ThunkAction<void, RootState, null, AuthAction> => {
    return dispatch => {
      dispatch({
        type: CONSTANTS.SET_SUCCESS,
        payload: msg
      });
    }
}