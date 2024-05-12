import { useNavigation } from "@react-navigation/native";
import { SafeAreaView, Text, View } from "react-native"
import { useSelector } from "react-redux";
import EducationAdd from "./EducationAdd";
import EducationList from "./EducationList";

const Index = () => {

    const { allEducation, isLoading } = useSelector(state => state.education);
    const navigation = useNavigation();

    return (
        <SafeAreaView>

            {
                Object.keys(allEducation).length === 0 ? (<EducationAdd />) : (<EducationList />)
            }

        </SafeAreaView>
    );
}

export default Index;