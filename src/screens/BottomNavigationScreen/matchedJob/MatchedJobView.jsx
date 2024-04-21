import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { getMatchedJob } from "../../../features/status/StatusSlice";
import { useEffect } from "react";
import CardSkeleton from "../../../components/skeleton_loader/CardSkeleton";
import JobCard from "../../../components/JobCard";
import { GlobalStyleSheet } from "../../../constants/StyleSheet";   
import { View } from "react-native";


const MatchedJobView = () => {

    const dispatch = useDispatch();
    const navigation = useNavigation();
    const { matchedJobs } = useSelector(state => state.status);
    const { isLoading } = useSelector(state => state.auth);

    useEffect(() => {
        dispatch(getMatchedJob());
    }, [dispatch]);

   
    useEffect(() => {
        console.log("matchedjob", typeof matchedJobs);
    }, [matchedJobs]);

    return (
        <>
            {isLoading ? (
                <>

                    <CardSkeleton />
                    <CardSkeleton />
                    <CardSkeleton />
                </>
            ) : (

                <View>
                    {!!matchedJobs ? (
                        matchedJobs?.data?.map((item, index) => {
                            return (
                                <View key={index} style={GlobalStyleSheet.cardContainer}>
                                    <JobCard navigation={navigation} items={item} />
                                </View>
                            );
                        })
                    ) : (
                        <View>
                            <CardSkeleton />
                            <CardSkeleton />
                            <CardSkeleton />
                        </View>
                    )}
                </View>
            )}
        </>
    );
};

export default MatchedJobView;