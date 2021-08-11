import React ,{ useEffect } from 'react';
import { Text ,SafeAreaView, View, Button } from "react-native";
import TopContainer from './TopContainer';
import BottomContainer from './BottomContainer';
import {connect} from 'react-redux';
import { getWeatherData, getCityName } from '../../actions/weatherApi';
import PropTypes from 'prop-types';
import store from '../../store';
let temp;
let name;
let tempArr;

const Home = ({data:{ wdata, loading, cityName }}) => {
    if (wdata && cityName) {
         temp = wdata.current.temp;
         name = cityName[0].name;
         tempArr = wdata.daily;
    }
    const handleRetry = () => {
        store.dispatch(getWeatherData());
        store.dispatch(getCityName());
    };
    console.log(loading);
    useEffect(() => {
        store.dispatch(getWeatherData());
        store.dispatch(getCityName());
    },[]);
    // console.log("data=>",wdata.current.temp);
    // console.log("cityName",cityName[0].name);
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