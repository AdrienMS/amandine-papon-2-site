import { AboutState, AboutAction, SET_ABOUT } from '../models/aboutTypes';
import * as CONSTANTS from '../models/constants';

const intialState: AboutState = {
    about: null,
    loading: false,
    error: ''
}

const aboutReducer = (state = intialState, action: AboutAction) => {
    switch(action.type) {
        case SET_ABOUT:
            return {
                ...state,
                about: action.payload
            }
        case CONSTANTS.SET_LOADING:
            return {
                ...state,
                loading: action.payload
            }
        case CONSTANTS.SET_ERROR:
            return {
                ...state,
                error: action.payload
            }
        default:
            return state;
    }
}

export default aboutReducer;