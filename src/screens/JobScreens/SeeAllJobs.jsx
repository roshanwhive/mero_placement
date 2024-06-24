import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import JobCard from '../../components/JobCard';
import Icon from 'react-native-vector-icons/Feather';
import {useDispatch, useSelector} from 'react-redux';
import {
  getAllJobs,
  getCompanyTypes,
  getEmploymentTypes,
  getJobByCategory,
  getJobByCompanyTypes,
  getJobByEmploymentTypes,
  getJobByJobTypes,
  getJobTypes,
} from '../../features/job/JobSlice';
import {ActivityIndicator} from 'react-native-paper';
import {customTextColor, customThemeColor} from '../../constants/Color';
import {Dropdown} from 'react-native-element-dropdown';
import {getAllCategories} from '../../features/formData/FormSlice';
import {customFontSize, customFonts} from '../../constants/theme';

const SeeAllJobs = ({navigation}) => {
  const dispatch = useDispatch();
  const {
    allJobs,
    jobCategories,
    isLoading,
    companyTypes,
    employmentTypes,
    jobTypes,
  } = useSelector(state => state.job);

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [selectedEmployment, setSelectedEmployment] = useState(null);
  const [selectedJob, setselectedJob] = useState(null);

  const [isFocusCategory, setIsFocusCategory] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      dispatch(getAllCategories());
      dispatch(getCompanyTypes());
      dispatch(getEmploymentTypes());
      dispatch(getJobTypes());
    }, 200);
  }, [dispatch]);

  const [categoryTypeList, setCategoryTypeList] = useState([]);
  useEffect(() => {
    if (jobCategories && Array.isArray(jobCategories)) {
      const mappedCatTypeList = jobCategories.map(item => ({
        label: item.name,
        value: item.job_category_id,
      }));
      setCategoryTypeList(mappedCatTypeList);
    }
  }, [jobCategories]);

  const [companyTypeList, setCompanyTypeList] = useState([]);
  useEffect(() => {
    if (companyTypes && Array.isArray(companyTypes)) {
      const mappedCompanyTypeList = companyTypes.map(item => ({
        label: item.name,
        value: item.company_type_id,
      }));
      setCompanyTypeList(mappedCompanyTypeList);
    }
  }, [companyTypes]);

  const [employmentTypeList, setEmploymentTypeList] = useState([]);
  useEffect(() => {
    if (employmentTypes && Array.isArray(employmentTypes)) {
      const mappedEmploymentTypeList = employmentTypes.map(item => ({
        label: item.employment_type,
        value: item.employment_type_id,
      }));
      setEmploymentTypeList(mappedEmploymentTypeList);
    }
  }, [employmentTypes]);

  const [jobTypesList, setJobTypesList] = useState([]);
  useEffect(() => {
    if (jobTypes && Array.isArray(jobTypes)) {
      const mappedJobTypeList = jobTypes.map(item => ({
        label: item.name,
        value: item.slug,
      }));
      setJobTypesList(mappedJobTypeList);
    }
  }, [jobTypes]);

  const handleCategoryClick = categoryId => {
    dispatch(getJobByCategory(categoryId));
  };
  const handleEmploymentClick = employmentId => {
    dispatch(getJobByEmploymentTypes(employmentId));
  };
  const handleCompanyClick = companyId => {
    dispatch(getJobByCompanyTypes(companyId));
  };
  const handleJobClick = slug => {
    dispatch(getJobByJobTypes(slug));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerCard}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-left" size={25} color="#11401E" />
          </TouchableOpacity>
          <Text style={styles.title}>Total Jobs</Text>
        </View>
      </View>
      <View style={styles.filterContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollViewContentFilter}>
          <TouchableOpacity style={styles.filterButton}>
            <View style={styles.containerDropdown}>
              <Dropdown
                style={[
                  styles.dropdown,
                  isFocusCategory && {borderColor: 'blue'},
                ]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                itemTextStyle={{color: customTextColor.secondary}}
                iconStyle={styles.iconStyle}
                data={categoryTypeList}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder="Select Category"
                searchPlaceholder="Search..."
                value={selectedCategory}
                onFocus={() => setIsFocusCategory(true)}
                onBlur={() => setIsFocusCategory(false)}
                onChange={item => {
                  // setCategoryTypeList(item?.value);
                  // setIsFocusCategory(false);
                  setSelectedCategory(item?.value);
                  handleCategoryClick(item?.value);
                }}
                renderLeftIcon={() => (
                  <Icon
                    style={styles.icon}
                    color={
                      isFocusCategory
                        ? customTextColor.darkRed
                        : customTextColor.primary
                    }
                    name="check-circle"
                    size={15}
                  />
                )}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterButton}>
            <View style={styles.containerDropdown}>
              <Dropdown
                style={[
                  styles.dropdown,
                  isFocusCategory && {borderColor: 'blue'},
                ]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                itemTextStyle={{color: customTextColor.secondary}}
                iconStyle={styles.iconStyle}
                data={employmentTypeList}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder="Select employment type"
                searchPlaceholder="Search..."
                value={selectedEmployment}
                onFocus={() => setIsFocusCategory(true)}
                onBlur={() => setIsFocusCategory(false)}
                onChange={item => {
                  setSelectedEmployment(item?.value);
                  setIsFocusCategory(false);
                  handleEmploymentClick(item?.value);
                }}
                renderLeftIcon={() => (
                  <Icon
                    style={styles.icon}
                    color={
                      isFocusCategory
                        ? customTextColor.darkRed
                        : customTextColor.primary
                    }
                    name="check-circle"
                    size={15}
                  />
                )}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterButton}>
            <View style={styles.containerDropdown}>
              <Dropdown
                style={[
                  styles.dropdown,
                  isFocusCategory && {borderColor: 'blue'},
                ]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                itemTextStyle={{color: customTextColor.secondary}}
                iconStyle={styles.iconStyle}
                data={companyTypeList}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder="Select company type"
                searchPlaceholder="Search..."
                value={selectedCompany}
                onFocus={() => setIsFocusCategory(true)}
                onBlur={() => setIsFocusCategory(false)}
                onChange={item => {
                  setSelectedCompany(item?.value);
                  setIsFocusCategory(false);
                  handleCompanyClick(item?.value);
                }}
                renderLeftIcon={() => (
                  <Icon
                    style={styles.icon}
                    color={
                      isFocusCategory
                        ? customTextColor.darkRed
                        : customTextColor.primary
                    }
                    name="check-circle"
                    size={15}
                  />
                )}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterButton}>
            <View style={styles.containerDropdown}>
              <Dropdown
                style={[
                  styles.dropdown,
                  isFocusCategory && {borderColor: 'blue'},
                ]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                itemTextStyle={{color: customTextColor.secondary}}
                iconStyle={styles.iconStyle}
                data={jobTypesList}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder="Select jobs type"
                searchPlaceholder="Search..."
                value={selectedJob}
                onFocus={() => setIsFocusCategory(true)}
                onBlur={() => setIsFocusCategory(false)}
                onChange={item => {
                  setselectedJob(item?.value);
                  setIsFocusCategory(false);
                  handleJobClick(item?.value);
                }}
                renderLeftIcon={() => (
                  <Icon
                    style={styles.icon}
                    color={
                      isFocusCategory
                        ? customTextColor.darkRed
                        : customTextColor.primary
                    }
                    name="check-circle"
                    size={15}
                  />
                )}
              />
            </View>
          </TouchableOpacity>
        </ScrollView>
      </View>

      <ScrollView
        horizontal={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}>
        {allJobs?.data && isLoading !== true ? (
          allJobs.data.length > 0 ? (
            allJobs.data.map((item, index) => {
              return (
                <View key={index}>
                  <JobCard navigation={navigation} items={item} />
                </View>
              );
            })
          ) : (
            <View
              style={{
                marginTop: 100,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={styles.title}>No jobs available</Text>
            </View>
          )
        ) : (
          <View style={{marginTop: 100}}>
            <ActivityIndicator
              animating={true}
              style={{marginTop: 40}}
              color={customTextColor.lightGreen}
            />
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10,
    backgroundColor: customThemeColor.lightBG,
  },
  header: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  headerCard: {
    display: 'flex',
    flexDirection: 'row',
  },
  title: {
    fontFamily: customFonts.fontPoppins,
    color: '#11401E',
    fontSize: customFontSize.font20,
    paddingLeft: 10,
  },
  scrollViewContentFilter: {
    paddingVertical: 5,
    gap: 10,
    overflow: 'visible',
  },
  filterContainer: {
    display: 'flex',
    gap: 10,
    marginLeft: 5,
    flexDirection: 'row',
    marginVertical: 15,
  },
  filterButton: {},
  categoryTitle: {
    color: '#11401E',
    fontSize: 16,
  },
  scrollViewContent: {
    paddingVertical: 5,
    overflow: 'visible',
  },

  // Dropdown
  containerDropdown: {
    marginHorizontal: 10,
  },
  dropdown: {
    height: 50,
    backgroundColor: customThemeColor.white,
    borderRadius: 8,
    paddingHorizontal: 8,
    minWidth: 200,
  },
  icon: {
    marginRight: 10,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: customFontSize.font16,
    color: customTextColor.secondary,
  },
  selectedTextStyle: {
    fontSize: customFontSize.font16,
    color: customTextColor.secondary,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: customFontSize.font16,
    color: customTextColor.secondary,
  },
});

export default SeeAllJobs;
