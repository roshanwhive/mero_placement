import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {customTextColor, customThemeColor} from '../constants/Color';
import reactTraining from '../assets/training/react-training.png';

const TrainingCard = ({navigation}) => {
  return (
    <View style={styles.card}>
      <Image source={reactTraining} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.title}>React For Beginner</Text>
        <View style={styles.flexCard}>
          <Text style={styles.price}>NPR. 12000</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Training')}>
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
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: customTextColor.primary,
  },
  flexCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: 14,
    color: customTextColor.lightGreen,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: customThemeColor.darkRed,
    color: customTextColor.white,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    width: 60,
    fontSize: 14,
    fontWeight: '500',
  },
});

export default TrainingCard;
