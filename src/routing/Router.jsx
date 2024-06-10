import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../screens/HomeScreen/Home';
import Login from '../screens/AuthScreen/Login/Login';
import Signup from '../screens/AuthScreen/Signup/Signup';
import ForgotPaasword_AcountRecover from '../screens/AuthScreen/ForgotPassword/ForgotPassword_AcountRecover';
import ForgotPasword_EnterOtp from '../screens/AuthScreen/ForgotPassword/ForgotPasword_EnterOtp';
import ForgotPassword_ChoosePassword from '../screens/AuthScreen/ForgotPassword/ForgotPassword_ChoosePassword';
import ForgotPassword_EnterEmail from '../screens/AuthScreen/ForgotPassword/ForgotPassword_EnterEmail';
import WelcomeScreen from '../screens/StartScreens/WelcomeScreen';
import BottomTab from '../containers/BottomTab';
import SeeAllJobs from '../screens/JobScreens/SeeAllJobs';
import TotalJobs from '../containers/TotalJobs';
import EditProfile from '../screens/ProfileScreen/EditProfile';
import EmailVerification from '../screens/AuthScreen/Signup/EmailVerification';
import JobDetail from '../screens/JobScreens/JobDetail';
import CompanyProfile from '../screens/ProfileScreen/CompanyProfile';
import CompareJobAndProfile from '../screens/JobScreens/CompareJobAndProfile';
import EmailVerified from '../screens/AuthScreen/Signup/EmailVerified';
import AllCategoriesScreen from '../screens/categories/AllCategoriesScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ProfilePreview from '../containers/profile/ProfilePreview';
import UpdateProfile from '../containers/profile/UpdateProfile';
import EducationAdd from '../screens/BottomNavigationScreen/profile/education/EducationAdd';
import PreferenceList from '../screens/BottomNavigationScreen/profile/preference/PreferenceList';
import PreferenceAdd from '../screens/BottomNavigationScreen/profile/preference/PreferenceAdd';
import ExperienceAdd from '../screens/BottomNavigationScreen/profile/experience/ExperienceAdd';
import ExperienceList from '../screens/BottomNavigationScreen/profile/experience/ExperienceList';
import EducationList from '../screens/BottomNavigationScreen/profile/education/EducationList';
import Datepicker from '../screens/BottomNavigationScreen/profile/experience/Datepicker';
import TrainingList from '../containers/TrainingList';
import Training from '../screens/Training/Training';
import EducationUpdate from '../screens/BottomNavigationScreen/profile/education/EducationUpdate';
import PreferenceUpdate from '../screens/BottomNavigationScreen/profile/preference/PreferenceUpdate';
import ExperienceUpdate from '../screens/BottomNavigationScreen/profile/experience/ExperienceUpdate';
import Account from '../containers/profile/Account';
import TrainingInquiry from '../screens/Training/TrainingInquiry';

const Stack = createNativeStackNavigator();

const Router = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animationTypeForReplace: 'push',
        animation: 'slide_from_right',
      }}>
      {/* <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} /> */}
      <Stack.Screen name="HomeScreen" component={BottomTab} />

      {/* Auth Screen */}
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="EmailVerification" component={EmailVerification} />
      <Stack.Screen name="EmailVerified" component={EmailVerified} />

      <Stack.Screen
        name="ForgotPasswordEnterEmail"
        component={ForgotPassword_EnterEmail}
      />
      <Stack.Screen
        name="ForgotPasword_EnterOtp"
        component={ForgotPasword_EnterOtp}
      />
      <Stack.Screen
        name="ForgotPassword_ChoosePassword"
        component={ForgotPassword_ChoosePassword}
      />
      <Stack.Screen
        name="ForgotPaasword_AcountRecover"
        component={ForgotPaasword_AcountRecover}
      />

      {/* Home screen */}
      <Stack.Screen name="JobDetail" component={JobDetail} />
      <Stack.Screen name="CompanyProfile" component={CompanyProfile} />
      <Stack.Screen name="SeeAllJobs" component={SeeAllJobs} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="ProfilePreview" component={ProfilePreview} />
      <Stack.Screen name="UpdateProfile" component={UpdateProfile} />
      <Stack.Screen name="EducationAdd" component={EducationAdd} />
      <Stack.Screen name="EducationUpdate" component={EducationUpdate} />
      <Stack.Screen name="EducationList" component={EducationList} />
      <Stack.Screen name="PreferenceList" component={PreferenceList} />
      <Stack.Screen name="PreferenceAdd" component={PreferenceAdd} />
      <Stack.Screen name="PreferenceUpdate" component={PreferenceUpdate} />
      <Stack.Screen name="ExperienceAdd" component={ExperienceAdd} />
      <Stack.Screen name="ExperienceList" component={ExperienceList} />
      <Stack.Screen name="ExperienceUpdate" component={ExperienceUpdate} />
      <Stack.Screen name="TrainingList" component={TrainingList} />
      <Stack.Screen name="AllCategories" component={AllCategoriesScreen} />
      <Stack.Screen name="Training" component={Training} />
      <Stack.Screen name="TrainingInquiry" component={TrainingInquiry} />

      <Stack.Screen name="Account" component={Account} />

      <Stack.Screen
        name="CompareJobAndProfile"
        component={CompareJobAndProfile}
      />
    </Stack.Navigator>
  );
};

export default Router;
