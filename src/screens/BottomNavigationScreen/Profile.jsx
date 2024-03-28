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
import {getUserProfile} from '../../features/auth/AuthSlice';
import {ActivityIndicator} from 'react-native-paper';

export default Profile = ({navigation}) => {
  const dispatch = useDispatch();

  const {userProfile} = useSelector(state => state.auth);

  useEffect(() => {
    setTimeout(() => {
      dispatch(getUserProfile());
    }, 200);
  }, [dispatch]);

  useEffect(() => {
    console.log(userProfile);
  }, [userProfile]);

  return (
    <>
      {!!userProfile ? (
        <ScrollView
          horizontal={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.container}>
          <View style={styles.header}></View>
          <Image
            style={styles.avatar}
            source={{uri: 'https://bootdey.com/img/Content/avatar/avatar6.png'}}
          />
          <View style={styles.body}>
            <View style={styles.bodyContent}>
              <View style={styles.nameContainer}>
                <Text style={styles.name}>Roshan Nyaupane</Text>
              </View>
              <Account navigation={navigation} />
              <Preferences />
              <Education />
              <Experience />

              <TouchableOpacity
                onPress={() => navigation.navigate('Login')}
                style={[styles.buttonContainer, styles.buttonLogout]}>
                <Text style={styles.logoutText}>Logout</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      ) : (
        <ActivityIndicator
          animating={true}
          style={{paddingVertical: 14}}
          color={customTextColor.white}
          size={20}
        />
      )}
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
    borderRadius: 63,
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
    marginVertical: 50,
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
