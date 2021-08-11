import React ,{ useEffect, useState } from 'react';
import { Text ,SafeAreaView, View, Button, PermissionsAndroid } from "react-native";
import TopContainer from './TopContainer';
import BottomContainer from './BottomContainer';
import {connect} from 'react-redux';
import { getWeatherData, getCityName } from '../../actions/weatherApi';
import PropTypes from 'prop-types';
import store from '../../store';
import LottieView from 'lottie-react-native';

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
                <LottieView style={{flex:1}} source={require('../../assets/226-splashy-loader.json')} autoPlay loop />
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
                <View style={{height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                    <Text>
                        Something Went Wrong at our end.
                    </Text>
                    <Button
                        title='RETRY'
                        onPress={handleRetry}
                        style={{ width: '25%'}}
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