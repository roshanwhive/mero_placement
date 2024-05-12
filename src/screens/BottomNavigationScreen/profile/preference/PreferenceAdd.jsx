import { useNavigation } from "@react-navigation/native"
import { Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import AppBar from "../../../../components/custom_toolbar/AppBar";
import { customTextColor, customThemeColor } from "../../../../constants/Color";
import { customFontSize, customFonts } from "../../../../constants/theme";
import { GlobalStyleSheet } from "../../../../constants/StyleSheet";
import { TextInput } from "react-native-paper";
import { useEffect, useState } from "react";
import DatePicker from 'react-native-date-picker';
import { getPrefFormData } from "../../../../features/formData/FormSlice";
import { useDispatch, useSelector } from "react-redux";
import { Dropdown } from "react-native-element-dropdown";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup';
import { Controller, useForm } from "react-hook-form";
import { addPreference, resetPreferenceState } from "../../../../features/profile/PreferenceSlice";

const PreferenceAdd = () => {

    const navigation = useNavigation();
    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false)
    const { prefFormData, category, available_type, level, locaton, skill } = useSelector(state => state.formOptions);


    const dispatch = useDispatch();

    const handleBack = () => {
        navigation.goBack();
    };

    useEffect(() => {
        dispatch(getPrefFormData());
    }, [dispatch]);

    useEffect(() => {
        console.log('prefFormData', typeof prefFormData);
    }, [dispatch]);

    const [categoryname, setCategoryname] = useState([]);
    const [categoryId, setCategoryID] = useState("");
    useEffect(() => {
        if (category && Array.isArray(category)) {
            const mappedCategoryList = category.map(item => ({
                label: item.name,
                value: item.job_category_id,
            }));
            setCategoryname(mappedCategoryList);
        }
    }, [category]);

    const [availableType, setAvailableType] = useState([]);
    const [availableTypeId, setAvailableTypeId] = useState("");
    useEffect(() => {
        if (available_type && Array.isArray(available_type)) {
            const mappedAvailableTypeList = available_type.map(item => ({
                label: item.employment_type,
                value: item.employment_type_id,
            }));
            setAvailableType(mappedAvailableTypeList);
        }
    }, [available_type]);

    const [levelJob, setLevelJob] = useState([]);
    const [levelJobId, setLevelJobId] = useState("");
    useEffect(() => {
        if (level && Array.isArray(level)) {
            const mappedLevelJobList = level.map(item => ({
                label: item.name,
                value: item.level_id,
            }));
            setLevelJob(mappedLevelJobList);
        }
    }, [level]);

    const [district, setDistrict] = useState([]);
    const [districtId, setdistrictId] = useState("");
    useEffect(() => {
        if (locaton && Array.isArray(locaton)) {
            const mappedDistrictList = locaton.map(item => ({
                label: item.district_name,
                value: item.district_id,
            }));
            setDistrict(mappedDistrictList);
        }
    }, [locaton]);

    const [skillJob, setSkillJob] = useState([]);
    const [skillJobId, setSkillJobId] = useState("");
    useEffect(() => {
        if (skill && Array.isArray(skill)) {
            const mappedSkillJobList = skill.map(item => ({
                label: item.skill,
                value: item.skill_id,
            }));
            setSkillJob(mappedSkillJobList);
        }
    }, [skill]);

    const schema = yup.object().shape({

    });

    const {
        control,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            preferred_job: '',
            expected_salary: '',
            job_categories: '',
            availible_type: '',
            level: '',
            location: '',
            skill: '',
        },
    });

    const onPressAdd = prefData => {
        dispatch(addPreference(prefData)).then(() => {
            console.log("first", prefData)
            setTimeout(() => {
                dispatch(resetPreferenceState());
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
                    <Text style={styles.title}>Preference</Text>
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
                                    label="Preferred Job"
                                    value={value}
                                    onChangeText={onChange}
                                />
                            )}
                            name="preferred_job"
                        />
                        {
                            errors.preferred_job && (
                                <Text style={styles.errorText}>{errors.preferred_job.message}</Text>
                            )
                        }
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
                                    label="Expected Salary"
                                    value={value}
                                    onChangeText={onChange}
                                />

                            )}
                            name="expected_salary"
                        />
                        {
                            errors.expected_salary && (
                                <Text style={styles.errorText}>{errors.expected_salary.message}</Text>
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
                                    data={categoryname}
                                    placeholder='Select Category'
                                    maxHeight={300}
                                    labelField="label"
                                    valueField="value"
                                    value={categoryId}
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
                            name="job_categories"
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
                                    data={availableType}
                                    placeholder='Select Available Type'
                                    maxHeight={300}
                                    labelField="label"
                                    valueField="value"
                                    value={availableTypeId}
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
                            name="availible_type"
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
                                    data={levelJob}
                                    placeholder='Select Level'
                                    maxHeight={300}
                                    labelField="label"
                                    valueField="value"
                                    value={levelJobId}
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
                            name="level"
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
                                    data={district}
                                    placeholder='Select Location'
                                    maxHeight={300}
                                    labelField="label"
                                    valueField="value"
                                    value={districtId}
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
                            name="location"
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
                                    data={skillJob}
                                    placeholder='Select Skill'
                                    maxHeight={300}
                                    labelField="label"
                                    valueField="value"
                                    value={skillJobId}
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
                            name="skill"
                        />
                    </View>


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
    errorText: {
        color: 'red',
        margin: 0,
        padding: 0,
    },

});

export default PreferenceAdd;
