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

const SeeAllJobs = ({navigation}) => {
  const dispatch = useDispatch();
  const {allJobs, jobCategories} = useSelector(state => state.job);

  const [category, setCategory] = useState(null);
  const [isFocusCategory, setIsFocusCategory] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      // dispatch(getAllJobs());
      dispatch(getAllCategories());
    }, 200);
  }, [dispatch]);

  useEffect(() => {
    console.log(allJobs);
  }, [allJobs]);

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
                iconStyle={styles.iconStyle}
                data={jobCategories}
                search
                maxHeight={300}
                labelField="name"
                valueField="name"
                placeholder={!isFocusCategory ? 'Select Category' : '...'}
                searchPlaceholder="Search..."
                value={category}
                onFocus={() => setIsFocusCategory(true)}
                onBlur={() => setIsFocusCategory(false)}
                onChange={item => {
                  setCategory(item?.name);
                  setIsFocusCategory(false);
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
                    size={20}
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
  },
});

export default SeeAllJobs;
