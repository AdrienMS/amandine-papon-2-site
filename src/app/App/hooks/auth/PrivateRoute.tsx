import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Redirect, RouteProps } from 'react-router-dom';

import firebase from '../../../../firebase/config';

import { RootState } from '../../../../store';
import { setLoading } from '../../../../store/actions/aboutAction';
import { setUser } from '../../../../store/actions/authAction';
import * as ROUTES from '../../../constants/routes';

interface Props extends RouteProps {
    component: any;
}

const PrivateRoute: FC<Props> = ({ component: Component, ...rest }) => {
    const dispatch = useDispatch();
    const { authenticated } = useSelector((state: RootState) => state.auth);
    
    useEffect(() => {
        dispatch(setLoading(true));
        const unsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
        if (!authenticated && user) {
            dispatch(setUser());
        }
        dispatch(setLoading(false));
        });

        return () => {
        unsubscribe();
        };
  }, [authenticated, dispatch]);

    return (
        <Route {...rest} render={props => authenticated ? <Component {...props} /> : <Redirect to={ROUTES.LOGIN} />} />
    );
}

export default PrivateRoute;