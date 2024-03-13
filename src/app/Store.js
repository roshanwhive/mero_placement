import {combineReducers, configureStore} from '@reduxjs/toolkit';
import authReducer from '../features/auth/AuthSlice';
import formReducer from '../features/formData/FormSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  formOptions: formReducer,
});
export const store = configureStore({
  reducer: rootReducer,
});
