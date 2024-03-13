import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Feather';
import { black } from 'react-native-paper/lib/typescript/styles/themes/v2/colors';

export default function JobAppliedList() {


    const job = [
        {
            id: 1,
            designation: "Frontend Developer",
            address: "Sattatey, Kathmandu",
            posted_date: "2 days ago",
            companyLogo: require('../assets/companyLogo.png')
        },
        {
            id: 2,
            designation: "Flutter Developer",
            address: "Sattatey, Kathmandu",
            posted_date: "1 days ago",
            companyLogo: require('../assets/companyLogo.png')
        },
        {
            id: 3,
            designation: "Laravel Developer",
            address: "Sattatey, Kathmandu",
            posted_date: "3 days ago",
            companyLogo: require('../assets/companyLogo.png')
        },
        {
            id: 4,
            designation: "Graphic Designer",
            address: "Sattatey, Kathmandu",
            posted_date: "2 days ago",
            companyLogo: require('../assets/companyLogo.png')
        },
        {
            id: 5,
            designation: "Backend Developer",
            address: "Sattatey, Kathmandu",
            posted_date: "1 days ago",
            companyLogo: require('../assets/companyLogo.png')
        },
        {
            id: 6,
            designation: "React native Developer",
            address: "Sattatey, Kathmandu",
            posted_date: "1 days ago",
            companyLogo: require('../assets/companyLogo.png')
        }
    ]


    return (
        <View>
            <View></View>

            {/* use of flat list
            data={job}
            renderItem={({ item }) => <Text style={{ color: 'black' }}>{item.address}</Text>}
            custom flat list */}

            {/*  using map {
                job.map((item) => <Text style={{ color: 'black' }}>{item.address}</Text>)
            } */}


            <FlatList
                data={job}
                renderItem={({ item }) => <View style={styles.cardContainer}>

                    <View style={styles.logoContainer}>
                        <Image source={item.companyLogo} style={styles.logo} />
                    </View>

                    <View style={styles.jobDetailsContainer}>
                        <Text style={styles.jobTitle}>{item.designation}</Text>
                        <View style={styles.contentContainer}>
                            <Icon name="map-pin" size={14} color="#706f6f" style={styles.icon} />
                            <Text style={styles.location}>{item.address}</Text>
                        </View>
                        <View style={styles.contentContainer}>
                            <Icon name="clock" size={14} color="#706f6f" style={styles.icon} />
                            <Text style={styles.location}>{item.posted_date}</Text>
                        </View>

                        <View style={styles.buttonContainer} >
                            <View>
                                <Text></Text>
                            </View>
                            <View>
                                <TouchableOpacity style={styles.applyButton}>
                            <Text style={styles.applyButtonText}>Apply</Text>
                            </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
                }
            />
        </View>
    )
}

const styles = StyleSheet.create({
    cardContainer: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 8,
        marginVertical: 8,
        marginHorizontal: 2,
        paddingHorizontal: 16,
        paddingVertical: 10,
        shadowColor: 'rgba(150,170,180,0.5)',
        shadowOffset: { width: 0, height: 7 },
        shadowOpacity: 1,
        shadowRadius: 30,
        elevation: 10,
    },
    logoContainer: {
        marginRight: 16,
    },
    logo: {
        width: 80,
        height: 80,
        resizeMode: 'contain',
        borderRadius: 5,
    },
    jobDetailsContainer: {
        flex: 1,
    },
    contentContainer: {
        display: 'flex',
        flexDirection: 'row',
        gap: 5,
    },
    jobTitle: {
        fontSize: 20,
        fontWeight: '600',
        marginBottom: 4,
        color: '#000000',
    },
    icon: {
        marginTop: 3,
        fontWeight: '300',
    },
    location: {
        color: '#706f6f',
        fontWeight: '400',
        fontSize: 14,
    },

    buttonContainer: {
        top: '-3%',
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    applyButton: {
        backgroundColor: '#9D050A',
        width: 100,
        textAlign: 'right',
        alignItems: 'right',
        display: 'flex',
        borderRadius: 4,
        paddingVertical: 8,
        paddingHorizontal: 16,
    },
    applyButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});