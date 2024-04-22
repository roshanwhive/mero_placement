import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  getJobByCategory,
  getJobCategories,
  getMainCategories,
} from '../features/job/JobSlice';
import { useNavigation } from '@react-navigation/native';
import CategoryCardCircle from './skeleton_loader/CategoryCardCircle';
import { customFontSize, customFonts } from '../constants/theme';
import { customTextColor, customThemeColor } from '../constants/Color';
import { GlobalStyleSheet } from '../constants/StyleSheet';
import Icon from 'react-native-vector-icons/FontAwesome5';

const Categories = () => {
  const [activeCategory, setActiveCategory] = useState(null);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const { mainCategories } = useSelector(state => state.job);

  useEffect(() => {
    dispatch(getMainCategories());
    dispatch(getJobCategories());
  }, [dispatch]);

  const handleCategoryClick = categoryId => {
    navigation.navigate('SeeAllJobs');
    dispatch(getJobByCategory(categoryId));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={GlobalStyleSheet.Hometitle}>Jobs By Category</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('AllCategories')}>
          <Text style={GlobalStyleSheet.seeAll}>See All</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}>
        {mainCategories.length !== 0 ? (
          mainCategories?.map((category, index) => {
            return (
              <View key={index} style={styles.categoryItem}>
                <TouchableOpacity
                  onPress={() => handleCategoryClick(category?.job_category_id)}
                  style={styles.imageContainer}>
                  <Icon
                    name={category?.icons}
                    size={20}
                    color={customTextColor.darkRed}
                  />
                </TouchableOpacity>
                <Text style={styles.categoryName}>{category?.name}</Text>
              </View>
            );
          })
        ) : (
          <>
            <CategoryCardCircle />
            <CategoryCardCircle />
            <CategoryCardCircle />
            <CategoryCardCircle />
            <CategoryCardCircle />
            <CategoryCardCircle />
          </>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    marginVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
  },

  container: {
    marginTop: 4,
  },

  scrollViewContent: {
    paddingHorizontal: 15,
  },
  categoryItem: {
    flexDirection: 'column',
    alignItems: 'center',
    marginRight: 6,
  },
  imageContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    width: 40,
    padding: 5,
    borderRadius: 100,
    shadowColor: '#000',
    marginHorizontal: 5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    backgroundColor: customThemeColor.lightBG,
  },

  categoryName: {
    width: 100,
    marginTop: 5,
    fontSize: 11,
    fontFamily: customFonts.font,
    color: customTextColor.secondary,
    textAlign: 'center',
  },
});

export default Categories;
