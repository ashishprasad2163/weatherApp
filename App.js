/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState } from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  PermissionsAndroid,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import Home from './src/components/home/index';
import {Provider} from 'react-redux';
import store from './src/store';
import { getWeatherData } from './src/actions/weatherApi';
import Geocoder from 'react-native-geocoding';
import Geolocation from 'react-native-geolocation-service';

const Section = ({children, title}): Node => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [hasLocationPermission, setHasLocationPermission] = useState(false);
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  const requestLocationPermission = async () => {
    try {
    const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION &&
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
        title: 'Location Permission',
        message:
            'App wants to know your location ' +
            'so you can complete your profile.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
        },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the location');
        setHasLocationPermission(true);
    } else {
        console.log('Location permission denied');
        setHasLocationPermission(false);
    }
    } catch (err) {
        console.warn(err);
    }
  };

  useEffect(() => {
    requestLocationPermission();
      if (hasLocationPermission) {
          Geolocation.getCurrentPosition(
          (position) => {
          console.log(position);
          setLongitude(position.coords.longitude);
          setLatitude(position.coords.latitude);
          },
          (error) => {
          // See error code charts below.
          console.log(error.code, error.message);
          },
          {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
          );
      };
  });

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <Provider store={store}>
        <Home latitude={latitude} longitude={longitude}/>
      </Provider>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
