import * as CONSTANTS from './constants';

export interface User {
    email: string;
}

export interface AuthState {
    user: User | null;
    authenticated: boolean;
    loading: boolean;
    error: string;
    needVerification: boolean;
    success: string;
}

export interface SignUpData {
  firstName: string;
  email: string;
  password: string;
}

export interface SignInData {
  email: string;
  password: string;
}

// Actions
interface SetUserAction {
  type: typeof CONSTANTS.SET_USER;
  payload: User;
}

interface SetLoadingAction {
  type: typeof CONSTANTS.SET_LOADING;
  payload: boolean;
}

interface SignOutAction {
  type: typeof CONSTANTS.SIGN_OUT;
}

interface SetErrorAction {
  type: typeof CONSTANTS.SET_ERROR;
  payload: string;
}

interface NeedVerificationAction {
  type: typeof CONSTANTS.NEED_VERIFICATION;
}

interface SetSuccessAction {
  type: typeof CONSTANTS.SET_SUCCESS;
  payload: string;
}

export type AuthAction = SetUserAction | SetLoadingAction | SignOutAction | SetErrorAction | NeedVerificationAction | SetSuccessAction;