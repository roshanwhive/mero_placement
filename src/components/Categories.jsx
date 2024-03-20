import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import {categories} from '../constants';
import {useDispatch, useSelector} from 'react-redux';
import {getJobCategories} from '../features/job-category/JobSlice';

const Categories = () => {
  const [activeCategory, setActiveCategory] = useState(null);

  const dispatch = useDispatch();

  const {jobCategories} = useSelector(state => state.jobCategory);

  useEffect(() => {
    dispatch(getJobCategories());
  }, [dispatch]);
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Jobs By Category</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}>
        {categories.map((category, index) => {
          const isActive = category.id == activeCategory;
          const btnStyle = isActive
            ? styles.activeButton
            : styles.inactiveButton;
          const textStyle = isActive ? styles.activeText : styles.inactiveText;
          return (
            <View key={index} style={styles.categoryItem}>
              <TouchableOpacity
                onPress={() => setActiveCategory(category.id)}
                style={[styles.imageContainer, btnStyle]}>
                <Image style={styles.image} source={category.image} />
              </TouchableOpacity>
              <Text style={[styles.categoryName, textStyle]}>
                {category.name}
              </Text>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 4,
  },
  titleText: {
    fontSize: 20,
    paddingHorizontal: 10,
    marginVertical: 10,
    fontWeight: '600',
    color: '#11401E',
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
    height: 80,
    width: 80,
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
    backgroundColor: '#ccc',
  },
  activeButton: {
    backgroundColor: '#f2d8d8',
  },
  inactiveButton: {
    backgroundColor: '#f7f7f7',
  },
  image: {
    width: 45,
    height: 45,
  },
  categoryName: {
    marginTop: 5,
    fontSize: 13,
    fontWeight: 'bold',
  },
  activeText: {
    color: '#9D050A',
    fontWeight: 'bold',
  },
  inactiveText: {
    color: '#888',
  },
});

export default Categories;
