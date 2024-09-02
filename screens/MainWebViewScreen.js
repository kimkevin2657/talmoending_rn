import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Button,
  View,
  ActivityIndicator,
} from 'react-native';
import WebView from 'react-native-webview';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';

const WebViewScreen = () => {
  const navigation = useNavigation();
  const [currentUrl, setCurrentUrl] = useState(
    'http://43.202.219.28:8000/synopex',
  );
  const [showOverlay, setShowOverlay] = useState(false); // State to control overlay visibility
  const saveCurrentUrl = async url => {
    try {
      await AsyncStorage.setItem('@current_url', url);
    } catch (e) {
      console.error('Failed to save the URL to AsyncStorage', e);
    }
  };
  useEffect(() => {
    saveCurrentUrl(currentUrl);
  }, [currentUrl]);

  const handleLogoutPress = async () => {
    // Navigate to the WebViewScreen or refresh it
    // setCurrentUrl('http://43.202.219.28:8000/synopex/'); // Update the URL as needed to refresh or navigate
    // Optionally, you might want to do additional logout logic here
    try {
      await AsyncStorage.removeItem('@jwt_token');
      console.log('JWT token removed successfully');
    } catch (e) {
      console.error('Failed to remove the JWT token', e);
    }
    navigation.navigate('LoginScreen');
  };
  const connectDevice = async () => {
    navigation.navigate('BluetoothConnectScreen');
  };

  const handleNavigationStateChange = navState => {
    // const {url} = navState;
    // // Immediately try to show the overlay
    // setShowOverlay(true);
    // if (url.includes('http://43.202.219.28:8000/synopex/')) {
    //   // Directly navigate without waiting for state update
    //   navigation.navigate('PinEntryScreen');
    // } else {
    //   setCurrentUrl(url);
    //   saveCurrentUrl(url);
    // }
    // // Hide the overlay in all cases other than navigation to 'PinEntryScreen'
    // if (!url.includes('http://43.202.219.28:8000/synopex/')) {
    //   setShowOverlay(false);
    // }
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.webViewContainer}>
          <WebView source={{uri: currentUrl}} style={styles.webViewStyle} />
        </View>
        <View style={styles.footer}>
          <Button title="Lumiio 연동하기" onPress={connectDevice} />
        </View>
        <View style={styles.footer}>
          <Button title="로그아웃" onPress={handleLogoutPress} />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webViewContainer: {
    flex: 1, // WebView takes up all space above the footer
  },
  webViewStyle: {
    flex: 1,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  footer: {
    height: 50, // Adjust the height as needed
    justifyContent: 'center',
    backgroundColor: '#f0f0f0', // Optional: Change the background color as needed
  },
});

export default WebViewScreen;
