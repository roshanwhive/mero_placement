// import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from '@reduxjs/toolkit';
import authReducer from '../features/auth/AuthSlice';
import loginReducer from '../features/auth/authSlice/loginSlice'
import forgotPasswordReducer from '../features/auth/forgotPassword/forgotPasswordSlice'
import setNewPasswordReducer from '../features/auth/forgotPassword/setnewPasswordSlice'
import verifyOTPReducer from '../features/auth/forgotPassword/verifyOtpSlice'
import resendOTPReducer from '../features/auth/forgotPassword/resendOTpSlice'

import logoutReducer from '../features/auth/authSlice/logoutSlice'
import registerReducer from '../features/auth/authSlice/registerSlice'
import userProfileReducer from '../features/auth/authSlice/userProfileSlice'
import updateAccountReducer from '../features/auth/authSlice/updateAccountSlice'
import formReducer from '../features/formData/FormSlice';
import jobCategoryReducer from '../features/job/JobSlice';
import companyReducer from '../features/company/CompanySlice';
import statusReducer from '../features/status/StatusSlice';
import jobApplyReducer from '../features/applyJob/applyJobSlice';

import getSingleEducationReducer from '../features/profile/educationSlice/getSingleEducationSlice';
import getSingleExperienceReducer from '../features/profile/experienceSlice/getSingleExperienceSlice';
import getSinglePreferenceReducer from '../features/profile/preferenceSlice/getSinglePreferenceSlice';

import getAllTrainingReducer from '../features/training/getAllTrainingSlice';
import getSingleTrainingReducer from '../features/training/getSingleTrainingSlice';
import trainingInquiryReducer from '../features/training/postTrainingInquirySlice';
import educationSliceReducer from '../features/profile/testSlice/EducationSlice';
import preferenceSliceReducer from '../features/profile/testSlice/PreferenceSlice';
import experienceSliceReducer from '../features/profile/testSlice/ExperienceSlice';

import searchSliceReducer from '../features/search/SearchJobSlice';

import getAllContentReducer from '../features/content/AllContentSlice';
import getSingleContentReducer from '../features/content/singleContentSlice';
import getSliderImageReducer from '../features/slider/SliderSlice';
import getContentHotJobreducer from '../features/content/hotjobSlice';
import getContentTrainingReducer  from '../features/content/trainingContentSlice'
import getContentTopJobReducer from '../features/content/topJobSlice'
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
  key: 'login',
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

  forgotPassword:forgotPasswordReducer,
  setNewPassword:setNewPasswordReducer,
  verifyotp:verifyOTPReducer,
  resendotp:resendOTPReducer,
 // logout:logoutReducer,
  formOptions: persistReducer(formOptionsPersistConfig, formReducer),
  job: jobCategoryReducer,
  company: companyReducer,
  status: statusReducer,
  jobApply: jobApplyReducer,
  getSingleEducation: getSingleEducationReducer,
  getSingleExperience: getSingleExperienceReducer,
  getSinglePreference:getSinglePreferenceReducer,

  singleTraining: getSingleTrainingReducer,
  getAllTraining: getAllTrainingReducer,
  trainingInquiry:trainingInquiryReducer,
  //addEducation: addEducationReducer,
  //deleteEducation: deleteEducationReducer,
 // getAllEducation: getAllEducationReducer,
  //updateEducation: updateEducationReducer,
  ///addExperience:addExperienceReducer,
  //deleteExperience: deleteExperienceReducer,
  //getAllExperience:getAllExperienceReducer,
  //updateExperience:updateExperienceReducer,
  //addPreference:addPreferenceReducer,
  //deletePreference:deletePreferenceReducer,
  //getAllPreference:getAllPreferenceReducer,
  //updatePreference:updatePreferenceReducer,
 
  educationTest:educationSliceReducer,
  preferenceTest:preferenceSliceReducer,
  experienceTest:experienceSliceReducer,

  searchJob:searchSliceReducer,
  sliderImage:getSliderImageReducer,

  getAllContent: getAllContentReducer,
  getSingleContent:getSingleContentReducer,
  getContentHotJob: getContentHotJobreducer,
  getContentTraining:getContentTrainingReducer,
  getContentTopJob:getContentTopJobReducer,

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
