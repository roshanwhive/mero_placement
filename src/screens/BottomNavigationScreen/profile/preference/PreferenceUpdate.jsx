import {useNavigation, useRoute} from '@react-navigation/native';
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import AppBar from '../../../../components/custom_toolbar/AppBar';
import {customTextColor, customThemeColor} from '../../../../constants/Color';
import {customFontSize, customFonts} from '../../../../constants/theme';
import {GlobalStyleSheet} from '../../../../constants/StyleSheet';
import {TextInput} from 'react-native-paper';
import {useEffect, useMemo, useState} from 'react';
import {getPrefFormData} from '../../../../features/formData/FormSlice';
import {useDispatch, useSelector} from 'react-redux';
import {Dropdown} from 'react-native-element-dropdown';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {Controller, useForm} from 'react-hook-form';
import {getSinglePreference} from '../../../../features/profile/preferenceSlice/getSinglePreferenceSlice';
import ProfileAppBar from '../../../../components/custom_toolbar/ProfileAppBar';
import {updatePreference} from '../../../../features/profile/testSlice/PreferenceSlice';

const PreferenceUpdate = pref_id => {
  const navigation = useNavigation();

  const {prefFormData, category, available_type, level, locaton, skill} =
    useSelector(state => state.formOptions);
  const {message, isSuccess, isLoading, isError, statusCode} = useSelector(
    state => state.preferenceTest,
  );

  const {singlePreference, isLoadingSingle} = useSelector(
    state => state.getSinglePreference,
  );

  const dispatch = useDispatch();
  const route = useRoute();
  pref_id = route.params?.pref_id;

  const handleBack = () => {
    navigation.goBack();
  };

  useEffect(() => {
    dispatch(getPrefFormData());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getSinglePreference(pref_id));
  }, [dispatch]);

  const [categoryname, setCategoryname] = useState([]);
  useEffect(() => {
    if (category && Array.isArray(category)) {
      const mappedCategoryList = category.map(item => ({
        label: item.name,
        value: item.job_category_id,
      }));
      setCategoryname(mappedCategoryList);
    }
  }, [category]);

  const [availableType, setAvailableType] = useState([]);
  useEffect(() => {
    if (available_type && Array.isArray(available_type)) {
      const mappedAvailableTypeList = available_type.map(item => ({
        label: item.employment_type,
        value: item.employment_type_id,
      }));
      setAvailableType(mappedAvailableTypeList);
    }
  }, [available_type]);

  const [levelJob, setLevelJob] = useState([]);
  useEffect(() => {
    if (level && Array.isArray(level)) {
      const mappedLevelJobList = level.map(item => ({
        label: item.name,
        value: item.level_id,
      }));
      setLevelJob(mappedLevelJobList);
    }
  }, [level]);

  const [district, setDistrict] = useState([]);
  useEffect(() => {
    if (locaton && Array.isArray(locaton)) {
      const mappedDistrictList = locaton.map(item => ({
        label: item.district_name,
        value: item.district_id,
      }));
      setDistrict(mappedDistrictList);
    }
  }, [locaton]);

  const [skillJob, setSkillJob] = useState([]);
  useEffect(() => {
    if (skill && Array.isArray(skill)) {
      const mappedSkillJobList = skill.map(item => ({
        label: item.skill,
        value: item.skill_id,
      }));
      setSkillJob(mappedSkillJobList);
    }
  }, [skill]);

  const schema = yup.object().shape({
    preferred_job: yup.string().required('Preferred Job is required'),
    expected_salary: yup.string().required('Expected Salary is required'),
    job_categories: yup.string().required('Select Job Category'),
    availible_type: yup.string().required('Select Available Type'),
    level: yup.string().required('Select Level'),
    location: yup.string().required('Select Duties'),
    skill: yup.string().required('Select Skill'),
    id: yup.string(),
  });

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      preferred_job: '',
      expected_salary: '',
      job_categories: '',
      availible_type: '',
      level: '',
      location: '',
      skill: '',
      id: '',
    },
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: {errors},
    setError,
  } = methods;

  useEffect(() => {
    if (singlePreference) {
      reset({
        preferred_job: singlePreference?.title_name || '',
        expected_salary: singlePreference?.expected_salary || '',
        job_categories: singlePreference?.job_category?.job_category_id || '',
        availible_type:
          singlePreference?.availible_type?.employment_type_id || '',
        level: singlePreference?.level?.level_id || '',
        location: singlePreference?.location?.district_id || '',
        skill: singlePreference?.get_skill?.skill_id || '',
        id: singlePreference?.id || '',
      });
    }
  }, [singlePreference, reset]);

  const onPressUpdate = handleSubmit(async prefData => {
    dispatch(updatePreference(prefData)).then(() => {
      navigation.navigate('PreferenceList');
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
        title={'Preference'}
        showIcon={false}
      />
      <ScrollView>
        {isLoadingSingle ? (
          <ActivityIndicator
            animating={true}
            style={{flex: 1, marginTop: 50}}
            color={customTextColor.darkGreen}
            size={20}
          />
        ) : (
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
                    label="Preferred Job"
                    value={value}
                    onChangeText={onChange}
                  />
                )}
                name="preferred_job"
              />
              {errors.preferred_job && (
                <Text style={styles.errorText}>
                  {errors.preferred_job.message}
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
                    label="Expected Salary"
                    value={value}
                    onChangeText={onChange}
                  />
                )}
                name="expected_salary"
              />
              {errors.expected_salary && (
                <Text style={styles.errorText}>
                  {errors.expected_salary.message}
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
                    data={categoryname}
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
                    }}
                  />
                )}
                name="job_categories"
              />
              {errors.job_categories && (
                <Text style={styles.errorText}>
                  {errors.job_categories.message}
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
                    data={availableType}
                    disable={isLoading}
                    placeholder="Select Available Type"
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
                    }}
                  />
                )}
                name="availible_type"
              />
              {errors.availible_type && (
                <Text style={styles.errorText}>
                  {errors.availible_type.message}
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
                    data={levelJob}
                    disable={isLoading}
                    placeholder="Select Level"
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
                    }}
                  />
                )}
                name="level"
              />
              {errors.level && (
                <Text style={styles.errorText}>{errors.level.message}</Text>
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
                    data={district}
                    disable={isLoading}
                    placeholder="Select Location"
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
                    }}
                  />
                )}
                name="location"
              />
              {errors.location && (
                <Text style={styles.errorText}>{errors.location.message}</Text>
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
                    data={skillJob}
                    disable={isLoading}
                    placeholder="Select Skill"
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
                    }}
                  />
                )}
                name="skill"
              />
              {errors.skill && (
                <Text style={styles.errorText}>{errors.skill.message}</Text>
              )}
            </View>

            <View style={GlobalStyleSheet.buttonWrapper}>
              <TouchableOpacity
                style={GlobalStyleSheet.button}
                onPress={handleSubmit(onPressUpdate)}>
                {isLoading ? (
                  <ActivityIndicator
                    animating={true}
                    style={{paddingVertical: 14}}
                    color={customTextColor.white}
                    size={20}
                  />
                ) : (
                  <Text style={GlobalStyleSheet.buttonText}>Save Changes</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: customThemeColor.lightBG,
  },
  title: {
    color: customTextColor.primary,
    fontFamily: customFonts.fontPoppins,
    fontSize: customFontSize.font22,
    paddingHorizontal: 20,
    marginTop: 20,
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
  errorText: {
    color: 'red',
    margin: 0,
    padding: 0,
  },
  body: {
    backgroundColor: customThemeColor.white,
    borderTopLeftRadius: 20,
    borderTopEndRadius: 20,
  },
});

export default PreferenceUpdate;
