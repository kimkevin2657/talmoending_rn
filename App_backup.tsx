import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import WebViewScreen from './screens/WebViewScreen';
import PhoneVerificationScreen from './screens/PhoneVerificationScreen';
import PinEntryScreen from './screens/PinEntryScreen';
import SetPinScreen from './screens/SetPinScreen';
import MainWebViewScreen from './screens/MainWebViewScreen';
// import BluetoothConnectScreen from './screens/BluetoothConnectScreen';
import BLEScreen from './screens/BluetoothConnectScreen';

import RegistrationScreen from './screens/RegistrationScreen';
import LoginScreen from './screens/LoginScreen';
import RegistrationAgreementScreen from './screens/RegistrationAgreementScreen';
import RegistrationBasic from './screens/RegistrationBasic';

import RegistrationProfile from './screens/RegistrationProfile';

import MainLandingScreen from './screens/MainLandingScreen';

import WalkingInputScreen from './screens/WalkingInputScreen';
import BPInputScreen from './screens/BPInputScreen';
import BSInputScreen from './screens/BSInputScreen';

import WalkingHistoryScreen from './screens/WalkingHistoryScreen';
import BPHistoryScreen from './screens/BPHistoryScreen';
import BSHistoryScreen from './screens/BSHistoryScreen';

import TotalDataScreen from './screens/TotalDataScreen';

import BloodTestChart from './screens/BloodTestChart';
import BloodTestSpecific from './screens/BloodTestSpecific';
import BloodTestHistoryScreen from './screens/BloodTestHistoryScreen';

import UserProfileUpdate from './screens/UserProfileUpdate';
// Placeholder for another screen
// import AnotherScreen from './screens/AnotherScreen'; // Make sure to create this component

// import RadarChartComponent from './components/RadarChart';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginScreen">
        {/* <Stack.Screen
          name="RadarChartComponent"
          component={RadarChartComponent}
          options={{headerShown: false}}
        /> */}
        <Stack.Screen
          name="WebViewScreen"
          component={WebViewScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="RegistrationAgreementScreen"
          component={RegistrationAgreementScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="RegistrationBasic"
          component={RegistrationBasic}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="RegistrationProfile"
          component={RegistrationProfile}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="UserProfileUpdate"
          component={UserProfileUpdate}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="MainLandingScreen"
          component={MainLandingScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="BloodTestChart"
          component={BloodTestChart}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="BloodTestSpecific"
          component={BloodTestSpecific}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="BloodTestHistoryScreen"
          component={BloodTestHistoryScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="TotalDataScreen"
          component={TotalDataScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="RegistrationScreen"
          component={RegistrationScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="PhoneVerificationScreen"
          component={PhoneVerificationScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="PinEntryScreen"
          component={PinEntryScreen}
          options={{title: 'PIN 번호 인증'}}
        />
        <Stack.Screen
          name="SetPinScreen"
          component={SetPinScreen}
          options={{title: 'PIN 번호 설정'}}
        />
        <Stack.Screen
          name="WalkingInputScreen"
          component={WalkingInputScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="BPInputScreen"
          component={BPInputScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="BSInputScreen"
          component={BSInputScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="WalkingHistoryScreen"
          component={WalkingHistoryScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="BPHistoryScreen"
          component={BPHistoryScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="BSHistoryScreen"
          component={BSHistoryScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="MainWebViewScreen"
          component={MainWebViewScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="BluetoothConnectScreen"
          component={BLEScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
