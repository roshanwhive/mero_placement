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
import {getMainCategories} from '../features/job/JobSlice';
import {useNavigation} from '@react-navigation/native';
import CategoryCardCircle from './skeleton_loader/CategoryCardCircle';

const Categories = () => {
  const [activeCategory, setActiveCategory] = useState(null);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const {mainCategories} = useSelector(state => state.job);

  useEffect(() => {
    dispatch(getMainCategories());
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Jobs By Category</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('AllCategories')}>
          <Text style={styles.seeAll}>See All</Text>
        </TouchableOpacity>
      </View>
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
              {/* <CategoryCardCircle key={index} /> */}
            </View>
          );
        })}
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
  title: {
    fontWeight: 'bold',
    color: '#11401E',
    fontSize: 20,
  },
  seeAll: {
    color: '#2b8256',
    fontWeight: '500',
    textDecorationLine: 'underline',
    paddingRight: 3,
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
    height: 90,
    width: 90,
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
    backgroundColor: '#f2f2f2',
  },
  image: {
    width: 35,
    height: 35,
  },
  categoryName: {
    marginTop: 5,
    fontSize: 13,
    fontWeight: '500',
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
