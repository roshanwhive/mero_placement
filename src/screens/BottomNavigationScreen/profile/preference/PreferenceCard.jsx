import { Image, StyleSheet, Text, View } from "react-native"
import { customTextColor, customThemeColor } from "../../../../constants/Color"
import { useDispatch } from "react-redux";
import { customFontSize, customFonts } from "../../../../constants/theme";

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

    return (
        <View style={{
            backgroundColor: customThemeColor.white,
            borderRadius: 10,
            marginBottom: 18,
            padding: 15,
        }}>

            <View>
                <Row label="Preferred Job" value={items ? items.title_name : ''} />
                <Row label="Category" value={items?.job_category?.name} />
                {/* <Row label="Location" value={singleJob?.address?.address} /> */}
                <Row label="Expected salary" value={items?.expected_salary} />
                {/* <Row label="Position" value={singleJob?.vacancy_level?.name} /> */}
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