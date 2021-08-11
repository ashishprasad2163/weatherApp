import React ,{ useEffect, useState } from 'react';
import { Text ,SafeAreaView, View, Button, PermissionsAndroid } from "react-native";
import TopContainer from './TopContainer';
import BottomContainer from './BottomContainer';
import {connect} from 'react-redux';
import { getWeatherData, getCityName } from '../../actions/weatherApi';
import PropTypes from 'prop-types';
import store from '../../store';
import Geocoder from 'react-native-geocoding';
import Geolocation from 'react-native-geolocation-service';
let temp;
let name;
let tempArr;

const Home = ({latitude,longitude , data:{ wdata, loading, cityName }}) => {

    const handleRetry = () => {
        store.dispatch(getWeatherData(latitude,longitude));
        store.dispatch(getCityName(latitude,longitude));
    };

    if (wdata && wdata.current && cityName) {
         temp = wdata.current.temp;
         name = cityName[0].name;
         tempArr = wdata.daily;
    }

    useEffect(() => {
        store.dispatch(getWeatherData(latitude,longitude));
        store.dispatch(getCityName(latitude,longitude));
    },[]);

    return (
        <SafeAreaView>
            {loading === true ? (
                <View>
                    <Text>
                        Loading
                    </Text>
                </View>
            ) : loading === false && temp ? (
                <View>
                    <TopContainer 
                        loading={loading} 
                        temp={temp} 
                        cityName={name}
                        />
                    <BottomContainer tempArr={tempArr}/>
                </View>
            ) : (
                <View>
                    <Text>
                        Something wrong.
                    </Text>
                    <Button
                        title='retry'
                        onPress={handleRetry}
                    />
                </View>
            )}
            
        </SafeAreaView>
    )
}
Home.propTypes = {
  getWeatherData: PropTypes.func.isRequired,
  getCityName: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({data: state.data});

export default connect(mapStateToProps, {getWeatherData, getCityName})(Home);