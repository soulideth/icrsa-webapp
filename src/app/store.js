import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import Connect from '../features/Connect/Connect';



export default configureStore({
  reducer: {
    counter: counterReducer,
    MyValue: Connect,
  },
});
