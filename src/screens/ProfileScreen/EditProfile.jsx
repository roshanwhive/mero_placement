import {View, Text, StyleSheet, TextInput, ScrollView} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import {Avatar} from 'react-native-paper';

const EditProfile = ({navigation}) => {
  return (
    <ScrollView
      horizontal={false}
      showsVerticalScrollIndicator={false}
      style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Edit Profile</Text>
        <Icon
          style={styles.xIcon}
          name="x"
          size={25}
          color="black"
          onPress={() => navigation.navigate('Profile')}
        />
      </View>
      <View style={styles.bodyContent}>
        <View style={styles.profileImage}>
          <Text style={styles.text}>Profile Image</Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Avatar.Image
              size={100}
              source={require('../../assets/companyLogo.png')}
              style={styles.avatarImage}
            />
            <Text style={styles.link}>Upload</Text>
          </View>
        </View>
        <View style={styles.account}>
          <Text style={styles.title}>Personal Information</Text>

          <View style={styles.inputWrapper}>
            <Text style={styles.label}>Name</Text>
            <TextInput style={styles.input} />
          </View>
          <View style={styles.inputWrapper}>
            <Text style={styles.label}>Email</Text>
            <TextInput style={styles.input} />
          </View>
          <View style={styles.inputWrapper}>
            <Text style={styles.label}>Contact</Text>
            <TextInput style={styles.input} />
          </View>
          <View style={styles.inputWrapper}>
            <Text style={styles.label}>Gender</Text>
            <TextInput style={styles.input} />
          </View>
        </View>
        <View style={styles.account}>
          <View style={styles.inputWrapper}>
            <Text style={styles.label}>Name</Text>
            <TextInput style={styles.input} />
          </View>
          <View style={styles.inputWrapper}>
            <Text style={styles.label}>Email</Text>
            <TextInput style={styles.input} />
          </View>
          <View style={styles.inputWrapper}>
            <Text style={styles.label}>Contact</Text>
            <TextInput style={styles.input} />
          </View>
          <View style={styles.inputWrapper}>
            <Text style={styles.label}>Gender</Text>
            <TextInput style={styles.input} />
          </View>
        </View>
      </View>
      <View></View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FCFCFC',
    padding: 20,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 25,
    fontWeight: '500',
    color: 'black',
  },
  bodyContent: {
    marginTop: 20,
  },
  text: {
    color: 'black',
    marginLeft: 5,
    fontSize: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: 'black',
    paddingLeft: 3,
  },
  avatarImage: {
    marginTop: 10,
  },
  link: {
    fontSize: 18,
    color: '#9D050A',
    marginHorizontal: 30,
    fontWeight: '600',
  },

  profileImage: {},
  account: {
    marginTop: 20,
    gap: 20,
    // backgroundColor: '#f7f7f7',
    padding: 10,
    borderRadius: 20,
  },
  inputWrapper: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: 0,
  },
  input: {
    backgroundColor: 'transparent',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    paddingVertical: 4,
    fontSize: 14,
    color: '#595959',
  },
});

export default EditProfile;
