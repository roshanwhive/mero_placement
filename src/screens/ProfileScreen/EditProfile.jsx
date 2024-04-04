import {View, Text, StyleSheet, TextInput, ScrollView} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import {Avatar} from 'react-native-paper';
import {customThemeColor} from '../../constants/Color';

const AccountEdit = () => {
  return (
    <>
      <View style={styles.cardContainer}>
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
        <View style={styles.inputWrapper}>
          <Text style={styles.label}>DOB</Text>
          <TextInput style={styles.input} />
        </View>
      </View>
    </>
  );
};

const EducationEdit = () => {
  return (
    <>
      <View style={styles.cardContainer}>
        <Text style={styles.title}>Education</Text>

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
        <View style={styles.inputWrapper}>
          <Text style={styles.label}>DOB</Text>
          <TextInput style={styles.input} />
        </View>
      </View>
    </>
  );
};

const PreferenceEdit = () => {
  return (
    <>
      <View style={styles.cardContainer}>
        <Text style={styles.title}>Preferences</Text>

        <View style={styles.inputWrapper}>
          <Text style={styles.label}>Job Category</Text>
          <TextInput style={styles.input} />
        </View>
        <View style={styles.inputWrapper}>
          <Text style={styles.label}>Skills</Text>
          <TextInput style={styles.input} />
        </View>
        <View style={styles.inputWrapper}>
          <Text style={styles.label}>Job Title</Text>
          <TextInput style={styles.input} />
        </View>
        <View style={styles.inputWrapper}>
          <Text style={styles.label}>Availablity</Text>
          <TextInput style={styles.input} />
        </View>
        <View style={styles.inputWrapper}>
          <Text style={styles.label}>Level</Text>
          <TextInput style={styles.input} />
        </View>
      </View>
    </>
  );
};
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
          onPress={() => navigation.goBack()}
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

        <AccountEdit />

        <PreferenceEdit />

        <EducationEdit />
      </View>
      <View></View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: customThemeColor.white,
    padding: 20,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 20,
    letterSpacing: 1,
    fontWeight: '500',
    color: 'black',
  },
  bodyContent: {
    marginTop: 20,
  },
  text: {
    color: 'black',
    marginLeft: 5,
    fontSize: 15,
  },
  label: {
    fontSize: 15,
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
  cardContainer: {
    marginTop: 20,
    gap: 20,
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderRadius: 30,
    backgroundColor: customThemeColor.lightBG,
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
    paddingVertical: 0,
    fontSize: 14,
    color: '#595959',
  },
});

export default EditProfile;
