import { ActivityIndicator, RefreshControl, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from "@react-navigation/native";
import EducationCard from "./EducationCard";
import AppBar from "../../../../components/custom_toolbar/AppBar";
import { customTextColor, customThemeColor } from "../../../../constants/Color";
import { customFontSize, customFonts } from "../../../../constants/theme";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllEducation } from "../../../../features/profile/EducationSlice";
import CardSkeleton from "../../../../components/skeleton_loader/CardSkeleton";


const EducationList = () => {
    const { allEducation, isLoading } = useSelector(state => state.education);
    const [refreshing, setRefreshing] = useState(false);
    const navigation = useNavigation();
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(getAllEducation());
    }, [dispatch]);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        console.log("first", refreshing)
        dispatch(getAllEducation());
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    }, []);

    useEffect(() => {
        console.log('allEducation', typeof allEducation);
    }, [dispatch]);

    const handleBack = () => {
        navigation.goBack();
    };
    return (
        <View style={styles.container}>
            <AppBar handleBack={handleBack} title={"Update Profile"} />

            <View>
                <View style={{
                    flexDirection: 'row',
                    marginTop: 5,
                    justifyContent: 'space-between',
                }}>
                    <Text style={styles.title}>Education</Text>
                    <View style={{ marginVertical: 10, marginRight: 10, paddingRight: 10 }}>
                        <TouchableOpacity onPress={() => navigation.navigate('EducationAdd')}>
                            <Icon name="plus" size={20} color={customTextColor.primary} />
                        </TouchableOpacity>
                    </View>
                </View>

                <Text style={styles.subTitle}>Highlight your educational background including degree, certification to showcase your qualification</Text>
            </View>
            <ScrollView contentContainerStyle={{ paddingBottom: 80, paddingTop: 10 }}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }>
                <View style={{
                    padding: 15,
                    //maxWidth : 575,
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    //backgroundColor:'red',
                    width: '100%',
                }}>

                    {!!allEducation ? (
                        allEducation?.map((item, index) => {
                            return (
                                <View key={index} >
                                    <EducationCard navigation={navigation} items={item} />
                                </View>
                            );
                        })
                    ) : (
                        <ActivityIndicator
                            animating={true}
                            style={{ paddingVertical: 14 }}
                            color={customTextColor.darkGreen}
                            size={20}
                        />
                    )}

                </View>

            </ScrollView>

        </View>


    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: customThemeColor.lightBG,
    },
    title: {
        color: customTextColor.primary,
        fontFamily: customFonts.fontPoppins,
        fontSize: customFontSize.font22,
        paddingHorizontal: 20,
        marginTop: 20,
    },
    subTitle: {
        color: customTextColor.secondary,
        fontFamily: customFonts.fontPoppins,
        fontSize: customFontSize.font12,
        paddingHorizontal: 20,
        paddingVertical: 5,
    },
    input: {
        backgroundColor: 'transparent',
    },

});

export default EducationList;

