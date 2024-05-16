import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { customTextColor, customThemeColor } from "../../../../constants/Color"
import { useDispatch, useSelector } from "react-redux";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { customFontSize, customFonts } from "../../../../constants/theme";
import { delPreference, resetPreferenceState } from "../../../../features/profile/PreferenceSlice";
import { showMessage } from "react-native-flash-message";

const Row = ({ label, value }) => {
    return (
        <View style={styles.divider}>
            <View style={[styles.leftGrid]}>
                <Text style={[styles.heading]}>{label}</Text>
                <Text style={[styles.heading]}>:</Text>
            </View>

            <Text style={[styles.subheading, styles.rightText]}>{value}</Text>
        </View>
    );
};

const PreferenceCard = ({ items, navigation }) => {
    const { messageDel, isSuccess, isLoading, isError, statusCode } = useSelector(state => state.preference);
    const dispatch = useDispatch();
   
    const handleDelete = () => {
        dispatch(delPreference(items?.id)).then(() => {
            if (isError && statusCode !== 200 && statusCode !== 0) {
                showMessage({
                    message: "messageDel",
                    type: 'danger',
                    animationDuration: 1000,
                    animated: true,
                });
            } else if (isSuccess && statusCode === 200) {
                showMessage({
                    message: messageDel,
                    type: 'success',
                    animationDuration: 1000,
                    animated: true,
                });
            }
            setTimeout(() => {
                dispatch(resetPreferenceState());
            }, 1000);
        })

    }

    return (
        <View style={{
            backgroundColor: customThemeColor.white,
            borderRadius: 10,
            marginBottom: 18,
            padding: 15,
        }}>
            <View
                style={{
                    paddingHorizontal: 12,
                    paddingVertical: 12,
                    borderBottomWidth: 1,
                    borderColor: '#E6E6E6',
                }}>

                <View
                    style={{
                        flexDirection: 'row',
                        marginTop: 5,
                        justifyContent: 'space-between',
                    }}>

                    <Text style={{
                        marginBottom: 3,
                        color: customTextColor.darkGreen,
                        fontSize: customFontSize.font18,
                        fontFamily: customFonts.fontRobotoBold,
                    }}> {items?.job_category?.name}</Text>
                    <View
                        style={{
                            flexDirection: 'row',
                            marginTop: 5,
                            justifyContent: 'space-between',

                        }}>
                        <View
                            style={{
                                paddingHorizontal: 10,
                                paddingBottom: 4,
                                paddingTop: 1,
                            }}>
                            <TouchableOpacity onPress={() => console.log("prefID", items?.id)}>
                                <Icon name="square-edit-outline" size={20} color={customTextColor.primary} />
                            </TouchableOpacity>
                        </View>
                        <View
                            style={{
                                paddingHorizontal: 10,
                                paddingBottom: 4,
                                paddingTop: 1,

                            }}>

                            <TouchableOpacity onPress={() => {
                                Alert.alert('Meroplacement',
                                    'Are you sure you want to delete?', [
                                    {
                                        text: 'Cancel',
                                        onPress: () => { console.log("cancel", items?.id) },
                                        style: 'cancel',
                                    },
                                    { text: 'OK', onPress: () => { handleDelete() } },
                                ]);
                            }}>
                                <Icon name="delete" size={20} color={customTextColor.primary} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

            </View>

            <View>
                <Row label="Preferred Job" value={items ? items.title_name : ''} />
                <Row label="Expected salary" value={items?.expected_salary} />
                <Row label="Type" value={items?.availible_type?.employment_type} />
                <Row label="Location" value={items?.location?.district_name} />
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    divider: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    leftGrid: {
        width: '45%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    heading: {
        fontSize: customFontSize.font14,
        fontFamily: customFonts.fontRoboto,
        color: customTextColor.primary,
        paddingVertical: 10,
        marginRight: 6,
    },
    subheading: {
        fontSize: customFontSize.font14,
        fontFamily: customFonts.fontRoboto,
        color: customTextColor.secondary,
    },
});

export default PreferenceCard;