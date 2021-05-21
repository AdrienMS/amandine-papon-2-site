import { ServicesState, ServicesAction, SET_SERVICES, SET_DISPLAY, SET_CURRENT_INDEX, SET_MOBILE, SET_TICKING } from '../models/servicesTypes';
import * as CONSTANTS from '../models/constants';

const intialState: ServicesState = {
    services: null,
    loading: false,
    error: '',
    display: null,
    currentIndex: 0,
    mobile: false,
    ticking: false,
}

const servicesReducer = (state = intialState, action: ServicesAction) => {
    switch(action.type) {
        case SET_SERVICES:
            return {
                ...state,
                services: action.payload
            }
        case SET_DISPLAY:
            return {
                ...state,
                display: action.payload
            }
        case SET_CURRENT_INDEX:
            return {
                ...state,
                currentIndex: action.payload
            }
        case SET_MOBILE:
            return {
                ...state,
                mobile: action.payload
            }
        case SET_TICKING:
            return {
                ...state,
                ticking: action.payload
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

export default servicesReducer;