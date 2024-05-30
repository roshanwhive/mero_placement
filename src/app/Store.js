// import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from '@reduxjs/toolkit';
import authReducer from '../features/auth/AuthSlice';
import loginReducer from '../features/auth/authSlice/loginSlice'
import logoutReducer from '../features/auth/authSlice/logoutSlice'
import registerReducer from '../features/auth/authSlice/registerSlice'
import userProfileReducer from '../features/auth/authSlice/userProfileSlice'
import updateAccountReducer from '../features/auth/authSlice/updateAccountSlice'
import formReducer from '../features/formData/FormSlice';
import jobCategoryReducer from '../features/job/JobSlice';
import companyReducer from '../features/company/CompanySlice';
import statusReducer from '../features/status/StatusSlice';
import jobApplyReducer from '../features/applyJob/applyJobSlice';
import addEducationReducer from '../features/profile/educationSlice/addEducationSlice';
import getAllEducationReducer from '../features/profile/educationSlice/getAllEducationSlice'
import getSingleEducationReducer from '../features/profile/educationSlice/getSingleEducationSlice';
//import deleteEducationReducer from '../features/profile/educationSlice/deleteEducationSlice';
import updateEducationReducer from '../features/profile/educationSlice/updateEducationSlice';
import addExperienceReducer from '../features/profile/experienceSlice/addExperienceSlice';
import getAllExperienceReducer from '../features/profile/experienceSlice/getAllExperienceSlice';
import getSingleExperienceReducer from '../features/profile/experienceSlice/getSingleExperienceSlice';
import deleteExperienceReducer from '../features/profile/experienceSlice/deleteExperienceSlice';
import updateExperienceReducer from '../features/profile/experienceSlice/updateExperienceSlice';
import addPreferenceReducer from '../features/profile/preferenceSlice/addPreferenceSlice';
import getAllPreferenceReducer from '../features/profile/preferenceSlice/getAllPreferenceSlice';
import getSinglePreferenceReducer from '../features/profile/preferenceSlice/getSinglePreferenceSlice';
import deletePreferenceReducer from '../features/profile/preferenceSlice/deletePreferenceSlice';
import updatePreferenceReducer from '../features/profile/preferenceSlice/updatePreferenceSlice';
import getAllTrainingReducer from '../features/training/getAllTrainingSlice';
import getSingleTrainingReducer from '../features/training/getSingleTrainingSlice';

import educationSliceReducer from '../features/profile/testSlice/EducationSlice';

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
const formOptionsPersistConfig = {
  key: 'formOptions',
  storage: AsyncStorage,
};
const rootReducer = combineReducers({
  // auth: persistReducer(authPersistConfig, authReducer),
  register:registerReducer,
  login:persistReducer(authPersistConfig, loginReducer),
  updateAccount:updateAccountReducer,
  userProfile:persistReducer(authPersistConfig, userProfileReducer),
  logout:logoutReducer,
  formOptions: persistReducer(formOptionsPersistConfig, formReducer),
  job: jobCategoryReducer,
  company: companyReducer,
  status: statusReducer,
  jobApply: jobApplyReducer,
  addEducation: addEducationReducer,
  //deleteEducation: deleteEducationReducer,
  getAllEducation: getAllEducationReducer,
  getSingleEducation: getSingleEducationReducer,
  updateEducation: updateEducationReducer,
  addExperience:addExperienceReducer,
  deleteExperience: deleteExperienceReducer,
  getAllExperience:getAllExperienceReducer,
  getSingleExperience: getSingleExperienceReducer,
  updateExperience:updateExperienceReducer,
  addPreference:addPreferenceReducer,
  deletePreference:deletePreferenceReducer,
  getAllPreference:getAllPreferenceReducer,
  getSinglePreference:getSinglePreferenceReducer,
  updatePreference:updatePreferenceReducer,
  singleTraining: getSingleTrainingReducer,
  getAllTraining: getAllTrainingReducer,



  educationTest:educationSliceReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      // serializableCheck: {
      //   ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      // },
      immutableCheck: false,
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
