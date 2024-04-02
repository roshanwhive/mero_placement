import React, {useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Account from '../../containers/profile/Account';
import Preferences from '../../containers/profile/Preferences';
import Education from '../../containers/profile/Education';
import Experience from '../../containers/profile/Experience';
import {customTextColor, customThemeColor} from '../../constants/Color';
import {useDispatch, useSelector} from 'react-redux';
import {getUserProfile, logout} from '../../features/auth/AuthSlice';
import {ActivityIndicator} from 'react-native-paper';
import AppBar from '../../components/custom_toolbar/AppBar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AvatarByName from '../../components/AvatarbyName';
import UserProfileCard from '../../components/skeleton_loader/UserProfileCard';

export default Profile = ({navigation}) => {
  const dispatch = useDispatch();

  const {message, isAuthenticated, isSuccess, isError, isLoading, statusCode} =
    useSelector(state => state.auth);
  const user = AsyncStorage.getItem('USER_TOKEN');
  const {userProfile, token} = useSelector(state => state.auth);

  useEffect(() => {
    setTimeout(() => {
      dispatch(getUserProfile());
    }, 200);
    console.log('I am profile component');
  }, [dispatch]);

  const handleBack = () => {
    navigation.goBack();
  };

  useEffect(() => {
    console.log(typeof userProfile);
  }, [userProfile]);

  const handleLogout = () => {
    dispatch(logout());

    setTimeout(() => {
      navigation.navigate('Login');
    }, 2000);
  };
  return (
    <>
      <ScrollView
        horizontal={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}>
        <AppBar handleBack={handleBack} title="Profile" />
        <View style={styles.header}></View>
        {!!userProfile?.profile?.featured_image ? (
          <Image
            style={styles.avatar}
            source={{uri: userProfile?.profile?.featured_image}}
          />
        ) : (
          <View style={styles.avatar}>
            <AvatarByName name={userProfile?.profile?.lead_name} />
          </View>
        )}

        <View style={styles.body}>
          <View style={styles.bodyContent}>
            <View style={styles.nameContainer}>
              <Text style={styles.name}>{userProfile?.profile?.lead_name}</Text>
            </View>
            {!!userProfile ? <Account /> : <UserProfileCard />}
            {!!userProfile ? <Preferences /> : <UserProfileCard />}
            {!!userProfile ? <Education /> : <UserProfileCard />}
            {!!userProfile ? <Experience /> : <UserProfileCard />}

            <TouchableOpacity
              onPress={handleLogout}
              style={[styles.buttonContainer, styles.buttonLogout]}>
              <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: customThemeColor.white,
    flexGrow: 1,
    borderTopLeftRadius: 20,
  },
  header: {
    backgroundColor: '#9D050A',
    height: 200,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 100,
    borderWidth: 4,
    borderColor: 'white',
    top: '-13%',
    alignSelf: 'center',
    marginTop: 130,
  },
  body: {
    top: '-18%',
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding: 40,
  },
  nameContainer: {
    marginTop: 40,
    marginBottom: 20,
  },
  name: {
    fontSize: 22,
    fontWeight: '600',
    color: customTextColor.primary,
  },

  buttonContainer: {
    marginTop: 10,
    bottom: '-10%',
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
    width: 250,
    borderRadius: 30,
  },
  buttonLogout: {
    backgroundColor: '#9D050A',
  },

  logoutText: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '600',
  },
});
