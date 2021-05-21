import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import aboutReducer from './reducers/aboutReducer';
import authReducer from './reducers/authReducer';
import bannerReducer from './reducers/bannerReducer';
import companiesReducer from './reducers/companiesReducer';
import imagesReducer from './reducers/imagesReducer';
import locationReducer from './reducers/locationReducer';
import servicesReducer from './reducers/servicesReducer';

const rootReducer = combineReducers({
  about: aboutReducer,
  auth: authReducer,
  banner: bannerReducer,
  companies: companiesReducer,
  images: imagesReducer,
  location: locationReducer,
  services: servicesReducer,
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export type RootState = ReturnType<typeof rootReducer>;

export default store;