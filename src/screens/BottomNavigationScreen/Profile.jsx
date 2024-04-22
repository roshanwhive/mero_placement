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

import {customTextColor, customThemeColor} from '../../constants/Color';
import {useDispatch, useSelector} from 'react-redux';
import {
  getUserProfile,
  logout,
  resetState,
} from '../../features/auth/AuthSlice';
import AppBar from '../../components/custom_toolbar/AppBar';
import UserProfileCard from '../../components/skeleton_loader/UserProfileCard';
import logoImage from '../../assets/search1.jpg';
import {showMessage} from 'react-native-flash-message';
import AvatarSkeleton from '../../components/skeleton_loader/AvatarSkeleton';
import {customFontSize, customFonts} from '../../constants/theme';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Divider} from 'react-native-paper';

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

  const handleBack = () => {
    navigation.goBack();
  };

  useEffect(() => {
    if (isAuthenticated === true && token !== '') {
      dispatch(getUserProfile());
    }
  }, [dispatch]);

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
        <AppBar handleBack={handleBack} />

        {/* {isAuthenticated && <View style={styles.header}></View>} */}

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

                {!!userProfile?.profile && (
                  <View style={styles.nameContainer}>
                    <Text style={styles.name}>
                      {userProfile?.profile?.lead_name}
                    </Text>

                    <Text style={styles.bio}>
                      {userProfile?.profile?.email}
                    </Text>
                  </View>
                )}
                <View style={styles.smallCard}>
                  <View style={styles.card}>
                    <Text style={styles.number}>11</Text>
                    <Text style={styles.name1}>Jobs Aplied</Text>
                  </View>
                  <View style={styles.card}>
                    <Text style={styles.number}>11</Text>
                    <Text style={styles.name1}>Saved Jobs</Text>
                  </View>
                  <View style={styles.card}>
                    <Text style={styles.number}>11</Text>
                    <Text style={styles.name1}>Followed Company</Text>
                  </View>
                </View>

                <View style={styles.bottonContainer}>
                  <TouchableOpacity
                    style={styles.editBtn}
                    onPress={() => navigation.navigate('UpdateProfile')}>
                    <Text style={styles.editBtnText}>Update Profile</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.profileViewBtn}
                    onPress={() => navigation.navigate('ProfilePreview')}>
                    <Text style={styles.previewBtnText}>Preview Profile</Text>
                  </TouchableOpacity>
                </View>

                {/* {!!userProfile?.profile ? <Account /> : <UserProfileCard />} */}

                <View style={styles.profileCard}>
                  <View style={styles.titleContainer}>
                    <Text style={styles.title}>Profile Information</Text>
                    {/* <TouchableOpacity>
                      <Text style={styles.edit}>Edit</Text>
                    </TouchableOpacity> */}
                  </View>
                  <View style={styles.accountDetailContainer}>
                    <View style={styles.detailCard}>
                      <Text style={styles.label}>Basic Info</Text>
                      <Icon
                        name="chevron-circle-right"
                        size={20}
                        color={customTextColor.lightGreen}
                      />
                    </View>
                    <Divider />

                    <View style={styles.detailCard}>
                      <Text style={styles.label}>Preference</Text>
                      <Icon
                        name="chevron-circle-right"
                        size={20}
                        color={customTextColor.lightGreen}
                      />
                    </View>
                    <Divider />

                    <View style={styles.detailCard}>
                      <Text style={styles.label}>Education</Text>
                      <Icon
                        name="chevron-circle-right"
                        size={20}
                        color={customTextColor.lightGreen}
                      />
                    </View>
                    <Divider />

                    <View style={styles.detailCard}>
                      <Text style={styles.label}>Experience</Text>
                      <Icon
                        name="chevron-circle-right"
                        size={20}
                        color={customTextColor.lightGreen}
                      />
                    </View>
                    <Divider />

                    <View style={styles.detailCard}>
                      <Text style={styles.label}>Other Information</Text>
                      <Icon
                        name="chevron-circle-right"
                        size={20}
                        color={customTextColor.lightGreen}
                      />
                    </View>
                  </View>
                </View>

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

const styles = StyleSheet.create({
  container: {
    backgroundColor: customThemeColor.white,
    flexGrow: 1,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 100,
    borderWidth: 4,
    borderColor: customThemeColor.lighterBg,
    alignSelf: 'center',
  },
  bodyContent: {
    alignItems: 'center',
    paddingHorizontal: 40,
    marginTop: 20,
    marginBottom: 50,
  },
  bodyContent1: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  image: {
    width: 250,
    height: 210,
    borderRadius: 50,
    marginBottom: 20,
  },
  smallCard: {
    height: 'auto',
    width: '100%',
    marginVertical: 20,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  card: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 120,
    height: 'auto',
  },
  number: {
    fontSize: 20,
    color: customTextColor.primary,
    fontWeight: 'bold',
  },
  name1: {
    marginTop: 8,
    fontSize: 14,
    color: customTextColor.secondary,
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
    marginBottom: 10,
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
    textAlign: 'center',
  },
  logoutText: {
    color: customTextColor.white,
    fontSize: 20,
    fontFamily: customFonts.fontPoppins,
  },

  // --------------Bottom Container--------------
  bottonContainer: {
    marginTop: 10,
    flexDirection: 'row',
    marginBottom: 40,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  editBtn: {
    borderWidth: 1,
    borderColor: customTextColor.darkRed,
    paddingHorizontal: 25,
    borderRadius: 15,
    paddingVertical: 10,
  },
  editBtnText: {
    color: customTextColor.darkRed,
    fontSize: 16,
    fontWeight: '600',
  },
  profileViewBtn: {
    borderWidth: 1,
    borderColor: customTextColor.darkRed,
    backgroundColor: customThemeColor.darkRed,
    paddingHorizontal: 25,
    borderRadius: 15,
    paddingVertical: 10,
  },
  previewBtnText: {
    color: customTextColor.white,
    fontSize: 16,
    fontWeight: '700',
  },

  // ----------Profile card------------------
  profileCard: {
    width: '110%',
    borderRadius: 20,
    backgroundColor: '#f7f7f7',
    position: 'relative',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  titleContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: '500',
    color: customTextColor.primary,
  },
  edit: {
    color: '#2b8256',
    fontWeight: '500',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
  detailCard: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 20,
    flexWrap: 'wrap',
  },
  borderBottomGray: {
    borderBottomColor: customThemeColor.lighterBg,
    borderBottomWidth: 0.5,
  },
  label: {
    fontSize: 15,
    color: customTextColor.primary,
  },
});
