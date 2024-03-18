import { View, Text, SafeAreaView, ScrollView, StyleSheet } from 'react-native'
import React from 'react'
import { color } from 'react-native-reanimated'
import Featured from '../../../containers/Featured';
import TotalJobs from '../../../containers/TotalJobs';
import JobAppliedList from '../../../containers/JobAppliedList';

export default function JobApplied({ navigation }) {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}>

        <View style={styles.featuredContainer}>
          <JobAppliedList />
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

