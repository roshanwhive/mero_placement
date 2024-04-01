import React from 'react';
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

const categoriesData = [
  {
    id: 1,
    title: 'Category 1',
    image: require('../../assets/categories/commercial.png'),
  },
  {
    id: 2,
    title: 'Category 2',
    image: require('../../assets/categories/designing.png'),
  },
  {
    id: 3,
    title: 'Category 3',
    image: require('../../assets/categories/finance.png'),
  },
  {
    id: 43,
    title: 'Category 3',
    image: require('../../assets/categories/finance.png'),
  },
  {
    id: 21,
    title: 'Category 1',
    image: require('../../assets/categories/commercial.png'),
  },
  {
    id: 22,
    title: 'Category 2',
    image: require('../../assets/categories/designing.png'),
  },
  {
    id: 8,
    title: 'Category 3',
    image: require('../../assets/categories/finance.png'),
  },
  {
    id: 9,
    title: 'Category 3',
    image: require('../../assets/categories/finance.png'),
  },
];
const AllCategoriesScreen = () => {
  const navigation = useNavigation();
  const renderItem = ({item}) => (
    <TouchableOpacity style={styles.card}>
      <Image source={item.image} style={styles.image} resizeMode="contain" />
      <Text style={styles.title}>{item.title}</Text>
    </TouchableOpacity>
  );

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <AppBar handleBack={handleBack} title="Categories" />
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Browse categories..."
        />
      </View>
      <FlatList
        data={categoriesData}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
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
