import { useNavigation } from "@react-navigation/native"
import { Pressable, ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from "react-native"
import AppBar from "../../../../components/custom_toolbar/AppBar";
import { customTextColor, customThemeColor } from "../../../../constants/Color";
import { customFontSize, customFonts } from "../../../../constants/theme";
import { GlobalStyleSheet } from "../../../../constants/StyleSheet";
import { TextInput } from "react-native-paper";
import { useState } from "react";
import DatePicker from 'react-native-date-picker';

const EducationAdd = () => {

    const navigation = useNavigation();
    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false)

    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    const [show, setShow] = useState(true);

    const handleBack = () => {
        navigation.goBack();
    };

    const commonTextInputProps = {
        style: styles.input,
        mode: 'outlined',
        outlineColor: customTextColor.darkGreen,
        activeOutlineColor: customTextColor.darkGreen,
        selectionColor: customTextColor.darkGreen,
    };

    return (
        <View style={styles.container}>
            <AppBar handleBack={handleBack} title={"Update Profile"} />
            <ScrollView>
                <View>
                    <Text style={styles.title}>Education</Text>
                    <Text style={styles.subTitle}>Highlight your educational background including degree, certification to showcase your qualification</Text>
                </View>

                <View style={GlobalStyleSheet.containerForm}>
                    <View style={GlobalStyleSheet.inputWrapper}>
                        <TextInput
                            {...commonTextInputProps}
                            label="College"
                        >
                        </TextInput>
                    </View>
                    <View style={GlobalStyleSheet.inputWrapper}>
                        <TextInput
                            {...commonTextInputProps}
                            label="University"
                        >
                        </TextInput>
                    </View>

                    <View style={GlobalStyleSheet.inputWrapper}>
                        <TextInput
                            {...commonTextInputProps}
                            label="Percentage"
                        >
                        </TextInput>
                    </View>
                    <View style={GlobalStyleSheet.inputWrapper}>
                        <TextInput
                            {...commonTextInputProps}
                            label="Status"
                        >
                        </TextInput>
                    </View>
                    <View style={GlobalStyleSheet.inputWrapper1}>
                        <View style={styles.row}>

                            <Text style={styles.title1}>Status</Text>
                            <View>
                                {
                                    isEnabled ? <Text style={{
                                        position: 'absolute',
                                        color: 'black',
                                        top: 3,
                                        left: 2,
                                        zIndex: 5,
                                        fontSize: 14
                                    }} >Yes</Text> :
                                        <Text style={{
                                            position: 'absolute',
                                            color: 'white',
                                            top: 3,
                                            left: 20,
                                            zIndex: 5,
                                            fontSize: 14
                                        }}>No</Text>
                                }
                                <Switch
                                    trackColor={{ false: "red", true: "gray" }}
                                    onValueChange={toggleSwitch}
                                    value={isEnabled}
                                    style={{ transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }] }}

                                />
                            </View>
                        </View>
                    </View>

                    {/* <View style={GlobalStyleSheet.inputWrapper}>

                        <TouchableOpacity onPress={() => setOpen(true)}>
                            <DatePicker
                                modal
                                open={open}
                                date={date}
                                onConfirm={(date) => {
                                    setOpen(false)
                                    setDate(date)
                                }}
                                onCancel={() => {
                                    setOpen(false)
                                }}
                            />
                            <TextInput
                                {...commonTextInputProps}
                                label="Start Date"
                                editable={false}
                                value={date}
                            >
                            </TextInput>
                        </TouchableOpacity>
                    </View>
                    <View style={GlobalStyleSheet.inputWrapper}>
                        <TouchableOpacity onPress={() => setOpen(true)}>
                            <DatePicker
                                modal
                                open={open}
                                date={date}
                                onConfirm={(date) => {
                                    setOpen(false)
                                    setDate(date)
                                }}
                                onCancel={() => {
                                    setOpen(false)
                                }}
                            />
                            <TextInput
                                {...commonTextInputProps}
                                label="End Date"
                                editable={false}
                                value={date}
                            >
                            </TextInput>
                        </TouchableOpacity>
                    </View> */}

                    <View style={GlobalStyleSheet.buttonWrapper}>
                        <TouchableOpacity style={GlobalStyleSheet.button} onPress={() => navigation.navigate('EducationList')}>

                            <Text style={GlobalStyleSheet.buttonText}>Save Changes</Text>
                        </TouchableOpacity>
                    </View>
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
    container1: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        color: customTextColor.primary,
        fontFamily: customFonts.fontPoppins,
        fontSize: customFontSize.font22,
        paddingHorizontal: 20,
        marginTop: 20,
    },
    title1: {
        fontSize: customFontSize.font16,
        color: customTextColor.primary,
        fontFamily: customFonts.fontBold,
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
    row: {
        paddingHorizontal: 10,
        paddingVertical: 10,
        flexDirection: 'row',
        marginBottom: 10,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 5,
        justifyContent: 'space-between',
    },

});

export default EducationAdd;