import React from 'react';
import {SafeAreaView, StyleSheet, View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

// Import Screens
import SplashScreen from './src/screens/SplashScreen';
import LoginScreen from './src/screens/LoginScreen';
import RegistrationScreen from './src/screens/RegistrationScreen';
import MainLandingScreen from './src/screens/MainLandingScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import HospitalInfoScreen from './src/screens/HospitalInfoScreen';
import CommunityScreen from './src/screens/CommunityScreen';
import MyPageScreen from './src/screens/MyPageScreen';

// Create Stack and Tab Navigators
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Custom Tab Bar Icons
const CustomTabIcon = ({route, color, size}) => {
  let iconName;

  switch (route.name) {
    case 'Home':
      iconName = 'home-outline';
      break;
    case 'HospitalInfo':
      iconName = 'information-circle-outline';
      break;
    case 'Grafting':
      iconName = 'cut-outline'; // Reverted to the cut-outline icon
      break;
    case 'Community':
      iconName = 'chatbubbles-outline';
      break;
    case 'MyPage':
      iconName = 'person-outline';
      break;
    default:
      break;
  }

  return <Icon name={iconName} color={color} size={size} style={styles.icon} />;
};

// Main Home Screen with Bottom Tabs
const MainTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({color, size}) => (
          <CustomTabIcon route={route} color={color} size={size + 6} />
        ),
        tabBarLabelStyle: styles.tabBarLabel,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: '#003DA5',
        tabBarInactiveTintColor: '#A0A0A0',
      })}>
      <Tab.Screen
        name="Home"
        component={MainLandingScreen}
        options={{
          headerShown: false,
          tabBarLabel: '홈',
        }}
      />
      <Tab.Screen
        name="HospitalInfo"
        component={HospitalInfoScreen}
        options={{
          headerShown: false,
          tabBarLabel: '병원정보',
        }}
      />
      <Tab.Screen
        name="Grafting"
        component={SettingsScreen}
        options={{
          headerShown: false,
          tabBarLabel: '가상이식',
        }}
      />
      <Tab.Screen
        name="Community"
        component={CommunityScreen}
        options={{
          headerShown: false,
          tabBarLabel: '커뮤니티',
        }}
      />
      <Tab.Screen
        name="MyPage"
        component={MyPageScreen}
        options={{
          headerShown: false,
          tabBarLabel: '마이페이지',
        }}
      />
    </Tab.Navigator>
  );
};

// Main App Navigator
const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="SplashScreen">
          <Stack.Screen
            name="SplashScreen"
            component={SplashScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="LoginScreen"
            component={LoginScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="RegistrationScreen"
            component={RegistrationScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="MainTabs"
            component={MainTabs}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  tabBar: {
    height: 80,
    paddingVertical: 10,
  },
  tabBarLabel: {
    fontSize: 14, // Increased the font size of the label
    paddingBottom: 6, // Adds padding below the text, pushing the text up
    fontWeight: 'bold', // Make the text bold
  },
  icon: {
    marginBottom: 6, // Adds padding below the icon, pushing the icon up
  },
});

export default App;
