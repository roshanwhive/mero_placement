// import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from '@reduxjs/toolkit';
import authReducer from '../features/auth/AuthSlice';
import formReducer from '../features/formData/FormSlice';
import jobCategoryReducer from '../features/job/JobSlice';
import companyReducer from '../features/company/CompanySlice';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

const authPersistConfig = {
  key: 'auth',
  storage: AsyncStorage,
};
const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  formOptions: formReducer,
  job: jobCategoryReducer,
  company: companyReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      // serializableCheck: {
      //   ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      // },
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
