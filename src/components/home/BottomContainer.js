import React from 'react';
import { Text ,View, FlatList } from "react-native";
import { BottomContainerStyle as styles } from './styles';


const Item = ({ day, temp }) => (
  <View style={styles.textContainer}>
    <View style={{borderColor: 'black'}}>
        <Text style={styles.textStyle}>
            {new Date(day).toDateString()}
        </Text>
        </View>
        <View>
            <Text style={styles.textStyle}>
                {temp} °C
            </Text>
        </View>
  </View>
);

const BottomList = (props) => {
    console.log(props.tempArr);
    const renderItem = ({ item }) => (
        <Item day={item.dt} temp={item.temp.day}/>
    );
    return (
        <View>
            <FlatList
                data={props.tempArr}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderItem}
            />
        </View>
    )
};

export default BottomList;