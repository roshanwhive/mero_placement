import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const JobDetail = ({navigation}) => {
  const handleBack = () => {
    navigation.goBack();
  };

  const handleApply = () => {
    // Handle job application
  };

  const handleShare = () => {
    // Handle job sharing
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack}>
          <Icon name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* Job Details */}
      <View style={styles.jobDetails}>
        <View style={styles.companyInfo}>
          <View>
            <Text style={styles.companyName}>Company Name</Text>
            <Text style={styles.jobTitle}>Laravel Developer</Text>
            <View style={styles.flexCard}>
              <Text style={[styles.label, styles.link]}>Fulltime</Text>
              <Text style={[styles.label, styles.link]}>Remote</Text>
            </View>
          </View>
          <View style={styles.companyLogoContainer}>
            <Image
              source={require('../../assets/companyLogo.png')}
              style={styles.companyLogo}
            />
          </View>
        </View>
        <View style={styles.basicInfo}>
          <View>
            <Text style={styles.title}>Salary</Text>
            <Text style={styles.value}>120k</Text>
          </View>
          <View>
            <Text style={styles.title}>Applicants</Text>
            <Text style={styles.value}>30</Text>
          </View>
          <View>
            <Text style={styles.title}>Expiry Date</Text>
            <Text style={styles.value}>14 Nov 2024</Text>
          </View>
        </View>
        {/* Additional Sections */}
        <View style={styles.additionalSections}>
          <Text style={styles.sectionTitle}>About the company:</Text>
          <Text style={styles.sectionText}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod
            mattis velit, ac fringilla nunc tincidunt in. Mauris in augue vel
            sapien hendrerit tincidunt.
          </Text>
          <Text style={styles.sectionTitle}>Responsibilities:</Text>
          <FlatList
            data={[
              {key: 'Tokyo'},
              {key: 'Delhi'},
              {key: 'Shanghai'},
              {key: 'Sao Paolo'},
              {key: 'Mexico City'},
              {key: 'Cairo'},
              {key: 'Dhaka'},
              {key: 'Mumbai'},
              {key: 'Beijing'},
              {key: 'Osaka'},
            ]}
            renderItem={({item}) => {
              return (
                <View style={{marginBottom: 4, paddingLeft: 5}}>
                  <Text
                    style={{
                      fontSize: 14,
                      color: '#575757',
                    }}>{`\u2022 ${item.key}`}</Text>
                </View>
              );
            }}
          />
        </View>
      </View>

      {/* Job Actions */}
      <View style={styles.jobActions}>
        <TouchableOpacity onPress={handleApply} style={styles.actionButton}>
          <Text style={styles.actionButtonText}>Apply</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleShare} style={styles.actionButton}>
          <Text style={styles.actionButtonText}>Share</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 10,
  },
  jobDetails: {
    flex: 1,
    marginTop: 20,
    paddingHorizontal: 20,
  },
  companyInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  companyName: {
    color: '#919191',
    fontSize: 14,
  },
  jobTitle: {
    fontSize: 25,
    color: 'black',
    fontWeight: '600',
  },
  flexCard: {
    display: 'flex',
    marginTop: 5,
    flexDirection: 'row',
    gap: 10,
  },
  label: {
    backgroundColor: '#edfff7',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  link: {
    color: '#2b8256',
    fontSize: 16,
  },
  companyLogoContainer: {
    alignItems: 'flex-end',
  },
  companyLogo: {
    width: 80,
    height: 80,
    borderRadius: 10,
    resizeMode: 'contain',
  },
  basicInfo: {
    marginTop: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  title: {
    fontSize: 14,
    color: '#808080',
  },
  value: {
    color: 'black',
    fontSize: 18,
    fontWeight: '500',
  },
  additionalSections: {
    marginVertical: 40,
  },
  sectionTitle: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  sectionText: {
    fontSize: 14,
    marginBottom: 10,
  },
  jobActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingVertical: 15,
  },
  actionButton: {
    backgroundColor: '#007bff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default JobDetail;
