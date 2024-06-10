import {useNavigation, useRoute} from '@react-navigation/native';
import {
  ActivityIndicator,
  Button,
  Modal,
  Platform,
  Pressable,
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
import {getSingleExperience} from '../../../../features/profile/experienceSlice/getSingleExperienceSlice';
import ProfileAppBar from '../../../../components/custom_toolbar/ProfileAppBar';
import {format} from 'date-fns';
import DateTimePicker from '@react-native-community/datetimepicker';
import {addExperience} from '../../../../features/profile/testSlice/ExperienceSlice';

const ExperienceAdd = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [showStart, setShowStart] = useState(false);
  const [showEnd, setShowEnd] = useState(false);

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const {organization_type, job_level, job_category} = useSelector(
    state => state.formOptions,
  );
  const {isLoading, allExperience} = useSelector(state => state.experienceTest);

  const {singleExperience} = useSelector(state => state.getSingleExperience);

  const formatDate = date => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    dispatch(getExpFormData());
  }, [dispatch]);

  const showDatepicker = () => {
    setShowStart(!showStart);
  };
  const showDatepickerEnd = () => {
    setShowEnd(!showEnd);
  };

  const handleStartDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || startDate;
    setShowStart(Platform.OS === 'ios');
    setStartDate(formatDate(currentDate));
  };

  const handleEndDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || endDate;
    setShowEnd(Platform.OS === 'ios');
    setEndDate(formatDate(currentDate));
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
    start_date: yup.date().required('Start date field is required'),
    end_date: yup.date(),
    experience_id: yup.string(),
  });

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      organization_name: '',
      organization_type_id: '',
      job_level_id: '',
      job_category_id: '',
      position: '',
      dutis: '',
      start_date: '',
      end_date: '',
      experience_id: '',
    },
  });

  const {
    control,
    reset,
    handleSubmit,
    formState: {errors},
    setError,
  } = methods;

  const onPressAdd = handleSubmit(async experienceData => {
    dispatch(addExperience(experienceData)).then(() => {
      navigation.navigate('ExperienceList');
    });
    console.log('expData', experienceData);
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
            {errors.position && (
              <Text style={styles.errorText}>{errors.position.message}</Text>
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
            <Controller
              control={control}
              name="start_date"
              //defaultValue={date}
              rules={{required: true}}
              render={({field: {onChange, value}}) => (
                <View>
                  <TouchableOpacity onPress={() => setShowStart(true)}>
                    {showStart && (
                      <DateTimePicker
                        testID="startDatePicker"
                        value={value || startDate}
                        mode="date"
                        display="default"
                        onChange={(event, date) => {
                          console.log('field', date);
                          onChange(date);
                          handleStartDateChange(event, date);
                        }}
                      />
                    )}
                    <TextInput
                      label="Start Date"
                      placeholder="YYYY-MM-DD"
                      value={formatDate(value || startDate)}
                      {...commonTextInputProps}
                      editable={false}
                    />
                    {errors.start_date && (
                      <Text style={styles.errorText}>
                        {errors.start_date.message}
                      </Text>
                    )}
                  </TouchableOpacity>
                </View>
              )}
            />
          </View>
          <View style={GlobalStyleSheet.inputWrapper}>
            <Controller
              control={control}
              name="end_date"
              defaultValue={endDate}
              rules={{required: true}}
              render={({field: {onChange, value}}) => (
                <View>
                  <TouchableOpacity onPress={() => setShowEnd(true)}>
                    {showEnd && (
                      <DateTimePicker
                        testID="endDatePicker"
                        value={value || endDate}
                        mode="date"
                        display="default"
                        onChange={(event, date) => {
                          onChange(date);
                          handleEndDateChange(event, date);
                        }}
                      />
                    )}
                    <TextInput
                      label="End Date"
                      placeholder="YYYY-MM-DD"
                      value={formatDate(value || endDate)}
                      {...commonTextInputProps}
                      editable={false}
                    />
                    {errors.end_date && (
                      <Text style={styles.errorText}>
                        {errors.end_date.message}
                      </Text>
                    )}
                  </TouchableOpacity>
                </View>
              )}
            />
          </View>
        </View>
        <View style={GlobalStyleSheet.buttonWrapper}>
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
