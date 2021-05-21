import { ThunkAction } from 'redux-thunk';

import * as CONSTANTS from '../models/constants';
import { BannerAction, SET_BANNER, Banner } from '../models/bannerTypes';

import { RootState } from '..';
import firebase from '../../firebase/config';

export const setLoading = (value: boolean): ThunkAction<void, RootState, null, BannerAction> => {
    return dispatch => {
        dispatch({
            type: CONSTANTS.SET_LOADING,
            payload: value
        });
    }
}

export const getBanner = (onError: () => void): ThunkAction<void, RootState, null, BannerAction> => {
    return async dispatch => {
        try {
            dispatch(setLoading(true));
            firebase.database().ref('banner/').on('value', (data: firebase.database.DataSnapshot) => {
                if (data.val()) {
                    dispatch({
                        type: SET_BANNER,
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
            onError();
            dispatch(setError(err.message));
        }
    }
}

export const setBanner = (banner: Banner, callback: (isSuccess: boolean) => void): ThunkAction<void, RootState, null, BannerAction> => {
    return async dispatch => {
        try {
            dispatch(setLoading(true));
            await firebase.database().ref('banner/').set(banner);
            dispatch(getBanner(() => {}));
            callback(true);
            dispatch(setLoading(false));
        } catch (err) {
            console.log(err);
            callback(false);
            dispatch(setLoading(false));
        }
    }
}

export const setError = (msg: string): ThunkAction<void, RootState, null, BannerAction> => {
    return dispatch => {
        dispatch({
            type: CONSTANTS.SET_ERROR,
            payload: msg
        });
    }
}