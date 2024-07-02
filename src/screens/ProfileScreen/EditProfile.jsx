import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/Feather';
import {Avatar, TextInput} from 'react-native-paper';
import {customTextColor, customThemeColor} from '../../constants/Color';
import {useNavigation} from '@react-navigation/native';
import {useRoute} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {Controller, useForm} from 'react-hook-form';
import {Dropdown} from 'react-native-element-dropdown';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {
  launchCamera,
  launchImageLibrary,
  ImagePicker,
  showImagePicker,
} from 'react-native-image-picker';
import {getAllGender} from '../../features/formData/FormSlice';
import {customFontSize, customFonts} from '../../constants/theme';
import {GlobalStyleSheet} from '../../constants/StyleSheet';
import {getUserProfile} from '../../features/auth/authSlice/userProfileSlice';
import {updateUserAccountInformation} from '../../features/auth/authSlice/updateAccountSlice';

const AccountEdit = () => {
  const [selectedImage, setSelectedImage] = useState(
    userProfile?.profile?.featured_image || null,
  );
  const [imageFile, setImageFile] = useState(null);

  const [genders, setGenders] = useState([]);

  const {userProfile} = useSelector(state => state.userProfile);

  const {allGenderData} = useSelector(state => state.formOptions);

  const dispatch = useDispatch();

  const handleCameraLaunch = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: true,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchCamera(options, handleResponse);
  };

  const openImagePicker = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: true,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchImageLibrary(options, handleResponse);
  };

  useEffect(() => {
    dispatch(getAllGender());
    dispatch(getUserProfile());
  }, [dispatch]);

  useEffect(() => {
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

  const schema = yup.object().shape({
    bio: yup.string(),
    name: yup.string().required('Name is Required'),
    email: yup.string().required('Email is required').email('Invalid email'),
    phone: yup
      .string()
      .required('Contact is required')
      .min(10, 'Must be equal to 10')
      .max(10, 'Must be Equal to 10'),
    gender: yup.string(),
    dob: yup.date().required('Date is required'),
    address: yup.string(),
    featured_image: yup.mixed(),
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: {errors, isSubmitting},
    setError,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      bio: '',
      name: '',
      email: '',
      phone: '',
      gender: '',
      dob: '',
      address: '',
      featured_image: '',
    },
  });

  useEffect(() => {
    if (userProfile) {
      reset({
        bio: userProfile?.profile?.bio || '',
        name: userProfile?.profile?.lead_name || '',
        phone: userProfile?.profile?.primary_contact || '',
        email: userProfile?.profile?.email || '',
        gender: userProfile?.profile?.gender_id || '',
        dob: userProfile?.profile?.dob || '',
        address: userProfile?.profile?.address || '',
        featured_image: userProfile?.profile?.featured_image || '',
      });
    }
  }, [userProfile]);
  const handleResponse = response => {
    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.error) {
      console.log('Image picker error: ', response.error);
    } else {
      // const asset = response?.assets?.[0];
      // let imageUri = response?.uri || response?.assets?.[0]?.uri;
      // setSelectedImage(imageUri);
      // setImageFile({
      //   uri: asset?.uri,
      //   name: asset?.fileName || 'photo.jpg',
      //   type: asset.type || 'image/jpeg',
      // });
      const source = {
        uri: response.assets[0].uri,
        name: response.assets[0].fileName,
        type: response.assets[0].type,
      };
      setSelectedImage(source);
      setValue('featured_image', source);
      console.log('Selected Image URI:', source);
    }
  };

  // useEffect(() => {
  //   setValue('featured_image', imageFile);
  //   // setValue('featured_image',imageFile)
  // }, [imageFile]);

  const handleAccountUpdate = formData => {
    // const updatedFormData = new FormData();
    // updatedFormData.append('featured_image', selectedImage);
    // for (const key in formData) {
    //   if (key !== 'featured_image') {
    //     updatedFormData.append(key, formData[key]);
    //   }
    // }
    // console.log('FormData before sending:', updatedFormData);
    dispatch(updateUserAccountInformation(formData));
    console.log('Submitted:', formData);
  };

  const commonTextInputProps = {
    style: styles.input,
    mode: 'outlined',
    outlineColor: customTextColor.darkGreen,
    activeOutlineColor: customTextColor.darkGreen,
    selectionColor: customTextColor.darkGreen,
  };

  return (
    <>
      <View style={styles.profileImage}>
        <Text style={styles.text}>Profile Image</Text>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Controller
            control={control}
            name="featured_image"
            render={({field: {onChange, value}}) => (
              <View>
                {selectedImage ? (
                  <Image
                    style={styles.avatarImage}
                    source={{uri: selectedImage.uri}}
                    value={value}
                    resizeMode="cover"
                    onChange={e => onChange(e.target.selectedImage.uri)}
                  />
                ) : (
                  <Image
                    style={styles.avatar}
                    //source={require('../../assets/default-user.jpg')}
                    source={
                      userProfile?.profile?.featured_image
                        ? {uri: userProfile.profile.featured_image}
                        : require('../../assets/default-user.jpg')
                    }
                  />
                )}
              </View>
            )}
          />

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
              // {...commonTextInputProps}
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
        />
      </View>
      <View style={GlobalStyleSheet.containerForm}>
        <Text style={styles.title}>Account Information</Text>

        <View style={GlobalStyleSheet.inputWrapper}>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                {...commonTextInputProps}
                label="Name"
                placeholder="name"
                onChangeText={onChange}
                value={value}
              />
            )}
            name="name"
          />
        </View>

        <View style={GlobalStyleSheet.inputWrapper}>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                {...commonTextInputProps}
                label="Contact Number"
                placeholder="Contact Number"
                onChangeText={onChange}
                value={value}
              />
            )}
            name="phone"
          />
        </View>

        <View style={GlobalStyleSheet.inputWrapper}>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                {...commonTextInputProps}
                label="Address"
                placeholder="Address"
                onChangeText={onChange}
                value={value}
              />
            )}
            name="address"
          />
        </View>

        <View style={GlobalStyleSheet.inputWrapper}>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                {...commonTextInputProps}
                label="Email"
                placeholder="Email"
                onChangeText={onChange}
                value={value}
              />
            )}
            name="email"
          />
        </View>
        <View style={GlobalStyleSheet.inputWrapper}>
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
                selectedTextStyle={{color: customTextColor.primary}}
                itemTextStyle={{color: customTextColor.secondary}}
                value={value || userProfile?.profile?.gender?.name}
                style={[
                  {
                    borderWidth: 1,
                    borderColor: customTextColor.darkGreen,
                    borderRadius: 5,
                    paddingHorizontal: 16,
                    paddingVertical: 5,
                  },
                  styles.input,
                ]}
                onChange={item => {
                  onChange(item.value);
                }}
              />
            )}
            name="gender"
          />
        </View>

        <View style={GlobalStyleSheet.inputWrapper}>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                {...commonTextInputProps}
                label="Date of birth"
                placeholder="Dob"
                onChangeText={onChange}
                value={value}
              />
            )}
            name="dob"
          />
        </View>
      </View>
      <View style={styles.jobActions}>
        <TouchableOpacity
          onPress={handleSubmit(handleAccountUpdate)}
          style={[styles.actionButton, styles.buttonLogout]}>
          <Text style={styles.actionButtonText}>Save</Text>
        </TouchableOpacity>
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
    fontSize: customFontSize.font20,
    letterSpacing: 1,
    fontFamily: customFonts.fontPoppins,
    color: 'black',
    paddingBottom: 10,
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
    marginTop: 10,
    bottom: '-10%',
    height: 35,
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
  actionButtonText: {
    color: customTextColor.white,
    fontSize: customFontSize.font18,
    fontFamily: customFonts.fontPoppins,
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
