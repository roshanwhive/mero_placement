import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import SearchBar from '../../containers/SearchBar';
import {customThemeColor} from '../../constants/Color';

const Search = () => {
  return (
    <View style={styles.searchContainer}>
      <SearchBar />
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    backgroundColor: customThemeColor.lightBG,
    height: '100%',
  },
});
export default Search;
