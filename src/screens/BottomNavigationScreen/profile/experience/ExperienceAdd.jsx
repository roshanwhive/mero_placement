import { useNavigation } from "@react-navigation/native"
import { ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from "react-native"
import AppBar from "../../../../components/custom_toolbar/AppBar";
import { customTextColor, customThemeColor } from "../../../../constants/Color";
import { customFontSize, customFonts } from "../../../../constants/theme";
import { GlobalStyleSheet } from "../../../../constants/StyleSheet";
import { TextInput } from "react-native-paper";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dropdown } from "react-native-element-dropdown";
import { getExpFormData } from "../../../../features/formData/FormSlice";
import DatePicker from "react-native-date-picker";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup';
import { addExperience, resetExperienceState } from "../../../../features/profile/ExperienceSlice";
import { showMessage } from "react-native-flash-message";

const ExperienceAdd = () => {

    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false)

    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    const [show, setShow] = useState(true);

    const { organization_type, job_level, job_category } = useSelector(state => state.formOptions);
    const { messageAdd, isSuccess, isLoading, isError, statusCode } = useSelector(
        state => state.experience,
    );
    useEffect(() => {
        dispatch(getExpFormData());
    }, [dispatch]);


    const [organizationType, setOrganizationType] = useState([]);
    const [organizationId, setOrganizationId] = useState("");
    useEffect(() => {
        if (organization_type && Array.isArray(organization_type)) {
            const mappedOrganizationTypeList = organization_type.map(item => ({
                label: item.name,
                value: item.company_type_id,
            }));
            setOrganizationType(mappedOrganizationTypeList);
        }
    }, [organization_type]);

    const [jobLevel, setJobLevel] = useState([]);
    const [jobLevelId, setJobLevelId] = useState("");
    useEffect(() => {
        if (job_level && Array.isArray(job_level)) {
            const mappedJobLevelList = job_level.map(item => ({
                label: item.name,
                value: item.level_id,
            }));
            setJobLevel(mappedJobLevelList);
        }
    }, [job_level]);

    const [jobCategory, setJobCategory] = useState([]);
    const [jobCategoryId, setJobCategoryId] = useState("");
    useEffect(() => {
        if (job_category && Array.isArray(job_category)) {
            const mappedJobCategoryList = job_category.map(item => ({
                label: item.name,
                value: item.job_category_id,
            }));
            setJobCategory(mappedJobCategoryList);
        }
    }, [job_category]);

    const handleBack = () => {
        navigation.goBack();
    };

    // useEffect(() => {
    //     if (isError && statusCode !== 200 && statusCode !== 0) {
    //         showMessage({
    //             message: JSON.stringify(message),
    //             type: 'danger',
    //             animationDuration: 1000,
    //             animated: true,
    //         });
    //     } else if (isSuccess && statusCode === 200) {
    //         navigation.navigate('ExperienceList');
    //         showMessage({
    //             message: JSON.stringify(message),
    //             type: 'success',
    //             animationDuration: 1000,
    //             animated: true,
    //         });
    //     }
    // }, [isError, isSuccess, statusCode, message]);

    const schema = yup.object().shape({
        organization_name: yup.string().required('Organization name is required'),
    });

    const {
        control,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm(
        {
            resolver: yupResolver(schema),
            defaultValues: {
                organization_name: '',
                organization_type_id: '',
                job_level_id: '',
                job_category_id: '',
                position: '',
                dutis: '',
                start_date: '',
                end_date: '',
            },
        }
    );

    const onPressAdd = experienceData => {
        dispatch(addExperience(experienceData)).then(() => {
            // //navigation.navigate('ExperienceList');
            // showMessage({
            //     message: JSON.stringify(messageAdd),
            //     type: 'success',
            //     animationDuration: 1000,
            //     animated: true,
            // });
            setTimeout(() => {
                dispatch(resetExperienceState());
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
                    <Text style={styles.title}>Experience</Text>
                </View>

                <View style={GlobalStyleSheet.containerForm}>
                    <View style={GlobalStyleSheet.inputWrapper}>
                        <Controller
                            control={control}
                            rules={{
                                required: true,
                            }}
                            render={({ field: { onChange, value } }) => (
                                <TextInput
                                    {...commonTextInputProps}
                                    label="Organization Name"
                                    value={value}
                                    onChangeText={onChange}
                                />
                            )}
                            name="organization_name"
                        />
                        {errors.organization_name && (
                            <Text style={styles.errorText}>{errors.org_Name.message}</Text>
                        )}
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
                                    data={organizationType}
                                    placeholder='Select Organization Type'
                                    maxHeight={300}
                                    labelField="label"
                                    valueField="value"
                                    value={organizationId}
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
                                        //handleSubmit(item.value)
                                        console.log("click" + item.value);
                                    }}
                                // onChange={(item) => handleSubmit(item.value)}
                                />
                            )}
                            name="organization_type_id"
                        />
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
                                    data={jobLevel}
                                    placeholder='Select Job Level'
                                    maxHeight={300}
                                    labelField="label"
                                    valueField="value"
                                    value={jobLevelId}
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
                                        //handleSubmit(item.value)
                                        console.log("click" + item.value);
                                    }}
                                // onChange={(item) => handleSubmit(item.value)}
                                />
                            )}
                            name="job_level_id"
                        />
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
                                    data={jobCategory}
                                    placeholder='Select Category'
                                    maxHeight={300}
                                    labelField="label"
                                    valueField="value"
                                    value={jobCategoryId}
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
                                        //handleSubmit(item.value)
                                        console.log("click" + item.value);
                                    }}
                                // onChange={(item) => handleSubmit(item.value)}
                                />
                            )}
                            name="job_category_id"
                        />
                    </View>

                    <View style={GlobalStyleSheet.inputWrapper}>
                        <Controller
                            control={control}
                            rules={{
                                required: true,
                            }}
                            render={({ field: { onChange, value } }) => (
                                <TextInput
                                    {...commonTextInputProps}
                                    label="Position"
                                    value={value}
                                    onChangeText={onChange}
                                />
                                // {errors.name && (
                                //     <Text style={styles.errorText}>{errors.name.message}</Text>
                                //   )}
                            )}
                            name="position"
                        />
                    </View>


                    <View style={GlobalStyleSheet.inputWrapper}>
                        <Controller
                            control={control}
                            rules={{
                                required: true,
                            }}
                            render={({ field: { onChange, value } }) => (
                                <TextInput
                                    {...commonTextInputProps}
                                    label="Duties"
                                    value={value}
                                    onChangeText={onChange}
                                />
                                // {errors.name && (
                                //     <Text style={styles.errorText}>{errors.name.message}</Text>
                                //   )}
                            )}
                            name="dutis"
                        />
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
                            <Controller
                                control={control}
                                rules={{
                                    required: true,
                                }}
                                render={({ field: { onChange, value } }) => (
                                    <TextInput
                                        {...commonTextInputProps}
                                        label="Start Date"
                                        value={value}
                                        onChangeText={onChange}
                                    />
                                    // {errors.name && (
                                    //     <Text style={styles.errorText}>{errors.name.message}</Text>
                                    //   )}
                                )}
                                name="start_date"
                            />


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

                            <Controller
                                control={control}
                                rules={{
                                    required: true,
                                }}
                                render={({ field: { onChange, value } }) => (
                                    <TextInput
                                        {...commonTextInputProps}
                                        label="End Date"
                                        value={value}
                                        onChangeText={onChange}
                                    />
                                    // {errors.name && (
                                    //     <Text style={styles.errorText}>{errors.name.message}</Text>
                                    //   )}
                                )}
                                name="end_date"
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={GlobalStyleSheet.buttonWrapper}>
                    <TouchableOpacity style={GlobalStyleSheet.button} onPress={handleSubmit(onPressAdd)}>

                        <Text style={GlobalStyleSheet.buttonText}>Save Changes</Text>
                    </TouchableOpacity>
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
    errorText: {
        color: 'red',
        margin: 0,
        padding: 0,
    },

});

export default ExperienceAdd;