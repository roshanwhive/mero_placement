import {useNavigation, useRoute} from '@react-navigation/native';
import {
  ActivityIndicator,
  Button,
  Modal,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {customTextColor, customThemeColor} from '../../../../constants/Color';
import {customFontSize, customFonts} from '../../../../constants/theme';
import {GlobalStyleSheet} from '../../../../constants/StyleSheet';
import {TextInput} from 'react-native-paper';
import {useEffect, useMemo, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Dropdown} from 'react-native-element-dropdown';
import {getExpFormData} from '../../../../features/formData/FormSlice';

import {Controller, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {showMessage} from 'react-native-flash-message';
import {addExperience} from '../../../../features/profile/experienceSlice/addExperienceSlice';
import {updateExperience} from '../../../../features/profile/experienceSlice/updateExperienceSlice';
import {getSingleExperience} from '../../../../features/profile/experienceSlice/getSingleExperienceSlice';
import ProfileAppBar from '../../../../components/custom_toolbar/ProfileAppBar';
import {format} from 'date-fns';
import DatePicker from 'react-native-date-picker';
import {color} from 'react-native-reanimated';

const ExperienceAdd = id => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const route = useRoute();
  id = route.params?.id;

  const [show, setShow] = useState(false);
  const [date, setDate] = useState(new Date());
  const [text, setText] = useState('');

  console.log(show);
  const [formattedDate, setFormattedDate] = useState(
    format(new Date(), 'yyyy/MM/dd'),
  );
  const {organization_type, job_level, job_category} = useSelector(
    state => state.formOptions,
  );
  const {message, isSuccess, isLoading, isError, statusCode} = useSelector(
    state => state.addExperience,
  );
  const {singleExperience} = useSelector(state => state.getSingleExperience);

  useEffect(() => {
    dispatch(getExpFormData());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getSingleExperience(id));
  }, [dispatch]);

  const showDatepicker = () => {
    console.log('Select Date ======================>', show);
    setShow(true);
  };

  const [organizationType, setOrganizationType] = useState([]);
  useEffect(() => {
    if (organization_type && Array.isArray(organization_type)) {
      const mappedOrganizationTypeList = organization_type.map(item => ({
        label: item.name,
        value: item.company_type_id,
      }));
      setOrganizationType(mappedOrganizationTypeList);
    }
  }, [organization_type]);

  const [jobLevel, setJobLevel] = useState([]);
  useEffect(() => {
    if (job_level && Array.isArray(job_level)) {
      const mappedJobLevelList = job_level.map(item => ({
        label: item.name,
        value: item.level_id,
      }));
      setJobLevel(mappedJobLevelList);
    }
  }, [job_level]);

  const [jobCategory, setJobCategory] = useState([]);
  useEffect(() => {
    if (job_category && Array.isArray(job_category)) {
      const mappedJobCategoryList = job_category.map(item => ({
        label: item.name,
        value: item.job_category_id,
      }));
      setJobCategory(mappedJobCategoryList);
    }
  }, [job_category]);

  const handleBack = () => {
    navigation.goBack();
  };

  const schema = yup.object().shape({
    organization_name: yup.string().required('Organization name is required'),
    organization_type_id: yup.string().required('Select Organization Type'),
    job_level_id: yup.string().required('Select Job Level'),
    job_category_id: yup.string().required('Select Category'),
    position: yup.string().required('Position is required'),
    dutis: yup.string().required('Duties is required'),
    start_date: yup.string().required('Start Date is required'),
  });

  const defaultValues = useMemo(
    () => ({
      organization_name: singleExperience?.experience?.org_name,
      organization_type_id:
        singleExperience?.experience?.company_type?.company_type_id || '',
      job_level_id: singleExperience?.experience?.job_level?.level_id || '',
      job_category_id:
        singleExperience?.experience?.job_category?.job_category_id || '',
      position: singleExperience?.experience?.position || '',
      dutis: singleExperience?.experience?.duties_responsibilities || '',
      start_date: singleExperience?.experience?.start_date || '',
      end_date: singleExperience?.experience?.end_date || '',
      experience_id: singleExperience?.experience?.experience_id || '',
    }),
    [singleExperience],
  );
  // console.log('single', defaultValues);

  useEffect(() => {
    reset({
      start_date: date || '',
    });
  }, [date]);

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const {
    control,
    reset,
    handleSubmit,
    formState: {errors},
    setError,
  } = methods;

  const onPressAdd = handleSubmit(async experienceData => {
    console.log(experienceData);
    // dispatch(addExperience(experienceData)).then(() => {
    //   if (isError && statusCode !== 200 && statusCode !== 0) {
    //     showMessage({
    //       message: JSON.stringify(message),
    //       type: 'danger',
    //       animationDuration: 1000,
    //       animated: true,
    //     });
    //   } else if (isSuccess && statusCode === 200) {
    //     navigation.navigate('ExperienceList');
    //     showMessage({
    //       message: JSON.stringify(message),
    //       type: 'success',
    //       animationDuration: 1000,
    //       animated: true,
    //     });
    //   }
    // });
  });

  const onPressUpdate = handleSubmit(async experienceData => {
    dispatch(updateExperience(experienceData));
    // console.log('update successfully exp', experienceData);
  });

  const handleConfirm = selectedDate => {
    //setShow(false);
    setDate(selectedDate);
    console.log('date', selectedDate, show);

    // Format the date as needed
    let tempDate = new Date(selectedDate);
    let fDate =
      tempDate.getDate() +
      '/' +
      (tempDate.getMonth() + 1) +
      '/' +
      tempDate.getFullYear();
    //setDate(fDate);
    setText(fDate);
  };

  const handleCancel = () => {
    setShow(false);
  };
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
        title={'Experience'}
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
                  label="Organization Name"
                  value={value}
                  onChangeText={onChange}
                />
              )}
              name="organization_name"
            />
            {errors.organization_name && (
              <Text style={styles.errorText}>
                {errors.organization_name.message}
              </Text>
            )}
          </View>
          <View style={GlobalStyleSheet.inputWrapper}>
            <Controller
              control={control}
              rules={{
                required: false,
              }}
              render={({field: {onChange, value}}) => (
                <Dropdown
                  data={organizationType}
                  disable={isLoading}
                  placeholder="Select Organization Type"
                  maxHeight={300}
                  labelField="label"
                  valueField="value"
                  value={value}
                  placeholderStyle={{color: customTextColor.secondary}}
                  selectedTextStyle={{color: customTextColor.primary}}
                  itemTextStyle={{color: customTextColor.secondary}}
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
                    //handleSubmit(item.value)
                    console.log('click' + item.value);
                  }}
                  // onChange={(item) => handleSubmit(item.value)}
                />
              )}
              name="organization_type_id"
            />
            {errors.organization_type_id && (
              <Text style={styles.errorText}>
                {errors.organization_type_id.message}
              </Text>
            )}
          </View>
          <View style={GlobalStyleSheet.inputWrapper}>
            <Controller
              control={control}
              rules={{
                required: false,
              }}
              render={({field: {onChange, value}}) => (
                <Dropdown
                  data={jobLevel}
                  disable={isLoading}
                  placeholder="Select Job Level"
                  maxHeight={300}
                  labelField="label"
                  valueField="value"
                  value={value}
                  placeholderStyle={{color: customTextColor.secondary}}
                  selectedTextStyle={{color: customTextColor.primary}}
                  itemTextStyle={{color: customTextColor.secondary}}
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
                    //handleSubmit(item.value)
                    console.log('click' + item.value);
                  }}
                  // onChange={(item) => handleSubmit(item.value)}
                />
              )}
              name="job_level_id"
            />
            {errors.job_level_id && (
              <Text style={styles.errorText}>
                {errors.job_level_id.message}
              </Text>
            )}
          </View>
          <View style={GlobalStyleSheet.inputWrapper}>
            <Controller
              control={control}
              rules={{
                required: false,
              }}
              render={({field: {onChange, value}}) => (
                <Dropdown
                  data={jobCategory}
                  disable={isLoading}
                  placeholder="Select Category"
                  maxHeight={300}
                  labelField="label"
                  valueField="value"
                  value={value}
                  placeholderStyle={{color: customTextColor.secondary}}
                  selectedTextStyle={{color: customTextColor.primary}}
                  itemTextStyle={{color: customTextColor.secondary}}
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
                    //handleSubmit(item.value)
                    console.log('click' + item.value);
                  }}
                  // onChange={(item) => handleSubmit(item.value)}
                />
              )}
              name="job_category_id"
            />
            {errors.job_category_id && (
              <Text style={styles.errorText}>
                {errors.job_category_id.message}
              </Text>
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
                  label="Position"
                  value={value}
                  onChangeText={onChange}
                />
              )}
              name="position"
            />
            {errors.position && (
              <Text style={styles.errorText}>{errors.position.message}</Text>
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
                  label="Duties"
                  value={value}
                  onChangeText={onChange}
                />
              )}
              name="dutis"
            />
            {errors.dutis && (
              <Text style={styles.errorText}>{errors.dutis.message}</Text>
            )}
          </View>
          <View style={GlobalStyleSheet.inputWrapper}>
            <TouchableOpacity onPress={showDatepicker}>
              {/* <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({field: {onChange, value}}) => ( */}
              <>
                {/* <TextInput
                  {...commonTextInputProps}
                  label="Start Date"
                  // value={date}
                  textContentType="date"
                  editable={false}
                  //onChangeText={onChange}
                  ref={startDate}
                /> */}
                <Text> Start Date : {text}</Text>
                <Modal visible={show} onRequestClose={() => setShow(false)}>
                  <View style={styles.modalContainer}>
                    <View style={styles.datePickerContainer}>
                      <DatePicker
                        date={date}
                        mode="date"
                        onDateChange={handleConfirm}
                      />
                      <Button
                        style={{
                          backgroundColor: customThemeColor.darkGreen,
                        }}
                        title="Confirm"
                        onPress={() => setShow(false)}
                      />
                    </View>
                  </View>
                </Modal>
              </>
              {/* )}
                name="start_date"
              /> */}
            </TouchableOpacity>
            {/* {show && (
              // <DateTimePicker
              //   mode="date"
              //   value={date}
              //   display="default"
              //   onChange={onChange}
              //   onTouchCancel={handleCancel}
              // />
             
            )} */}
          </View>
          {/* <View style={GlobalStyleSheet.inputWrapper}>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({field: {onChange, value}}) => (
                <TextInput
                  {...commonTextInputProps}
                  label="End Date"
                  value={value}
                  onChangeText={onChange}
                />
              )}
              name="end_date"
            />
          </View> */}
        </View>
        <View style={GlobalStyleSheet.buttonWrapper}>
          {!id ? (
            <TouchableOpacity
              style={GlobalStyleSheet.button}
              onPress={handleSubmit(onPressAdd)}>
              {isLoading ? (
                <ActivityIndicator
                  animating={true}
                  style={{paddingVertical: 14}}
                  color={customTextColor.white}
                  size={20}
                />
              ) : (
                <Text style={GlobalStyleSheet.buttonText}>Add Experience</Text>
              )}
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={GlobalStyleSheet.button}
              onPress={handleSubmit(onPressUpdate)}>
              <Text style={GlobalStyleSheet.buttonText}>Save Changes</Text>
            </TouchableOpacity>
          )}
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
  input: {
    backgroundColor: 'transparent',
  },
  row: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    flexDirection: 'row',
    marginBottom: 10,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 5,
    justifyContent: 'space-between',
  },
  errorText: {
    color: 'red',
    margin: 0,
    padding: 0,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  datePickerContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
});

export default ExperienceAdd;
