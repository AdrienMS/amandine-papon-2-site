import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

import firebaseConfig from '../environment';

firebase.initializeApp(firebaseConfig);

export default firebase;