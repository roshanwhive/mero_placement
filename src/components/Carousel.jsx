import React, {useEffect, useState, useRef, useCallback} from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Dimensions,
  Text,
  Image,
} from 'react-native';
import {ActivityIndicator} from 'react-native';
import {customThemeColor} from '../constants/Color';
import {useSelector} from 'react-redux';

const Carousel = () => {
  const [dimension, setDimension] = useState(Dimensions.get('window'));
  const [selectedIndex, setSelectedIndex] = useState(0);
  //const {sliderData} = useSelector(state => state.sliderImage);

  const scrollRef = useRef();
  let intervalId = null;

  const onChange = () => {
    setDimension(Dimensions.get('window'));
  };

  useEffect(() => {
    Dimensions.addEventListener('change', onChange);
    return () => {
      //Dimensions.removeEventListener('change', onChange);
    };
  });

  const onSlideChange = useCallback(() => {
    // Calculate newIndex here and use it to update your state and to scroll to the new slide
    const newIndex =
      selectedIndex === sliderData.length - 1 ? 0 : selectedIndex + 1;

    setSelectedIndex(newIndex);

    scrollRef?.current?.scrollTo({
      animated: true,
      y: 0,
      x: dimension.width * newIndex,
    });
  }, [selectedIndex]);

  const startInterval = useCallback(() => {
    intervalId = setInterval(onSlideChange, 3000);
  }, [onSlideChange]);

  useEffect(() => {
    startInterval();

    return () => {
      // Clear the interval when component unmounts, otherwise you could have memory leaks
      clearInterval(intervalId);
    };
  }, [onSlideChange]);

  const onTouchStart = () => {
    // As soon as the user touches the slide, stop the automatic sliding
    clearInterval(intervalId);
  };

  const onTouchEnd = () => {
    // As soon as the user stops touching the slide, releases it, start the automatic sliding again
    startInterval();
  };

  const sliderData = [
    {
      image:
        'https://i0.wp.com/webfeb.in/wp-content/uploads/2016/09/job-portal-1.jpg?w=450&ssl=1',
    },
    {
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR54vHDRjZGDu4FS0_taUKitP0BM7E3KZ1wfUjI5z2iShYo7pPe1pMxDFpn7woECCtfPZI&usqp=CAU',
    },
    {
      image:
        'https://www.shutterstock.com/shutterstock/photos/716290696/display_1500/stock-photo-job-search-online-job-recruitment-concept-716290696.jpg',
    },
    {
      image:
        'https://www.shutterstock.com/image-vector/vector-business-illustration-small-people-260nw-1022567779.jpg',
    },
    {
      image:
        'https://mauconline.net/wp-content/uploads/Job-Portal-Website-A-Game-Changer-in-the-HR-Industry.jpg',
    },
  ];

  const setIndex = event => {
    let viewSize = event.nativeEvent.layoutMeasurement.width;
    let contentOffset = event.nativeEvent.contentOffset.x;
    let carouselIndex = Math.floor(contentOffset / viewSize);
    setSelectedIndex(carouselIndex);
  };

  return (
    <View
      style={{
        width: 360,
        borderRadius: 10,
        overflow: 'hidden',
        marginLeft: 20,
      }}>
      <ScrollView
        horizontal
        ref={scrollRef}
        onMomentumScrollEnd={setIndex}
        showsHorizontalScrollIndicator={false}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        pagingEnabled>
        {sliderData.map((value, index) => (
          <Image
            key={index}
            source={{uri: `${value.image}`}}
            style={{width: dimension?.width, height: 200}}
            PlaceholderContent={<ActivityIndicator />}
          />
        ))}
      </ScrollView>
      <View
        style={{
          flexDirection: 'row',
          position: 'absolute',
          bottom: 0,
          alignSelf: 'center',
        }}>
        {sliderData.map((val, index) => (
          <Text
            key={index}
            style={
              index === selectedIndex
                ? {color: customThemeColor.darkRed}
                : {color: '#888'}
            }>
            ⬤
          </Text>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default Carousel;
