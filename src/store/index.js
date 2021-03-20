import {configureStore} from '@reduxjs/toolkit';
import counterReducer from './models/counter';
import userReducer from './models/user';

export default configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
  },
});
