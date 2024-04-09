import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import {Avatar} from 'react-native-paper';
import {customTextColor, customThemeColor} from '../../constants/Color';
import {useNavigation} from '@react-navigation/native';
import {useRoute} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import defaultUser from '../../assets/default-user.jpg';

const AccountEdit = () => {
  const userProfile = useSelector(state => state.auth);
  return (
    <>
      <View style={styles.profileImage}>
        <Text style={styles.text}>Profile Image</Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          {/* <Avatar.Image
            size={100}
            source={require('../../assets/companyLogo.png')}
            style={styles.avatarImage}
          /> */}
          {!!userProfile?.profile?.featured_image ? (
            <Avatar.Image
              size={100}
              source={{uri: userProfile?.profile?.featured_image}}
              style={styles.avatarImage}
            />
          ) : (
            <Image
              style={styles.avatar}
              source={require('../../assets/default-user.jpg')}
            />
          )}
          <Text style={styles.link}>Upload</Text>
        </View>
      </View>
      <View style={[styles.inputWrapper, {marginTop: 20}]}>
        <Text style={styles.label}>Bio</Text>
        <TextInput style={styles.input} />
      </View>
      <View style={styles.cardContainer}>
        <Text style={styles.title}>Account Information</Text>

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

const ExperienceEdit = () => {
  return (
    <>
      <View style={styles.cardContainer}>
        <Text style={styles.title}>Experience</Text>

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

const EditProfile = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const title = route.params?.title || 'Default Title';
  return (
    <ScrollView
      horizontal={false}
      showsVerticalScrollIndicator={false}
      style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Edit {title}</Text>
        <Icon
          style={styles.xIcon}
          name="x"
          size={25}
          color="black"
          onPress={() => navigation.goBack()}
        />
      </View>
      <View style={styles.bodyContent}>
        {title === 'Profile' && <AccountEdit />}
        {title === 'Preference' && <PreferenceEdit />}
        {title === 'Education' && <EducationEdit />}
        {title === 'Experience' && <ExperienceEdit />}
      </View>
      <View style={styles.jobActions}>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionButtonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: customThemeColor.white,
    padding: 20,
    flex: 1,
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
    marginVertical: 20,
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
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 100,
    marginTop: 10,
    alignSelf: 'center',
  },

  profileImage: {},
  cardContainer: {
    marginTop: 20,
    gap: 20,
    // paddingHorizontal: 20,
    paddingVertical: 20,
    borderRadius: 30,
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
    color: customTextColor.secondary,
  },

  jobActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 15,
    paddinghorizontal: 10,
  },

  actionButton: {
    backgroundColor: customThemeColor.darkRed,
    paddingHorizontal: 20,
    paddingVertical: 10,
    width: 250,
    borderRadius: 5,
  },
  actionButtonText: {
    color: customTextColor.white,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default EditProfile;
