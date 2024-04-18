import React from 'react';
import {View, TextInput, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {customTextColor, customThemeColor} from '../constants/Color';
import AppBar from '../components/custom_toolbar/AppBar';

const SearchBar = () => {
  return (
    <View>
      <AppBar />
      <View style={styles.searchBar}>
        <View style={styles.searchInputContainer}>
          <Icon name="search" size={25} color={customTextColor.secondary} />
          <Text>|</Text>
          <TextInput placeholder="Search Jobs" style={styles.searchInput} />
        </View>
      </View>
      <View style={styles.bodyContent}>
        <View style={styles.flexCard}>
          <Text style={styles.title}>Recent Search</Text>
          <Text style={styles.viewAll}>Cear All</Text>
        </View>
      </View>
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
    fontSize: 16,
    color: customTextColor.primary,
  },
  viewAll: {
    color: customTextColor.lightGreen,
    fontWeight: '500',
    textDecorationLine: 'underline',
    paddingRight: 3,
  },
});

export default SearchBar;
