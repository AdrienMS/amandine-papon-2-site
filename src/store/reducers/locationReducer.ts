import { LocationState, LocationAction, SET_LOCATION, SET_SIZE } from '../models/locationTypes';
import * as CONSTANTS from '../models/constants';

const intialState: LocationState = {
    location: null,
    loading: false,
    error: '',
    size: undefined,
}

const locationReducer = (state = intialState, action: LocationAction) => {
    switch(action.type) {
        case SET_LOCATION:
            return {
                ...state,
                location: action.payload
            }
        case SET_SIZE:
            return {
                ...state,
                size: action.payload
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

export default locationReducer;