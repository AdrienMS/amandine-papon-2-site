import { CompaniesState, CompaniesAction, SET_COMPANIES } from '../models/companiesTypes';
import * as CONSTANTS from '../models/constants';

const intialState: CompaniesState = {
    companies: null,
    loading: false,
    error: ''
}

const companiesReducer = (state = intialState, action: CompaniesAction) => {
    switch(action.type) {
        case SET_COMPANIES:
            return {
                ...state,
                companies: action.payload
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

export default companiesReducer;