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
import SeeAllJobs from '../screens/SeeAllJobs/SeeAllJobs';
import TotalJobs from '../containers/TotalJobs';
import SidebarDrawer from '../components/SidebarDrawer';
import EditProfileModal from '../containers/modal/EditProfileModal';

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
      <Stack.Screen name="SeeAllJobs" component={SeeAllJobs} />
      <Stack.Screen name="Test" component={EditProfileModal} />
    </Stack.Navigator>
  );
};

export default Router;
