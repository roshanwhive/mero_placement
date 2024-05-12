import { useNavigation } from "@react-navigation/native"
import { Pressable, ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from "react-native"
import AppBar from "../../../../components/custom_toolbar/AppBar";
import { customTextColor, customThemeColor } from "../../../../constants/Color";
import { customFontSize, customFonts } from "../../../../constants/theme";
import { GlobalStyleSheet } from "../../../../constants/StyleSheet";
import { TextInput } from "react-native-paper";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup';
import { Controller, useForm } from "react-hook-form";
import { addEducation, resetEducationState } from "../../../../features/profile/EducationSlice";
import { Dropdown } from "react-native-element-dropdown";
import { getEduFormData } from "../../../../features/formData/FormSlice";
import DateTimePicker from '@react-native-community/datetimepicker';


const EducationAdd = () => {

    const navigation = useNavigation();
    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false)
    const { degree, eduFormData } = useSelector(state => state.formOptions);
    const dispatch = useDispatch();

    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    const [show, setShow] = useState(true);

    const [selectedtab, setSelectedtab] = useState("passed");
    const [passed, setPassed] = useState("passed");
    const [pursuing, setPursuing] = useState("pursuing");


    useEffect(() => {
        dispatch(getEduFormData());
    }, [dispatch]);

    useEffect(() => {
        console.log("test", selectedtab)
    }, [dispatch]);

    const handleDateChange = (event, selectedDate) => {

    }


    const handleBack = () => {
        navigation.goBack();
    };

    const [degreetype, setDegreetype] = useState([]);
    const [degreetypeId, setDegreetypeId] = useState("");
    useEffect(() => {
        if (degree && Array.isArray(degree)) {
            const mappedDegTypeList = degree.map(item => ({
                label: item.deg_type_name,
                value: item.deg_type_id,
            }));
            setDegreetype(mappedDegTypeList);
        }
    }, [degree]);

    const schema = yup.object().shape({
        college: yup.string().required('College name is required'),
        university: yup.string().required('University name is required'),
        percentage: yup.string().required('Percentage Field is required'),
    });

    const {
        control,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            college: '',
            university: '',
            status: '',
            deg_type: '',
            percentage: '',
            start_date: '',
            end_date: '',
        },
    });


    const onPressAdd = eduData => {
        dispatch(addEducation(eduData)).then(() => {
            setTimeout(() => {
                dispatch(resetEducationState());
            }, 1000);
        })
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
                        <Controller
                            control={control}
                            rules={{
                                required: true,
                            }}
                            render={({
                                field: { onChange, value }
                            }) => (
                                <TextInput
                                    {...commonTextInputProps}
                                    label="College"
                                    value={value}
                                    onChangeText={onChange}
                                />
                            )}
                            name="college"
                        />
                        {
                            errors.college && (
                                <Text style={styles.errorText}>{errors.college.message}</Text>
                            )
                        }
                    </View>
                    <View style={GlobalStyleSheet.inputWrapper}>
                        <Controller
                            control={control}
                            rules={{
                                required: true,
                            }}
                            render={({
                                field: { onChange, value }
                            }) => (
                                <TextInput
                                    {...commonTextInputProps}
                                    label="University"
                                    value={value}
                                    onChangeText={onChange}
                                />
                            )}
                            name="university"
                        />
                        {
                            errors.university && (
                                <Text style={styles.errorText}>{errors.university.message}</Text>
                            )
                        }
                    </View>

                    <View style={GlobalStyleSheet.inputWrapper}>
                        <Controller
                            control={control}
                            rules={{
                                required: true,
                            }}
                            render={({
                                field: { onChange, value }
                            }) => (
                                <TextInput
                                    {...commonTextInputProps}
                                    label="Percentage"
                                    value={value}
                                    onChangeText={onChange}
                                />
                            )}
                            name="percentage"
                        />
                        {
                            errors.percentage && (
                                <Text style={styles.errorText}>{errors.percentage.message}</Text>
                            )
                        }
                    </View>

                    <View style={GlobalStyleSheet.inputWrapper}>
                        <Controller
                            control={control}
                            rules={{
                                required: false,
                            }}
                            render={({
                                field: {
                                    onChange, value
                                }
                            }) => (
                                <Dropdown
                                    data={degreetype}
                                    placeholder='Select Degree Type'
                                    maxHeight={300}
                                    labelField="label"
                                    valueField="value"
                                    value={degreetypeId}
                                    placeholderStyle={{ color: customTextColor.secondary }}
                                    selectedTextStyle={{ color: customTextColor.primary }}
                                    itemTextStyle={{ color: customTextColor.secondary }}
                                    style={[
                                        {
                                            borderWidth: 1,
                                            borderColor: customTextColor.darkGreen,
                                            borderRadius: 5,
                                            paddingHorizontal: 16,
                                            paddingVertical: 5,
                                        },
                                        styles.input,
                                    ]}
                                    onChange={item => {
                                        onChange(item.value)
                                        console.log("click" + item.value);
                                    }}
                                // onChange={(item) => handleSubmit(item.value)}
                                />
                            )}
                            name="deg_type"
                        />
                    </View>
                    <View style={GlobalStyleSheet.inputWrapper1}>
                        {/* <View style={styles.row}>

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
                        </View> */}
                        <View style={styles.row}>

                            <Text style={styles.subTitle1}>Currently Studying</Text>

                            <Controller
                                control={control}
                                rules={{
                                    required: false,
                                }}
                                render={({
                                    field: {
                                        onChange, value
                                    }
                                }) => (

                                    <View style={{
                                        width: '90%',
                                        height: 40,
                                        borderWidth: 0.5,
                                        borderRadius: 15,
                                        backgroundColor: 'white',
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        paddingLeft: 5,
                                        paddingRight: 5,
                                    }}>

                                        <TouchableOpacity style={{
                                            width: '50%',
                                            height: 30,
                                            backgroundColor: selectedtab == "passed" ? 'blue' : 'white',
                                            borderRadius: 15,
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}
                                            onPress={() => {
                                                setSelectedtab("passed");
                                                onChange(passed)
                                                console.log("pressfirst", passed)
                                            }}>
                                            <Text style={{ color: selectedtab == "passed" ? 'white' : 'black' }}>{passed}</Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity style={{
                                            width: '50%',
                                            height: 30,
                                            backgroundColor: selectedtab == "pursuing" ? 'blue' : 'white',
                                            borderRadius: 15,
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}
                                            onPress={() => {
                                                setSelectedtab("pursuing");
                                                onChange(pursuing)
                                                console.log("presssecond", pursuing)
                                            }}>
                                            <Text style={{ color: selectedtab == "pursuing" ? 'white' : 'black' }}>{pursuing}</Text>
                                        </TouchableOpacity>
                                    </View>
                                )}
                                name="status" />
                        </View>
                    </View>



                    <View style={GlobalStyleSheet.inputWrapper}>
                        {/* <Controller
                            control={control}
                            rules={{
                                required: false,
                            }}
                            render={({
                                field: {
                                    onChange, value
                                }
                            }) => ( */}
                        <TouchableOpacity onPress={() => setOpen(true)}>

                            <TextInput
                                {...commonTextInputProps}
                                label="Start Date"
                                editable={false}

                            />
                            {/* <DatePicker
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
                                    /> */}

                        </TouchableOpacity>
                        {open && (
                            <DateTimePicker
                                mode='date'
                                value={date || new Date()}
                                onChange={handleDateChange} />
                        )}

                        {/* )}
                            name="start_date"
                        /> */}
                        {
                            errors.end_date && (
                                <Text style={styles.errorText}>{errors.start_date.message}</Text>
                            )
                        }
                    </View>

                    {selectedtab == "passed" ? (<View style={GlobalStyleSheet.inputWrapper}>
                        <Controller
                            control={control}
                            rules={{
                                required: false,
                            }}
                            render={({
                                field: {
                                    onChange, value
                                }
                            }) => (
                                <TouchableOpacity onPress={() => setOpen(true)}>
                                    {/* <DatePicker
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
                                    /> */}
                                    <TextInput
                                        {...commonTextInputProps}
                                        label="End Date"
                                        editable={false}
                                        // value={date}
                                        value={date}
                                        onChangeText={onChange}
                                    />

                                </TouchableOpacity>
                            )}
                            name="end_date"
                        />
                        {
                            errors.end_date && (
                                <Text style={styles.errorText}>{errors.end_date.message}</Text>
                            )
                        }
                    </View>) : (null)}


                    <View style={GlobalStyleSheet.buttonWrapper}>
                        <TouchableOpacity style={GlobalStyleSheet.button} onPress={handleSubmit(onPressAdd)}>

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
    subTitle1: {
        color: customTextColor.primary,
        fontFamily: customFonts.fontPoppins,
        fontSize: customFontSize.font14,
        paddingHorizontal: 5,
        paddingVertical: 5,
        marginLeft: -45,
        width: "45%",
    },
    input: {
        backgroundColor: 'transparent',
    },
    row: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        flexDirection: 'row',
        marginBottom: 10,
        marginTop: 5,
        justifyContent: 'space-between',
    },
    errorText: {
        color: 'red',
        margin: 0,
        padding: 0,
    },

    studyRow: {
        width: '90%',
        height: 40,
        borderWidth: 0.5,
        borderRadius: 15,
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 5,
        paddingRight: 5,
    },

});

export default EducationAdd;