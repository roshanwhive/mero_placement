import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getSingleContent} from '../../features/content/singleContentSlice';

const TopJobContent = () => {
  const {topJobContent, message} = useSelector(state => state.getContentTopJob);
  const [dimension, setDimension] = useState(Dimensions.get('window'));

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSingleContent('First-Page-Under-Top-Job-67598'));
  }, [dispatch]);

  return (
    <View>
      {topJobContent ? (
        <Image
          source={{uri: topJobContent.featured_image}}
          style={{
            width: dimension?.width,
            height: 200,
            resizeMode: 'contain',
            borderRadius: 10,
            objectFit: 'cover',
          }}
        />
      ) : null}
    </View>
  );
};

export default TopJobContent;

const styles = StyleSheet.create({});
