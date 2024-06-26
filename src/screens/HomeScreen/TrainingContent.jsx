import {View, Text, Dimensions, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getSingleContent} from '../../features/content/singleContentSlice';

const TrainingContent = () => {
  const {trainingContent} = useSelector(state => state.getContentTraining);
  const [dimension, setDimension] = useState(Dimensions.get('window'));

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSingleContent('First-Page-Under-Training-94416'));
  }, [dispatch]);

  return (
    <View
      style={{
        width: 360,
        borderRadius: 10,
        overflow: 'hidden',
        marginLeft: 20,
      }}>
      {trainingContent ? (
        <Image
          source={{uri: trainingContent.featured_image}}
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

export default TrainingContent;
