import React from 'react';
import { Text ,View } from "react-native";
import { topContainerStyle as styles } from './styles';


const InfoView = (props) => {
    // const tempInC = (props.temp - 273.15).toFixed(2) ;
    return (
        <View style={styles.container}>
            <View style={styles.headerView}>
                <Text style={styles.headerText}>
                     {props.temp}
                </Text>
            </View>
            <View style={styles.footerView}>
                <Text style={styles.footerText}>
                    {props.cityName}
                </Text>
            </View>
        </View>
    )
}

export default InfoView;