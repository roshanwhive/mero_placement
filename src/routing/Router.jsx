import React from 'react';
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

      {/* Auth Screen */}
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="EmailVerification" component={EmailVerification} />
      <Stack.Screen name="Login" component={Login} />
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
      <Stack.Screen name="HomeScreen" component={BottomTab} />
      <Stack.Screen name="JobDetail" component={JobDetail} />
      <Stack.Screen name="CompanyProfile" component={CompanyProfile} />
      <Stack.Screen name="SeeAllJobs" component={SeeAllJobs} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen
        name="CompareJobAndProfile"
        component={CompareJobAndProfile}
      />
    </Stack.Navigator>
  );
};

export default Router;
