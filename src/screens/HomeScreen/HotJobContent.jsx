import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';

import {useDispatch, useSelector} from 'react-redux';
import {getSingleContent} from '../../features/content/singleContentSlice';

const HotJobContent = () => {
  const {hotJobContent} = useSelector(state => state.getContentHotJob);
  const [dimension, setDimension] = useState(Dimensions.get('window'));

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSingleContent('First-Page-Under-Hot-Job-15684'));
  }, [dispatch]);

  return (
    <View
      style={{
        width: 360,
        borderRadius: 10,
        overflow: 'hidden',
        marginLeft: 20,
      }}>
      {hotJobContent ? (
        <Image
          source={{uri: hotJobContent.featured_image}}
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

export default HotJobContent;

const styles = StyleSheet.create({});
