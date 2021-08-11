import { StyleSheet, Platform } from 'react-native';
import { windowWidth, windowHeight } from '../../utilities/Dimension';

export const topContainerStyle = StyleSheet.create({
    container: {
        width: windowWidth,
        height: (50 / 100) * windowHeight,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    headerView: {
        alignItems: 'center',
        justifyContent: 'center',
        width: (45 / 100) * windowWidth,
        height: (15 / 100) * windowHeight,
    },
    headerText: {
        fontSize: (10 / 100) * windowHeight,
    },
    footerView: {
        alignItems: 'center',
        justifyContent: 'center',
        width: (50 / 100) * windowWidth,
    },
    footerText: {
        fontSize: (4 / 100) * windowHeight,
    },
});

export const BottomContainerStyle = StyleSheet.create({
    textContainer: {
        width: (99 / 100) *windowWidth,
        height: (6 / 100) * windowHeight,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 1,
        borderColor: 'grey',
    },
    textStyle: {
        fontSize: (2.8 / 100) * windowHeight,
        marginHorizontal: (4.5 / 100) *windowWidth,
    }
});