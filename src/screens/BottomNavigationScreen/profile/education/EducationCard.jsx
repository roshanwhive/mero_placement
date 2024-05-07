import { Image, Text, View } from "react-native"
import { customThemeColor } from "../../../../constants/Color"
import { useDispatch } from "react-redux";

const EducationCard = ({ items, navigation }) => {

    const dispatch = useDispatch();

    return (
        <View style={{
            backgroundColor: customThemeColor.white,
            borderRadius: 10,
            marginBottom: 18,
            borderLeftWidth: 4,
            borderColor: customThemeColor.darkGreen,
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
                            color: 'black'
                        }}>Graduate (Master) </Text>
                        <View
                            style={{
                                backgroundColor: customThemeColor.darkRed,
                                paddingHorizontal: 20,
                                borderRadius: 20,
                                paddingBottom: 4,
                                paddingTop: 1,
                                width: "30%",
                                alignItems: 'center', justifyContent: 'center'
                            }}>
                            <Text style={{ color: 'white', alignItems: 'center', justifyContent: 'center' }}>Edit</Text>
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

                                <Text style={{ color: 'black' }}>{items ? items.university_board_name : ''}</Text>
                            </View>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                }}
                            >

                                <Text style={{ color: 'black' }}>{items ? items.passed_percentage : ''}</Text>
                            </View>
                        </View>
                        <View
                            style={{
                                backgroundColor: customThemeColor.white,
                                paddingHorizontal: 20,
                                borderRadius: 20,
                                paddingBottom: 4,
                                paddingTop: 1,
                                width: "30%",
                                borderWidth: 1,
                                borderColor: customThemeColor.darkRed,
                                alignItems: 'center', justifyContent: 'center'
                            }}>
                            <Text style={{ color: 'black', alignItems: 'center' }}>Delete</Text>

                        </View>
                    </View>
                    <Text style={{
                        marginTop: 10,
                        marginBottom: 3,
                        color: 'black'
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