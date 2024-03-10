import { View, Text, SafeAreaView,ScrollView, StyleSheet} from 'react-native'
import React from 'react'
import { color } from 'react-native-reanimated'
import Featured from '../../../containers/Featured';
import TotalJobs from '../../../containers/TotalJobs';

export default function JobApplied({navigation}) {
  return (
    <SafeAreaView>
      <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollViewContent}>
        

          {/* Featured */}
          <View style={styles.featuredContainer}>
            <Featured navigation={navigation} />
          </View>
          <View style={styles.totalJobs}>
            <TotalJobs navigation={navigation} />
          </View>
        </ScrollView>
      </SafeAreaView>
  )
}

const styles = StyleSheet.create({
 
  scrollViewContent: {
    paddingBottom: 0,
  
    zIndex: 0,
    backgroundColor: '#FCFCFC',
    borderTopLeftRadius: 25,
    position: 'relative',
    borderTopRightRadius: 25,
  },
  featuredContainer: {
    marginTop: 5,
  },
  totalJobs: {
    marginTop: 5,
  },
});

