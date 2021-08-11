import React from 'react';
import { Text ,View, FlatList } from "react-native";
import { BottomContainerStyle as styles } from './styles';


const DATA = [
    {
        id: 1,
        day: "MON",
        temp:23,
    },
    {
        id: 2,
        day: "TUE",
        temp:22,
    },
    {
        id: 3,
        day: "WD",
        temp:73,
    },
    {
        id: 4,
        day: "TH",
        temp:20,
    },
    {
        id: 6,
        day: "FRD",
        temp:28,
    },
    {
        id: 7,
        day: "FRD",
        temp:28,
    },

];

const Item = ({ day, temp }) => (
  <View style={styles.textContainer}>
    <View style={{borderColor: 'black'}}>
        <Text style={styles.textStyle}>
            {new Date(day).toDateString()}
        </Text>
        </View>
        <View>
            <Text style={styles.textStyle}>
                {temp}
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