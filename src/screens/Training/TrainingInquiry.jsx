import {useNavigation, useRoute} from '@react-navigation/native';
import {
  ActivityIndicator,
  Button,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {TextInput} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {Controller, useForm} from 'react-hook-form';

import ProfileAppBar from '../../components/custom_toolbar/ProfileAppBar';
import {customTextColor, customThemeColor} from '../../constants/Color';
import {customFontSize, customFonts} from '../../constants/theme';
import {GlobalStyleSheet} from '../../constants/StyleSheet';
import {postTrainingInquiry} from '../../features/training/postTrainingInquirySlice';
import {useEffect, useState} from 'react';

const TrainingInquiry = heading_id => {
  const navigation = useNavigation();
  const {isLoading} = useSelector(state => state.trainingInquiry);
  const [inputVisible, setInputVisible] = useState(false);
  const route = useRoute();
  heading_id = route.params?.heading_id;
  const dispatch = useDispatch();

  const handleBack = () => {
    navigation.goBack();
  };

  const schema = yup.object().shape({
    name: yup.string().required('name field is required'),
    email: yup
      .string()
      .required('email field is required')
      .email('Invalid Email'),
    phone: yup.string().required('phone field is required'),
    message: yup.string().required('message field is required'),
    heading_id: yup.string(),
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: {errors},
    setError,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      message: '',
      heading_id: heading_id,
    },
  });

  // useEffect(() => {
  //   reset: {
  //     heading_id: heading_id ?? '';
  //   }
  // }, [heading_id]);

  const onPressInquiry = handleSubmit(async trainingData => {
    dispatch(postTrainingInquiry(trainingData)).then(() => {
      navigation.navigate('HomeScreen');
      console.log('TrainingDataAdd', trainingData);
    });
  });

  const commonTextInputProps = {
    style: styles.input,
    mode: 'outlined',
    outlineColor: customTextColor.darkGreen,
    activeOutlineColor: customTextColor.darkGreen,
    selectionColor: customTextColor.darkGreen,
    disabled: isLoading,
  };

  return (
    <View style={styles.container}>
      <ProfileAppBar
        handleBack={handleBack}
        title={'Training Inquiry'}
        showIcon={false}
      />
      <ScrollView>
        <View style={GlobalStyleSheet.containerForm}>
          <View style={GlobalStyleSheet.inputWrapper}>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({field: {onChange, value}}) => (
                <TextInput
                  {...commonTextInputProps}
                  label="Name"
                  value={value}
                  onChangeText={onChange}
                />
              )}
              name="name"
            />
            {errors.name && (
              <Text style={styles.errorText}>{errors.name.message}</Text>
            )}
          </View>
          <View style={GlobalStyleSheet.inputWrapper}>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({field: {onChange, value}}) => (
                <TextInput
                  {...commonTextInputProps}
                  label="Email"
                  value={value}
                  onChangeText={onChange}
                />
              )}
              name="email"
            />
            {errors.email && (
              <Text style={styles.errorText}>{errors.email.message}</Text>
            )}
          </View>

          <View style={GlobalStyleSheet.inputWrapper}>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({field: {onChange, value}}) => (
                <TextInput
                  {...commonTextInputProps}
                  label="Phone"
                  keyboardType="numeric"
                  value={value}
                  onChangeText={onChange}
                />
              )}
              name="phone"
            />
            {errors.phone && (
              <Text style={styles.errorText}>{errors.phone.message}</Text>
            )}
          </View>

          <View style={GlobalStyleSheet.inputWrapper}>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({field: {onChange, value}}) => (
                <TextInput
                  {...commonTextInputProps}
                  label="Message"
                  value={value}
                  onChangeText={onChange}
                />
              )}
              name="message"
            />
            {errors.message && (
              <Text style={styles.errorText}>{errors.message.message}</Text>
            )}
          </View>

          <View style={GlobalStyleSheet.buttonWrapper}>
            <TouchableOpacity
              style={GlobalStyleSheet.button}
              onPress={handleSubmit(onPressInquiry)}>
              {isLoading ? (
                <ActivityIndicator
                  animating={true}
                  style={{paddingVertical: 14}}
                  color={customTextColor.white}
                  size={20}
                />
              ) : (
                <Text style={GlobalStyleSheet.buttonText}>Send Inquiry</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: customThemeColor.lightBG,
  },
  container1: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: customTextColor.primary,
    fontFamily: customFonts.fontPoppins,
    fontSize: customFontSize.font22,
    paddingHorizontal: 20,
    marginTop: 20,
  },
  title1: {
    fontSize: customFontSize.font16,
    color: customTextColor.primary,
    fontFamily: customFonts.fontBold,
  },
  subTitle: {
    color: customTextColor.secondary,
    fontFamily: customFonts.fontPoppins,
    fontSize: customFontSize.font12,
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
  subTitle1: {
    color: customTextColor.primary,
    fontFamily: customFonts.fontPoppins,
    fontSize: customFontSize.font14,
    paddingHorizontal: 5,
    paddingVertical: 5,
    marginLeft: -45,
    width: '45%',
  },
  input: {
    backgroundColor: 'transparent',
  },
  row: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    flexDirection: 'row',
    marginBottom: 10,
    marginTop: 5,
    justifyContent: 'space-between',
  },
  errorText: {
    color: 'red',
    margin: 0,
    padding: 0,
  },

  studyRow: {
    width: '90%',
    height: 40,
    borderWidth: 0.5,
    borderRadius: 15,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 5,
    paddingRight: 5,
  },
});

export default TrainingInquiry;
