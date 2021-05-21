import { ImagesState, ImagesAction, SET_IMAGES } from '../models/imagesTypes';
import * as CONSTANTS from '../models/constants';

const intialState: ImagesState = {
    images: null,
    loading: false,
    error: ''
}

const imagesReducer = (state = intialState, action: ImagesAction) => {
    switch(action.type) {
        case SET_IMAGES:
            return {
                ...state,
                images: action.payload
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

export default imagesReducer;