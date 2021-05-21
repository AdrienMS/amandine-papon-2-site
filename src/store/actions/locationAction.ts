import { ThunkAction } from 'redux-thunk';

import * as CONSTANTS from '../models/constants';
import { LocationAction, SET_LOCATION, SET_SIZE, Location } from '../models/locationTypes';

import { RootState } from '..';
import firebase from '../../firebase/config';

export const setLoading = (value: boolean): ThunkAction<void, RootState, null, LocationAction> => {
    return dispatch => {
        dispatch({
            type: CONSTANTS.SET_LOADING,
            payload: value
        });
    }
}

export const getLocation = (onError: () => void): ThunkAction<void, RootState, null, LocationAction> => {
    return async dispatch => {
        try {
            dispatch(setLoading(true));
            firebase.database().ref('location/').on('value', (data: firebase.database.DataSnapshot) => {
                if (data.val()) {
                    dispatch({
                        type: SET_LOCATION,
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

export const setSize = (size: number | undefined): ThunkAction<void, RootState, null, LocationAction> => {
    return dispatch => {
        dispatch({
            type: SET_SIZE,
            payload: size
        });
    }
}

export const setLocation = (location: Location, callback: (isSuccess: boolean) => void): ThunkAction<void, RootState, null, LocationAction> => {
    return async dispatch => {
        try {
            dispatch(setLoading(true));
            await firebase.database().ref('location/').set(location);
            dispatch(getLocation(() => {}));
            callback(true);
            dispatch(setLoading(false));
        } catch (err) {
            console.log(err);
            callback(false);
            dispatch(setLoading(false));
        }
    }
}

export const setError = (msg: string): ThunkAction<void, RootState, null, LocationAction> => {
    return dispatch => {
        dispatch({
            type: CONSTANTS.SET_ERROR,
            payload: msg
        });
    }
}

// export const setSuccess = (msg: string): ThunkAction<void, RootState, null, AuthAction> => {
//     return dispatch => {
//       dispatch({
//         type: CONSTANTS.SET_SUCCESS,
//         payload: msg
//       });
//     }
// }