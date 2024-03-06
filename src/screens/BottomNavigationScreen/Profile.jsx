import React from 'react';
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

export default Profile = ({navigation}) => {
  return (
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
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    flexGrow: 1,
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
    top: '-15%',
    alignSelf: 'center',
    marginTop: 130,
  },
  body: {
    top: '-20%',
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
    color: '#11401E',
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
