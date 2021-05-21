import * as CONSTANTS from './constants';
export const SET_COMPANIES = 'SET_COMPANIES';

export interface Company {
    image: string;
    link: string;
    name: string;
}

export interface Companies {
    title: string;
    items: Array<Company> | null;
}

export interface CompaniesState {
    companies: Companies | null;
    error: string;
    loading: boolean;
}

interface SetCompaniesAction {
    type: typeof SET_COMPANIES;
    payload: Companies;
}

interface SetLoadingAction {
  type: typeof CONSTANTS.SET_LOADING;
  payload: boolean;
}

interface SetErrorAction {
  type: typeof CONSTANTS.SET_ERROR;
  payload: string;
}

export type CompaniesAction = SetCompaniesAction | SetLoadingAction | SetErrorAction;