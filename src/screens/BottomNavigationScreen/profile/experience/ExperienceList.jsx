import { RefreshControl, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from "@react-navigation/native";
import AppBar from "../../../../components/custom_toolbar/AppBar";
import { customTextColor, customThemeColor } from "../../../../constants/Color";
import { customFontSize, customFonts } from "../../../../constants/theme";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CardSkeleton from "../../../../components/skeleton_loader/CardSkeleton";
import { getAllExperience } from "../../../../features/profile/ExperienceSlice";
import ExperienceCard from "./ExperienceCard";


const ExperienceList = () => {
    const { allExperience } = useSelector(state => state.experience);
    const [refreshing, setRefreshing] = useState(false);
    const navigation = useNavigation();
    const dispatch = useDispatch();



    useEffect(() => {
        dispatch(getAllExperience());
    }, [dispatch]);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        dispatch(getAllExperience());
        console.log("first", allExperience)

        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    }, []);

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
                    <Text style={styles.title}>Experience</Text>
                    <View style={{ marginVertical: 10, marginRight: 10, paddingRight: 10 }}>
                        <TouchableOpacity onPress={() => navigation.navigate('ExperienceAdd')}>
                            <Icon name="plus" size={20} color={customTextColor.primary} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <ScrollView contentContainerStyle={{ paddingBottom: 80, paddingTop: 5 }}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh}
                    />
                }>
                <View style={{
                    padding: 10,
                    //maxWidth : 575,
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    width: '100%',
                }}>

                    {!!allExperience ? (
                        allExperience?.map((item, index) => {
                            return (
                                <View key={index} >
                                    <ExperienceCard navigation={navigation} items={item} />
                                </View>
                            );
                        })
                    ) : (
                        <View>
                            <CardSkeleton />
                            <CardSkeleton />
                            <CardSkeleton />
                        </View>
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

export default ExperienceList;

