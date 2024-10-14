import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

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
import SimulationGuide from './src/screens/SimulationGuide';

// Create Stack and Tab Navigators
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const {width: screenWidth, height: screenHeight} = Dimensions.get('window');

// Custom Tab Bar Icons
const CustomTabIcon = ({route, focused}) => {
  let iconName;

  switch (route.name) {
    case 'Home':
      iconName = focused
        ? require('./static/icons/home_active.png')
        : require('./static/icons/home.png');
      break;
    case 'HospitalInfo':
      iconName = focused
        ? require('./static/icons/hospital_active.png')
        : require('./static/icons/hospital.png');
      break;
    case 'Grafting':
      iconName = focused
        ? require('./static/icons/grafting_active.png')
        : require('./static/icons/grafting.png');
      break;
    case 'Community':
      iconName = focused
        ? require('./static/icons/community_active.png')
        : require('./static/icons/community.png');
      break;
    case 'MyPage':
      iconName = focused
        ? require('./static/icons/profile_active.png')
        : require('./static/icons/profile.png');
      break;
    default:
      break;
  }
  if (iconName === 'HospitalInfo' || iconName === 'Community') {
    return <Image source={iconName} style={styles.iconspecial} />;
  } else {
    return <Image source={iconName} style={styles.icon} />;
  }
};

// Main Home Screen with Bottom Tabs
const MainTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused}) => (
          <CustomTabIcon route={route} focused={focused} />
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
          tabBarLabel: '마이',
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
        <Stack.Navigator initialRouteName="SimulationGuide">
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
          <Stack.Screen
            name="SimulationGuide"
            component={SimulationGuide}
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
    width: screenWidth * 0.97,
    left: screenWidth * 0.015,
    height: 80,
    paddingVertical: 10,
    borderTopLeftRadius: 40, // Rounded top left corner
    borderTopRightRadius: 40, // Rounded top right corner
    overflow: 'hidden', // Ensures the corners are clipped to be rounded
    backgroundColor: '#ffffff', // Ensure the background is solid to make the rounding visible
    elevation: 20, // Add shadow/elevation to make the rounded tab bar more noticeable

    // iOS Shadow
    shadowColor: '#A0A0A0', // Darker shadow color (black)
    shadowOffset: {width: 0, height: -5}, // Offset for the shadow
    shadowOpacity: 0.25, // Increased shadow opacity to make it more visible
    shadowRadius: 10, // Larger radius for a more diffused shadow
    borderColor: '#A0A0A0',
    borderWidth: 1,
  },
  tabBarLabel: {
    fontSize: 14, // Increased the font size of the label
    paddingBottom: 12, // Adds padding below the text, pushing the text up
    fontWeight: 'bold', // Make the text bold
  },
  icon: {
    width: 50, // Customize the size of the icons
    height: 50,
    marginBottom: 6, // Adds padding below the icon, pushing the icon up
  },
  iconspecial: {
    width: 10,
    height: 10,
    marginBottom: 6, // Adds padding below the icon, pushing the icon up
  },
});

export default App;
