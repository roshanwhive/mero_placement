import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {customTextColor, customThemeColor} from '../../constants/Color';
import AppBar from '../../components/custom_toolbar/AppBar';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {getAllCategories} from '../../features/formData/FormSlice';
import {getJobCategories} from '../../features/job/JobSlice';

const AllCategoriesScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {jobCategories} = useSelector(state => state.job);

  // Filtered categories state
  const [filteredCategories, setFilteredCategories] = useState(jobCategories);

  useEffect(() => {
    dispatch(getAllCategories());
    dispatch(getJobCategories());
  }, [dispatch]);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredCategories(jobCategories);
    } else {
      const filteredData = jobCategories?.filter(category =>
        category?.name?.toLowerCase().includes(searchQuery.toLowerCase()),
      );
      setFilteredCategories(filteredData);
    }
  }, [jobCategories, searchQuery]);

  const renderItem = ({item}) => (
    <TouchableOpacity style={styles.card}>
      <Text style={styles.title}>{item?.name}</Text>
    </TouchableOpacity>
  );

  const handleBack = () => {
    navigation.goBack();
  };

  const handleSearch = text => {
    setSearchQuery(text);
  };

  return (
    <View style={styles.container}>
      {/* App bar */}
      <AppBar handleBack={handleBack} title="Categories" />

      {/* Search input */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Browse categories..."
          onChangeText={handleSearch}
          value={searchQuery}
        />
      </View>

      {/* FlatList with filtered categories */}
      <FlatList
        data={filteredCategories}
        renderItem={renderItem}
        keyExtractor={item => item?.job_category_id?.toString()}
        numColumns={2}
        contentContainerStyle={styles.categoryList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: customThemeColor.lightBG,
  },
  searchContainer: {
    flexDirection: 'row',
    marginHorizontal: 16,
    alignItems: 'center',
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    marginTop: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: customThemeColor.lighterBg,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: customThemeColor.lightBG,
  },
  categoryList: {
    paddingBottom: 20,
    marginHorizontal: 16,
  },
  card: {
    flex: 1,
    margin: 8,
    borderRadius: 8,
    backgroundColor: customThemeColor.white,
    shadowColor: 'rgba(150,170,180,0.5)',
    shadowOffset: {width: 0, height: 7},
    shadowOpacity: 1,
    shadowRadius: 30,
    elevation: 10,
    alignItems: 'center',
  },
  image: {
    width: 60,
    height: 60,
    marginTop: 25,
  },
  title: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 15,
    textAlign: 'center',
    color: customTextColor.darkRed,
  },
});

export default AllCategoriesScreen;
