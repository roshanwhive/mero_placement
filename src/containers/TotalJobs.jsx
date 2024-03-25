import React, {useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import JobCard from '../components/JobCard';
import {useDispatch, useSelector} from 'react-redux';
import {getAllJobs} from '../features/job-category/JobSlice';
import {ActivityIndicator} from 'react-native-paper';
import {customTextColor} from '../constants/Color';

const TotalJobs = ({navigation}) => {
  const dispatch = useDispatch();

  const {allJobs} = useSelector(state => state.job);

  useEffect(() => {
    dispatch(getAllJobs());
  }, [dispatch]);

  return (
    <View>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Total Jobs</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('SeeAllJobs')}>
          <Text style={styles.seeAll}>See All</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.scrollViewContent}>
        {allJobs.data ? (
          allJobs.data.map((item, index) => {
            return (
              <View key={index}>
                <JobCard navigation={navigation} items={item} />
              </View>
            );
          })
        ) : (
          <View style={{marginTop: 100}}>
            <ActivityIndicator
              animating={true}
              style={{marginVertical: 20}}
              color={customTextColor.lightGreen}
            />
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    marginTop: 20,
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
  scrollViewContent: {
    paddingHorizontal: 15,
    paddingVertical: 5,
    overflow: 'visible',
  },
});

export default TotalJobs;
