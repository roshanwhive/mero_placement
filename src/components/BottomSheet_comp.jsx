import React, { useCallback, useMemo, useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';


const BottomSheet_comp = () => {
    const bottomSheetRef = useRef(null);
    const snapPoints = useMemo(() => ['25%', '50%'], []);

    //callbacks
    const handleSheetChanges = useCallback(index => {
        console.log('handleSheetChanges', index);
    }, []);

    return (
        <View style={styles.container}>
            <BottomSheet
                ref={bottomSheetRef}
                onChange={handleSheetChanges}
                index={1}
                snapPoints={snapPoints}
                style={styles.contentContainer}>
                <Text>Awesome 🎉</Text>
            </BottomSheet>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: 'grey',
    },
    contentContainer: {
        flex: 1,
        alignItems: 'center',
    },
});

export default BottomSheet_comp;