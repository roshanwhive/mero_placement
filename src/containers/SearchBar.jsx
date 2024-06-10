import React, {useEffect, useState} from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  FlatList,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {customTextColor, customThemeColor} from '../constants/Color';
import AppBar from '../components/custom_toolbar/AppBar';
import {customFontSize, customFonts} from '../constants/theme';
import {useDispatch, useSelector} from 'react-redux';
import {getSearchJob} from '../features/search/SearchJobSlice';
import JobCard from '../components/JobCard';
import {useNavigation} from '@react-navigation/native';
import {GlobalStyleSheet} from '../constants/StyleSheet';

const useDebouncedValue = (inputValue, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(inputValue);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(inputValue);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [inputValue, delay]);

  return debouncedValue;
};

const SearchBar = () => {
  const [value, setValue] = useState('');

  const debouncedSearchTerm = useDebouncedValue(value, 1500);

  const navigation = useNavigation();

  const dispatch = useDispatch();

  const {searchJob} = useSelector(state => state.searchJob);

  useEffect(() => {
    if (debouncedSearchTerm) {
      dispatch(getSearchJob(debouncedSearchTerm));
    }
  }, [debouncedSearchTerm, dispatch]);

  return (
    <View>
      <AppBar />
      <View style={styles.searchBar}>
        <View style={styles.searchInputContainer}>
          <Icon name="search" size={15} color={customTextColor.secondary} />
          <TextInput
            placeholderTextColor="#706f6f"
            placeholder="Search Jobs"
            style={styles.searchInput}
            value={value}
            onChangeText={text => {
              setValue(text);
            }}
            // onChange={e => setValue(e.target.value)}
          />
        </View>
      </View>
      <ScrollView
        contentContainerStyle={GlobalStyleSheet.scrollViewContentStatus}
        style={GlobalStyleSheet.scrollViewContent}>
        <View style={styles.bodyContent}></View>
      </ScrollView>
      {searchJob.length > 0 && debouncedSearchTerm.length > 2 ? (
        searchJob?.map((item, index) => {
          return (
            <View key={index} style={GlobalStyleSheet.cardContainer}>
              <JobCard navigation={navigation} items={item} />
              <View></View>
            </View>
          );
        })
      ) : (
        <View>
          <Text style={styles.noResults}>No results found</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  noResults: {
    textAlign: 'center',
    marginTop: 16,
    color: 'black',
  },
  item: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  searchInputContainer: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    padding: 2,
    borderRadius: 10,
    paddingHorizontal: 30,
    shadowColor: 'rgba(150,170,180,0.5)',
    shadowOffset: {width: 0, height: 7},
    shadowOpacity: 1,
    shadowRadius: 30,
    elevation: 10,
    backgroundColor: customThemeColor.white,
    marginTop: 20,
  },
  searchInput: {
    marginLeft: 10,
    flex: 1,
    color: customTextColor.secondary,
  },
  bodyContent: {
    margin: 15,
  },
  flexCard: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: customFontSize.font16,
    color: customTextColor.primary,
    fontFamily: customFonts.font,
  },
  viewAll: {
    color: customTextColor.lightGreen,
    fontFamily: customFonts.font,
    textDecorationLine: 'underline',
    paddingRight: 3,
  },
});

export default SearchBar;
