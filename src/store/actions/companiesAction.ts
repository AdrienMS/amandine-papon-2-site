import { ThunkAction } from 'redux-thunk';

import * as CONSTANTS from '../models/constants';
import { Companies, CompaniesAction, SET_COMPANIES } from '../models/companiesTypes';

import { RootState } from '..';
import firebase from '../../firebase/config';

export const setLoading = (value: boolean): ThunkAction<void, RootState, null, CompaniesAction> => {
    return dispatch => {
        dispatch({
            type: CONSTANTS.SET_LOADING,
            payload: value
        });
    }
}

export const getCompanies = (onError: () => void): ThunkAction<void, RootState, null, CompaniesAction> => {
    return async dispatch => {
        try {
            dispatch(setLoading(true));
            firebase.database().ref('companies/').on('value', (data: firebase.database.DataSnapshot) => {
                if (data.val()) {
                    dispatch({
                        type: SET_COMPANIES,
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

export const setCompanies = (companies: Companies, callback: (isSuccess: boolean) => void): ThunkAction<void, RootState, null, CompaniesAction> => {
    return async dispatch => {
        try {
            dispatch(setLoading(true));
            await firebase.database().ref('companies/').set(companies);
            dispatch(getCompanies(() => {}));
            callback(true);
            dispatch(setLoading(false));
        } catch (err) {
            console.log(err);
            callback(false);
            dispatch(setLoading(false));
        }
    }
}

export const setError = (msg: string): ThunkAction<void, RootState, null, CompaniesAction> => {
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