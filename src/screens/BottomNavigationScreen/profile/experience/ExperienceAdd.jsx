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

const ExperienceAdd = () => {

    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false)

    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    const [show, setShow] = useState(true);

    const { organization_type, job_level, job_category } = useSelector(state => state.formOptions);

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
                        <TextInput
                            {...commonTextInputProps}
                            label="Organization Name"
                        >
                        </TextInput>
                    </View>

                    <View style={GlobalStyleSheet.inputWrapper}>
                        <Dropdown
                            data={organizationType}
                            placeholder='Select Organization Type'
                            maxHeight={300}
                            labelField="label"
                            valueField="value"
                            value={organizationId}
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
                                setOrganizationId(item.value)
                                //handleSubmit(item.value)
                                console.log("click" + item.value);
                            }}
                        // onChange={(item) => handleSubmit(item.value)}
                        />
                    </View>
                    <View style={GlobalStyleSheet.inputWrapper}>
                        <Dropdown
                            data={jobLevel}
                            placeholder='Select Job Level'
                            maxHeight={300}
                            labelField="label"
                            valueField="value"
                            value={jobLevelId}
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
                                setJobLevelId(item.value)
                                //handleSubmit(item.value)
                                console.log("click" + item.value);
                            }}
                        // onChange={(item) => handleSubmit(item.value)}
                        />
                    </View>
                    <View style={GlobalStyleSheet.inputWrapper}>
                        <Dropdown
                            data={jobCategory}
                            placeholder='Select Category'
                            maxHeight={300}
                            labelField="label"
                            valueField="value"
                            value={jobCategoryId}
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
                                setJobCategoryId(item.value)
                                //handleSubmit(item.value)
                                console.log("click" + item.value);
                            }}
                        // onChange={(item) => handleSubmit(item.value)}
                        />
                    </View>
                    <View style={GlobalStyleSheet.inputWrapper}>
                        <TextInput
                            {...commonTextInputProps}
                            label="Position"
                        >
                        </TextInput>
                    </View>


                    <View style={GlobalStyleSheet.inputWrapper}>
                        <TextInput
                            {...commonTextInputProps}
                            label="Duties"
                        >
                        </TextInput>
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
                    </View>
                </View>
                <View style={GlobalStyleSheet.buttonWrapper}>
                    <TouchableOpacity style={GlobalStyleSheet.button} onPress={() => navigation.navigate('EducationList')}>

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

});

export default ExperienceAdd;