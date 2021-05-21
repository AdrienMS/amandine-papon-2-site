import { BannerState, BannerAction, SET_BANNER } from '../models/bannerTypes';
import * as CONSTANTS from '../models/constants';

const intialState: BannerState = {
    banner: null,
    loading: false,
    error: ''
}

const bannerReducer = (state = intialState, action: BannerAction) => {
    switch(action.type) {
        case SET_BANNER:
            return {
                ...state,
                banner: action.payload
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

export default bannerReducer;