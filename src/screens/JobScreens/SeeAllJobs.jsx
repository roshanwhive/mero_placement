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
import {getAllJobs} from '../../features/job/JobSlice';
import {ActivityIndicator} from 'react-native-paper';
import {customTextColor, customThemeColor} from '../../constants/Color';
import {Dropdown} from 'react-native-element-dropdown';
import {getAllCategories} from '../../features/formData/FormSlice';

const data = [
  {label: 'Item Hello world I am 1', value: '1'},
  {label: 'Item 2', value: '2'},
  {label: 'Item 3', value: '3'},
  {label: 'Item 4', value: '4'},
  {label: 'Item 5', value: '5'},
  {label: 'Item 6', value: '6'},
  {label: 'Item 7', value: '7'},
  {label: 'Item 8', value: '8'},
];

const SeeAllJobs = ({navigation}) => {
  const dispatch = useDispatch();
  const {allJobs, jobCategories} = useSelector(state => state.job);

  const [value, setValue] = useState(null);

  const renderItem = item => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.name}</Text>
        {item.value === value && (
          <Icon
            style={styles.icon}
            color={customTextColor.lightGreen}
            name="check"
            size={20}
          />
        )}
      </View>
    );
  };

  useEffect(() => {
    setTimeout(() => {
      dispatch(getAllJobs());
      dispatch(getAllCategories());
    }, 200);
  }, [dispatch]);

  useEffect(() => {
    console.log(jobCategories);
  }, [jobCategories]);

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
            <Dropdown
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={jobCategories}
              search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder="Select item"
              searchPlaceholder="Search..."
              value={value}
              onChange={item => {
                setValue(item.value);
              }}
              renderLeftIcon={() => (
                <Icon
                  style={styles.icon}
                  color={customTextColor.lightGreen}
                  name="check"
                  size={20}
                />
              )}
              renderItem={renderItem}
            />
          </TouchableOpacity>
        </ScrollView>
      </View>

      <ScrollView
        horizontal={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}>
        {allJobs?.data ? (
          allJobs?.data?.map((item, index) => {
            return (
              <View key={index}>
                <JobCard navigation={navigation} items={item} />
              </View>
            );
          })
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
    fontWeight: 'bold',
    color: '#11401E',
    fontSize: 20,
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
    backgroundColor: 'white',
    padding: 16,
  },
  dropdown: {
    height: 50,
    minWidth: 200,
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 12,
    shadowColor: '#fcfcfc',
    borderWidth: 1,
    borderColor: customThemeColor.lightBG,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  icon: {
    marginRight: 5,
  },
  item: {
    padding: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textItem: {
    flex: 1,
    fontSize: 16,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    borderRadius: 10,
  },
});

export default SeeAllJobs;
