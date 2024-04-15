import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/Feather';
import {Avatar} from 'react-native-paper';
import {customTextColor, customThemeColor} from '../../constants/Color';
import {useNavigation} from '@react-navigation/native';
import {useRoute} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {Controller, useForm} from 'react-hook-form';
import {Dropdown} from 'react-native-element-dropdown';
import {
  launchCamera,
  launchImageLibrary,
  ImagePicker,
  showImagePicker,
} from 'react-native-image-picker';
import {getAllGender} from '../../features/formData/FormSlice';

const AccountEdit = () => {
  const [selectedImage, setSelectedImage] = useState(
    userProfile?.profile?.featured_image || null,
  );
  const [genders, setGenders] = useState([]);

  const {userProfile} = useSelector(state => state.auth);
  const {allGenderData} = useSelector(state => state.formOptions);
  const {control, handleSubmit} = useForm();
  const dispatch = useDispatch();

  const onSubmit = formData => {
    console.log(formData);
  };

  const handleCameraLaunch = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchCamera(options, handleResponse);
  };

  const openImagePicker = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchImageLibrary(options, handleResponse);
  };

  useEffect(() => {
    dispatch(getAllGender());
    setTimeout(() => {
      if (allGenderData?.genders && Array.isArray(allGenderData?.genders)) {
        const mappedGenderData = allGenderData?.genders.map(item => ({
          label: item.name,
          value: item.gender_id,
        }));
        setGenders(mappedGenderData);
      }
    }, 100);
  }, [allGenderData]);

  const handleResponse = response => {
    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.error) {
      console.log('Image picker error: ', response.error);
    } else {
      let imageUri = response.uri || response.assets?.[0]?.uri;
      setSelectedImage(imageUri);
    }
  };

  return (
    <>
      <View style={styles.profileImage}>
        <Text style={styles.text}>Profile Image</Text>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          {selectedImage ? (
            <Image
              style={styles.avatarImage}
              source={{uri: selectedImage}}
              resizeMode="cover"
            />
          ) : (
            <Image
              style={styles.avatar}
              source={require('../../assets/default-user.jpg')}
            />
          )}
          <View style={styles.selectContainer}>
            <TouchableOpacity
              style={styles.uploadButton}
              onPress={handleCameraLaunch}>
              <Icon
                color={customTextColor.darkRed}
                name="camera"
                size={25}
                style={{marginRight: 13}}
              />
              <Text style={styles.link}>Take Photo</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.uploadButton}
              onPress={openImagePicker}>
              <Icon
                color={customTextColor.darkRed}
                name="image"
                size={25}
                style={{marginRight: 13}}
              />
              <Text style={styles.link}>Upload File</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={[styles.inputWrapper, {marginTop: 20}]}>
        <Text style={styles.label}>Bio</Text>
        <Controller
          control={control}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              style={styles.textArea}
              multiline={true}
              numberOfLines={3}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Bio"
            />
          )}
          name="bio"
          defaultValue={userProfile?.profile?.bio || ''}
        />
      </View>
      <View style={styles.cardContainer}>
        <Text style={styles.title}>Account Information</Text>

        <View style={styles.inputWrapper}>
          <Text style={styles.label}>Name</Text>
          <Controller
            control={control}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                style={styles.input}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="Name"
              />
            )}
            name="name"
            defaultValue={userProfile?.profile?.lead_name || ''}
          />
        </View>
        <View style={styles.inputWrapper}>
          <Text style={styles.label}>Email</Text>
          <Controller
            control={control}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                style={styles.input}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="Email"
              />
            )}
            name="email"
            defaultValue={userProfile?.profile?.email || ''}
          />
        </View>
        <View style={styles.inputWrapper}>
          <Text style={styles.label}>Gender</Text>
          <Controller
            control={control}
            rules={{
              required: false,
            }}
            render={({field: {onChange, value}}) => (
              <Dropdown
                data={genders}
                placeholder="Select Gender"
                maxHeight={300}
                labelField="label"
                valueField="value"
                searchPlaceholder="Search..."
                placeholderStyle={{color: customTextColor.secondary}}
                selectedTextStyle={{color: customTextColor.secondary}}
                itemTextStyle={{color: customTextColor.secondary}}
                value={value || userProfile?.profile?.gender?.name}
                style={[
                  {
                    borderBottomWidth: 1,
                    borderBottomColor: customTextColor.secondary,
                    borderRadius: 5,
                    paddingHorizontal: 16,
                    paddingVertical: 5,
                    color: customTextColor.secondary,
                  },
                  styles.input,
                ]}
                onChange={item => {
                  onChange(item.value);
                }}
              />
            )}
            name="gender_id"
          />
        </View>
        <View style={styles.inputWrapper}>
          <Text style={styles.label}>Contact Primary</Text>
          <Controller
            control={control}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                style={styles.input}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="Contact"
              />
            )}
            name="contact primary"
            defaultValue={userProfile?.profile?.primary_contact || ''}
          />
        </View>
        <View style={styles.inputWrapper}>
          <Text style={styles.label}>Contact Secondary</Text>
          <Controller
            control={control}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                style={styles.input}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="Contact"
              />
            )}
            name="contact secondary"
            defaultValue={userProfile?.profile?.secondary_contact || ''}
          />
        </View>

        <View style={styles.inputWrapper}>
          <Text style={styles.label}>DOB</Text>
          <Controller
            control={control}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                style={styles.input}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="DOB"
              />
            )}
            name="dob"
            defaultValue={userProfile?.profile?.dob || ''}
          />
        </View>
      </View>
      <View style={styles.jobActions}>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionButtonText}>Save</Text>
        </TouchableOpacity>
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
    </ScrollView>
  );
};

const tagsStyles = {
  p: {
    color: customTextColor.secondary,
    textAlign: 'justify',
  },
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
    width: 110,
    height: 110,
    borderRadius: 100,
    marginTop: 10,
    alignSelf: 'center',
    borderWidth: 3,
    borderColor: customThemeColor.lighterBg,
  },
  link: {
    fontSize: 18,
    color: '#9D050A',
    fontWeight: '600',
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 100,
    marginTop: 10,
    alignSelf: 'center',
    borderWidth: 3,
    objectFit: 'cover',
    borderColor: customThemeColor.lighterBg,
  },

  profileImage: {},
  cardContainer: {
    marginTop: 20,
    gap: 20,
    paddingHorizontal: 20,
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
  textArea: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: customThemeColor.lightBG,
    paddingVertical: 0,
    fontSize: 14,
    paddingVertical: 10,
    paddingHorizontal: 10,
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
  selectContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  uploadButton: {
    marginLeft: 20,
    backgroundColor: customThemeColor.lightBG,
    margin: 5,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
    paddingVertical: 5,
    borderRadius: 100,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
});

export default EditProfile;
