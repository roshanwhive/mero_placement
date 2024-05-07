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

const PreferenceAdd = () => {

    const navigation = useNavigation();
    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false)
    const { prefFormData, category, available_type, level, locaton, skill } = useSelector(state => state.formOptions);


    const [levelJob, setLevelJob] = useState([]);
    const [levelJobId, setLevelJobId] = useState("");
    const [district, setDistrict] = useState([]);
    const [districtId, setdistrictId] = useState("");
    const [skillJob, setSkillJob] = useState([]);
    const [skillJobId, setSkillJobId] = useState("");
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

    useEffect(() => {
        if (level && Array.isArray(level)) {
            const mappedLevelJobList = level.map(item => ({
                label: item.name,
                value: item.level_id,
            }));
            setLevelJob(mappedLevelJobList);
        }
    }, [level]);

    useEffect(() => {
        if (locaton && Array.isArray(locaton)) {
            const mappedDistrictList = locaton.map(item => ({
                label: item.district_name,
                value: item.district_id,
            }));
            setDistrict(mappedDistrictList);
        }
    }, [locaton]);

    useEffect(() => {
        if (skill && Array.isArray(skill)) {
            const mappedSkillJobList = skill.map(item => ({
                label: item.skill,
                value: item.skill_id,
            }));
            setSkillJob(mappedSkillJobList);
        }
    }, [skill]);

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
                        <TextInput
                            {...commonTextInputProps}
                            label="Preferred Job"
                        >
                        </TextInput>
                    </View>
                    <View style={GlobalStyleSheet.inputWrapper}>
                        <TextInput
                            {...commonTextInputProps}
                            label="Expected Salary"
                        >
                        </TextInput>
                    </View>

                    <View style={GlobalStyleSheet.inputWrapper}>
                        <Dropdown
                            data={categoryname}
                            placeholder='Select Category'
                            maxHeight={300}
                            labelField="label"
                            valueField="value"
                            value={categoryId}
                            placeholderStyle={{ color: customTextColor.secondary }}
                            selectedTextStyle={{ color: customTextColor.secondary }}
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
                                setCategoryID(item.value)
                                //handleSubmit(item.value)
                                console.log("click" + item.value);
                            }}
                        // onChange={(item) => handleSubmit(item.value)}
                        />
                    </View>
                    <View style={GlobalStyleSheet.inputWrapper}>
                        <Dropdown
                            data={availableType}
                            placeholder='Select Available Type'
                            maxHeight={300}
                            labelField="label"
                            valueField="value"
                            value={availableTypeId}
                            placeholderStyle={{ color: customTextColor.secondary }}
                            selectedTextStyle={{ color: customTextColor.secondary }}
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
                                setAvailableTypeId(item.value)
                                //handleSubmit(item.value)
                                console.log("click" + item.value);
                            }}
                        // onChange={(item) => handleSubmit(item.value)}
                        />
                    </View>
                    <View style={GlobalStyleSheet.inputWrapper}>
                        <Dropdown
                            data={levelJob}
                            placeholder='Select Level'
                            maxHeight={300}
                            labelField="label"
                            valueField="value"
                            value={levelJobId}
                            placeholderStyle={{ color: customTextColor.secondary }}
                            selectedTextStyle={{ color: customTextColor.secondary }}
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
                                setLevelJobId(item.value)
                                //handleSubmit(item.value)
                                console.log("click" + item.value);
                            }}
                        // onChange={(item) => handleSubmit(item.value)}
                        />
                    </View>
                    <View style={GlobalStyleSheet.inputWrapper}>
                        <Dropdown
                            data={district}
                            placeholder='Select Location'
                            maxHeight={300}
                            labelField="label"
                            valueField="value"
                            value={districtId}
                            placeholderStyle={{ color: customTextColor.secondary }}
                            selectedTextStyle={{ color: customTextColor.secondary }}
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
                                setdistrictId(item.value)
                                //handleSubmit(item.value)
                                console.log("click" + item.value);
                            }}
                        // onChange={(item) => handleSubmit(item.value)}
                        />
                    </View>
                    <View style={GlobalStyleSheet.inputWrapper}>
                        <Dropdown
                            data={skillJob}
                            placeholder='Select Skill'
                            maxHeight={300}
                            labelField="label"
                            valueField="value"
                            value={skillJobId}
                            placeholderStyle={{ color: customTextColor.secondary }}
                            selectedTextStyle={{ color: customTextColor.secondary }}
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
                                setSkillJobId(item.value)
                                //handleSubmit(item.value)
                                console.log("click" + item.value);
                            }}
                        // onChange={(item) => handleSubmit(item.value)}
                        />
                    </View>


                    <View style={GlobalStyleSheet.buttonWrapper}>
                        <TouchableOpacity style={GlobalStyleSheet.button} onPress={() => navigation.navigate('PreferenceList')}>

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

});

export default PreferenceAdd;
