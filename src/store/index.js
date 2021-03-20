import {configureStore} from '@reduxjs/toolkit';
import counterReducer from './models/counter';

export default configureStore({
  reducer: {
    counter: counterReducer,
  },
});
