import React, { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import './style.scss';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

// import firebase from '../../firebase/config';

import Home from '../Home/home';
import Services from '../Services';
import Header from '../../features/Header';
import Footer from '../../features/Footer';
import Login from '../Login';
import Admin from '../Admin/admin';

import PrivateRoute from './hooks/auth/PrivateRoute';
import PublicRoute from './hooks/auth/PublicRoute';

import * as ROUTES from '../constants/routes';

// import { setLoading, setUser } from '../../store/actions/authAction';
import { getImages } from '../../store/actions/imagesAction';
import { getServices } from '../../store/actions/servicesAction';
// import { RootState } from '../../store';

const App: FC = () => {
  const dispatch = useDispatch();
  // const { authenticated, loading } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    dispatch(getImages(() => console.log('error on load images')));
    dispatch(getServices());
  }, [dispatch]);

  // if(loading) {
  // }

  return (
    <Router>
      <Switch>

        <PrivateRoute exact path={`${ROUTES.ADMIN}/:path?`} component={Admin} />

        <Route path={ROUTES.HOME} exact>
          <Header />
          <Route exact path={ROUTES.HOME} component={Home} />
          <Footer />
        </Route>

        <Route>
          <Header isFixed={true} />
          <Route exact path={ROUTES.SERVICES} component={Services} />
          <PublicRoute exact path={ROUTES.LOGIN} component={Login} />
        </Route>

      </Switch>
    </Router>
  );
}

export default App;
