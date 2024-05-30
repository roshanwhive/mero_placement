import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {customTextColor, customThemeColor} from '../constants/Color';
import {customFontSize, customFonts} from '../constants/theme';
import {useDispatch} from 'react-redux';
import {getSingleTraining} from '../features/training/getSingleTrainingSlice';

const TrainingCard = ({items, navigation}) => {
  const dispatch = useDispatch();
  return (
    <View style={styles.card}>
      <Image source={{uri: items.image}} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.title}> {items ? items.heading_name : ''}</Text>
        <View style={styles.flexCard}>
          <Text style={styles.price}>{items ? items.price : ''}</Text>
          <TouchableOpacity
            onPress={() => {
              dispatch(getSingleTraining(items?.slug));
              navigation.navigate('Training', {
                slug: items ? items.slug : '',
              });
            }}>
            <Text style={styles.button}>Enroll</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 1,
    margin: 10,
    overflow: 'hidden',
    width: 200,
  },
  image: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  content: {
    padding: 10,
  },
  title: {
    fontSize: customFontSize.font16,
    fontFamily: customFonts.fontPoppins,
    color: customTextColor.primary,
  },
  flexCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: customFontSize.font14,
    color: customTextColor.lightGreen,
    fontFamily: customFonts.fontItallics,
  },
  button: {
    backgroundColor: customThemeColor.darkRed,
    color: customTextColor.white,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    width: 60,
    fontSize: customFontSize.font14,
    fontFamily: customFonts.fontRobotoBold,
  },
});

export default TrainingCard;
