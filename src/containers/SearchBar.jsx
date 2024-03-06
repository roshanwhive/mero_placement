import React from 'react';
import {View, TextInput, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const SearchBar = () => {
  return (
    <View style={styles.searchBar}>
      <View style={styles.searchInputContainer}>
        <Icon name="search" size={25} color="#919191" />
        <TextInput placeholder="Search Jobs" style={styles.searchInput} />
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
    borderRadius: 30,
    borderWidth: 1,
    paddingHorizontal: 30,
    borderColor: '#ccc',
    backgroundColor: '#ffffff',
    marginVertical: 20,
  },
  searchInput: {
    marginLeft: 10,
    flex: 1,
  },
});

export default SearchBar;
