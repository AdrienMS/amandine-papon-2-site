import { AuthAction, AuthState } from '../models/authTypes';
import * as CONSTANTS from '../models/constants';

const initialState: AuthState = {
    user: null,
    authenticated: false,
    loading: false,
    error: '',
    needVerification: false,
    success: ''
}

const authReducer = (state = initialState, action: AuthAction) => {
    switch(action.type) {
        case CONSTANTS.SET_USER:
            return {
                ...state,
                user: action.payload,
                authenticated: true
            }
        case CONSTANTS.SET_LOADING:
            return {
                ...state,
                loading: action.payload
            }
        case CONSTANTS.SIGN_OUT:
            return {
                ...state,
                user: null,
                authenticated: false,
                loading: false
            }
        case CONSTANTS.SET_ERROR:
            return {
                ...state,
                error: action.payload
            }
        case CONSTANTS.SET_SUCCESS:
            return {
                ...state,
                success: action.payload
            }
        default:
            return state;
    }
}

export default authReducer;