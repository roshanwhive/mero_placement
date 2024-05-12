import { Alert, Image, Text, TouchableOpacity, View } from "react-native"
import { customTextColor, customThemeColor } from "../../../../constants/Color"
import { useDispatch } from "react-redux";
import { customFontSize, customFonts } from "../../../../constants/theme";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useEffect, useState } from "react";


const EducationCard = ({ items, navigation }) => {
    const dispatch = useDispatch();

    const [status, setStatus] = useState(items?.passed_status);

    return (
        <View style={{
            backgroundColor: customThemeColor.white,
            borderRadius: 10,
            marginBottom: 18,
            borderLeftWidth: 4,
            borderColor: status == "passed" ? 'green' : 'red',
        }}>
            <View
                style={{
                    paddingHorizontal: 15,
                    paddingVertical: 12,
                    borderBottomWidth: 1,
                    borderColor: '#E6E6E6',
                }}>
                <Text style={{ color: "black" }}>From :
                    <Text style={{ color: "black" }}> {items ? items.start_date : ''} - </Text>
                    To
                    <Text style={{ color: "black" }}> {items ? items.end_date : ''}</Text>
                </Text>
            </View>
            <View
                style={{
                    paddingHorizontal: 15,
                    paddingVertical: 15,
                    flexDirection: 'row',
                }}>

                <View style={{ flex: 1 }}>
                    <View
                        style={{
                            flexDirection: 'row',
                            marginTop: 5,
                            justifyContent: 'space-between',
                        }}>

                        <Text style={{
                            marginBottom: 3,
                            color: customTextColor.primary,
                            fontSize: customFontSize.font18,
                            fontFamily: customFonts.fontRobotoBold,
                        }}> {items ? items.degree_type_name?.deg_type_name : ''}</Text>
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
                                <TouchableOpacity onPress={() => console.log("eduID", items?.education_id)}>
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
                                            onPress: () => { console.log("cancel", items?.education_id) },
                                            style: 'cancel',
                                        },
                                        { text: 'OK', onPress: () => console.log("delete", items?.education_id) },
                                    ]);
                                }}>
                                    <Icon name="delete" size={20} color={customTextColor.primary} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View
                        style={{
                            flexDirection: 'row',
                            marginTop: 10,
                            justifyContent: 'space-between',
                        }}>
                        <View
                            style={{
                                flexDirection: 'row',
                            }}>

                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    paddingRight: 10,
                                    marginRight: 10,
                                }}
                            >

                                <Text style={{
                                    color: customTextColor.primary,
                                    fontFamily: customFonts.fontRoboto,
                                    fontSize: customFontSize.font14,
                                }}>{items ? items.university_board_name : ''}</Text>
                            </View>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                }}
                            >

                                <Text style={{
                                    color: customTextColor.primary,
                                    fontFamily: customFonts.fontRobotoBold,
                                    fontSize: customFontSize.font14,
                                }}>{items ? items.passed_percentage : ''}</Text>
                            </View>
                        </View>

                    </View>
                    <Text style={{
                        marginTop: 10,
                        marginBottom: 3,
                        color: customTextColor.primary,
                        fontFamily: customFonts.fontRoboto,
                        fontSize: customFontSize.font14,
                    }}>{items ? items.institute_name : ''} </Text>
                    {/* <Text style={{
                        marginTop: 10,
                        marginBottom: 3,
                        color: 'black'
                    }}>{items ? items.passed_status : ''} </Text> */}
                </View>
            </View>

        </View>
    )
}

export default EducationCard;