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
import {customTextColor, customThemeColor} from '../../../../constants/Color';
import {customFontSize, customFonts} from '../../../../constants/theme';
import {GlobalStyleSheet} from '../../../../constants/StyleSheet';
import {TextInput} from 'react-native-paper';
import {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {Controller, useForm} from 'react-hook-form';

import {Dropdown} from 'react-native-element-dropdown';
import {getEduFormData} from '../../../../features/formData/FormSlice';
import ProfileAppBar from '../../../../components/custom_toolbar/ProfileAppBar';
import DateTimePicker from '@react-native-community/datetimepicker';
import {addEducation} from '../../../../features/profile/testSlice/EducationSlice';

const EducationAdd = () => {
  const navigation = useNavigation();

  const {degree, eduFormData} = useSelector(state => state.formOptions);
  const {isLoading, allEducation} = useSelector(state => state.educationTest);

  const dispatch = useDispatch();

  const [selectedtab, setSelectedtab] = useState('passed');
  const [passed, setPassed] = useState('passed');
  const [pursuing, setPursuing] = useState('pursuing');

  const [showStart, setShowStart] = useState(false);
  const [showEnd, setShowEnd] = useState(false);

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const formatDate = date => {
    if (!date) return ''; // Handle case when date is null or undefined
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const showDatepicker = () => {
    setShowStart(!showStart);
  };
  const showDatepickerEnd = () => {
    setShowEnd(!showEnd);
  };

  const handleStartDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || startDate;
    setShowStart(Platform.OS === 'ios');
    setStartDate(currentDate);
  };

  const handleEndDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || endDate;
    setShowEnd(Platform.OS === 'ios');
    setEndDate(currentDate);
  };

  useEffect(() => {
    dispatch(getEduFormData());
  }, [dispatch]);

  const handleBack = () => {
    navigation.goBack();
  };

  const [degreetype, setDegreetype] = useState([]);
  useEffect(() => {
    if (degree && Array.isArray(degree)) {
      const mappedDegTypeList = degree.map(item => ({
        label: item.deg_type_name,
        value: item.deg_type_id,
      }));
      setDegreetype(mappedDegTypeList);
    }
  }, [degree]);

  const schema = yup.object().shape({
    college: yup.string().required('College field is required'),
    university: yup.string().required('University field is required'),
    deg_type: yup.string().required('Degree field is required'),
    start_date: yup.date().required('Start date field is required'),
    status: yup.string(),
    percentage: yup
      .string()
      .test(
        'conditional-required',
        'Percentage field is required',
        function (value) {
          const status = this.parent.status; // Accessing status from the parent object
          if (status === 'passed') {
            return value !== undefined && value !== ''; // Check if the percentage is not undefined or empty
          }
          return true; // If status is not 'passed', validation passes regardless of percentage field
        },
      ),

    end_date: yup
      .date()
      .test(
        'conditional-required',
        'End date field is required',
        function (value) {
          const status = this.parent.status; // Accessing status from the parent object
          if (status === 'passed') {
            return value !== undefined && value !== ''; // Check if the percentage is not undefined or empty
          }
          return true; // If status is not 'passed', validation passes regardless of percentage field
        },
      ),
    education_id: yup.string(),
  });

  const {
    control,
    handleSubmit,
    formState: {errors, isSubmitting},
    setError,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      college: '',
      university: '',
      status: 'passed',
      deg_type: '',
      percentage: '',
      start_date: '',
      end_date: '',
      education_id: '',
    },
  });

  const onPressAdd = handleSubmit(async eduData => {
    dispatch(addEducation(eduData)).then(() => {
      navigation.navigate('EducationList');
      console.log('eduDataAdd', eduData);
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
        title={'Education'}
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
                  label="College"
                  value={value}
                  onChangeText={onChange}
                />
              )}
              name="college"
            />
            {errors.college && (
              <Text style={styles.errorText}>{errors.college.message}</Text>
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
                  label="University"
                  value={value}
                  onChangeText={onChange}
                />
              )}
              name="university"
            />
            {errors.university && (
              <Text style={styles.errorText}>{errors.university.message}</Text>
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
                  disable={isLoading}
                  data={degreetype}
                  placeholder="Select Degree Type"
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
                    console.log('click' + value);
                  }}
                  // onChange={(item) => handleSubmit(item.value)}
                />
              )}
              name="deg_type"
            />
            {errors.deg_type && (
              <Text style={styles.errorText}>{errors.deg_type.message}</Text>
            )}
          </View>
          <View style={GlobalStyleSheet.inputWrapper1}>
            <View style={styles.row}>
              <Text disabled={isLoading} style={styles.subTitle1}>
                Currently Studying
              </Text>

              <Controller
                control={control}
                rules={{
                  required: false,
                }}
                render={({field: {onChange, value}}) => (
                  <View
                    style={{
                      width: '90%',
                      height: 40,
                      borderWidth: 0.5,
                      borderRadius: 15,
                      backgroundColor: 'white',
                      flexDirection: 'row',
                      alignItems: 'center',
                      paddingLeft: 5,
                      paddingRight: 5,
                    }}>
                    <TouchableOpacity
                      style={{
                        width: '50%',
                        height: 30,
                        backgroundColor:
                          selectedtab == 'passed' ? '#11401E' : 'white',
                        borderRadius: 15,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                      onPress={() => {
                        setSelectedtab('passed');
                        onChange('passed');

                        console.log('pressfirst', value);
                      }}>
                      <Text
                        disabled={isLoading}
                        style={{
                          color: selectedtab == 'passed' ? 'white' : 'black',
                        }}>
                        {passed}
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={{
                        width: '50%',
                        height: 30,
                        backgroundColor:
                          selectedtab == 'pursuing' ? '#11401E' : 'white',
                        borderRadius: 15,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                      onPressIn={() => {
                        setSelectedtab('pursuing');
                        onChange('pursuing');
                        console.log('presssecond', value);
                      }}>
                      <Text
                        disabled={isLoading}
                        style={{
                          color: selectedtab == 'pursuing' ? 'white' : 'black',
                        }}>
                        {pursuing}
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
                name="status"
              />
            </View>
          </View>
          <View style={GlobalStyleSheet.inputWrapper}>
            <Controller
              control={control}
              name="start_date"
              // defaultValue={startDate}
              rules={{required: true}}
              render={({field: {onChange, value}}) => (
                <View>
                  <TouchableOpacity onPress={() => setShowStart(true)}>
                    {showStart && (
                      <DateTimePicker
                        testID="startDatePicker"
                        value={value || startDate}
                        mode="date"
                        // display="default"
                        onChange={(event, date) => {
                          console.log('field', date);
                          onChange(date);
                          handleStartDateChange(event, date);
                        }}
                      />
                    )}
                    <TextInput
                      {...commonTextInputProps}
                      label="Start Date"
                      placeholder=""
                      value={formatDate(value || startDate)}
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
          {selectedtab == 'passed' ? (
            <>
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
                          {...commonTextInputProps}
                          label="End Date"
                          placeholder="YYYY-MM-DD"
                          value={formatDate(value || endDate)}
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
              <View style={GlobalStyleSheet.inputWrapper}>
                <Controller
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({field: {onChange, value}}) => (
                    <TextInput
                      {...commonTextInputProps}
                      label="Percentage"
                      keyboardType="numeric"
                      value={value}
                      onChangeText={onChange}
                    />
                  )}
                  name="percentage"
                />
                {errors.percentage && (
                  <Text style={styles.errorText}>
                    {errors.percentage.message}
                  </Text>
                )}
              </View>
            </>
          ) : null}

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
                <Text style={GlobalStyleSheet.buttonText}>Add Education</Text>
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

export default EducationAdd;
