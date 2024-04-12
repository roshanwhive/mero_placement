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
import logoImage from '../../assets/search1.jpg';
import RenderHtml from 'react-native-render-html';
import {showMessage} from 'react-native-flash-message';
import AvatarSkeleton from '../../components/skeleton_loader/AvatarSkeleton';
import {GlobalStyleSheet} from '../../constants/StyleSheet';
import {customFontSize, customFonts} from '../../constants/theme';

export default Profile = ({navigation}) => {
  const dispatch = useDispatch();

  const {
    message,
    isAuthenticated,
    userProfile,
    token,
    isSuccess,
    isError,
    isLoading,
    statusCode,
  } = useSelector(state => state.auth);
  const user = AsyncStorage.getItem('USER_TOKEN');

  useEffect(() => {
    setTimeout(() => {
      dispatch(getUserProfile());
    }, 1000);
  }, [dispatch]);

  const handleBack = () => {
    navigation.goBack();
  };

  const handleLogout = () => {
    dispatch(logout());
    navigation.navigate('Login');
    showMessage({
      message: 'Logout Successfully',
      type: 'success',
      setLoading: false,
      animationDuration: 1000,
      animated: true,
    });
  };
  return (
    <>
      <ScrollView
        horizontal={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}>
        <AppBar handleBack={handleBack} title="Profile" />

        {isAuthenticated && <View style={styles.header}></View>}

        <View style={styles.body}>
          {isAuthenticated ? (
            <>
              <View style={styles.bodyContent}>
                {!!userProfile?.profile?.featured_image ? (
                  <Image
                    style={styles.avatar}
                    source={{uri: userProfile?.profile?.featured_image}}
                  />
                ) : (
                  <AvatarSkeleton />
                )}
                {/* <View style={styles.avatar}>
                    <AvatarByName name={userProfile?.profile?.lead_name} />
                  </View> */}
                {!!userProfile?.profile && (
                  <View style={styles.nameContainer}>
                    <Text style={styles.name}>
                      {userProfile?.profile?.lead_name}
                    </Text>
                    <RenderHtml
                      contentWidth={100}
                      ignoredDomTags={['quillbot-extension-portal']}
                      tagsStyles={tagsStyles}
                      source={{
                        html: userProfile?.profile?.bio,
                      }}
                    />
                  </View>
                )}

                {!!userProfile?.profile ? <Account /> : <UserProfileCard />}
                {!!userProfile?.preference ? (
                  <Preferences />
                ) : (
                  <UserProfileCard />
                )}
                {!!userProfile?.education ? <Education /> : <UserProfileCard />}
                {!!userProfile?.experience ? (
                  <Experience />
                ) : (
                  <UserProfileCard />
                )}

                <TouchableOpacity
                  onPress={handleLogout}
                  style={[styles.buttonContainer, styles.buttonLogout]}>
                  <Text style={styles.logoutText}>Logout</Text>
                </TouchableOpacity>
              </View>
            </>
          ) : (
            <View style={styles.bodyContent1}>
              <Image source={logoImage} style={styles.image} />
              <Text style={styles.title}>Get Your Dream Job</Text>
              <Text style={styles.subtitle}>
                Update your profile information to attrack recruiters.
              </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('Login')}
                style={[styles.buttonContainer, styles.buttonLogout]}>
                <Text style={styles.logoutText}>Login</Text>
              </TouchableOpacity>
              <View style={styles.textContainer}>
                <Text
                  style={{
                    color: customTextColor.primary,
                    fontSize: customFontSize.font16,
                    fontFamily: customFonts.fontPoppins,
                  }}>
                  Don't have an account?
                </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                  <Text style={styles.signupText}>Signup</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    </>
  );
};

const tagsStyles = {
  p: {
    color: customTextColor.secondary,
    textAlign: 'center',
    fontSize: 14,
  },
  li: {
    color: customTextColor.secondary,
    fontSize: 14,
    textAlign: 'justify',
    marginHorizontal: 5,
  },
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: customThemeColor.white,
    flexGrow: 1,
  },
  header: {
    backgroundColor: customThemeColor.darkRed,
    height: 150,
    position: 'relative',
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 100,
    borderWidth: 4,
    borderColor: customThemeColor.lighterBg,
    alignSelf: 'center',
  },
  body: {
    top: '-6%',
  },
  bodyContent: {
    alignItems: 'center',
    padding: 40,
  },
  bodyContent1: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
    height: '100%',
  },
  image: {
    width: 250,
    height: 210,
    borderRadius: 50,
    marginBottom: 20,
  },
  title: {
    fontSize: 25,
    marginBottom: 10,
    textAlign: 'center',
    color: '#11401E',
    fontFamily: customFonts.fontRobotoBold,
  },
  subtitle: {
    textAlign: 'center',
    color: '#11401E',
    fontFamily: customFonts.fontPoppins,
    fontSize: customFontSize.font14,
  },
  textContainer: {
    marginTop: 50,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  signupText: {
    color: customTextColor.lightGreen,
    marginLeft: 5,
    fontSize: customFontSize.font16,
    fontFamily: customFonts.fontPoppins,
  },
  nameContainer: {
    marginTop: 20,
    marginBottom: 30,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
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
    backgroundColor: customTextColor.darkRed,
  },
  bio: {
    fontSize: 16,
    color: customTextColor.secondary,
  },
  logoutText: {
    color: customTextColor.white,
    fontSize: 20,
    fontFamily: customFonts.fontPoppins,
  },
});
