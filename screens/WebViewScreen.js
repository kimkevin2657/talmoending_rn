import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, View, ActivityIndicator} from 'react-native';
import WebView from 'react-native-webview';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation, useFocusEffect} from '@react-navigation/native';

const WebViewScreen = () => {
  console.log('!!!================== WebViewScreen ');
  const navigation = useNavigation();
  const [currentUrl, setCurrentUrl] = useState(
    'http://43.202.219.28:8000/common/login',
  );
  const [showOverlay, setShowOverlay] = useState(false); // State to control overlay visibility
  const [webViewKey, setWebViewKey] = useState(Date.now());
  const saveCurrentUrl = async url => {
    try {
      await AsyncStorage.setItem('@current_url', url);
    } catch (e) {
      console.error('Failed to save the URL to AsyncStorage', e);
    }
  };
  useEffect(() => {
    saveCurrentUrl(currentUrl);
    const fetchJwtToken = async () => {
      const jwtToken = await AsyncStorage.getItem('@jwt_token');
      if (jwtToken) {
        // If JWT token exists, navigate to the main screen
        // navigation.navigate('MainWebViewScreen');
      }
    };
    fetchJwtToken();
  }, [currentUrl]);

  useFocusEffect(
    React.useCallback(() => {
      setCurrentUrl('http://43.202.219.28:8000/common/login');
      setWebViewKey(Date.now());
    }, []),
  );

  const saveJwtToken = async token => {
    try {
      await AsyncStorage.setItem('@jwt_token', token);
    } catch (e) {
      console.error('Failed to save the JWT token to AsyncStorage', e);
    }
  };

  const handleNavigationStateChange = navState => {
    const {url} = navState;
    console.log('!!!============ currentUrl   ', currentUrl);
    console.log('!!!============ new url   ', url);

    setShowOverlay(true);

    const jwtTokenPattern = /jwt=([^&]+)/;
    const match = url.match(jwtTokenPattern);
    if (match && match[1]) {
      const jwtToken = match[1];
      saveJwtToken(jwtToken); // Save the JWT token in AsyncStorage
      // navigation.navigate('MainScreen');
      // setShowOverlay(false);
      // return;
    }

    if (
      currentUrl === 'http://43.202.219.28:8000/common/login/' &&
      url.includes('http://43.202.219.28:8000/synopex')
    ) {
      navigation.navigate('PinEntryScreen');
      setShowOverlay(false);
    } else if (
      currentUrl.includes('http://43.202.219.28:8000/common/signup/') &&
      url.includes('http://43.202.219.28:8000/synopex')
    ) {
      navigation.navigate('PhoneVerificationScreen');
      setShowOverlay(false);
    } else {
      setCurrentUrl(url);
      saveCurrentUrl(url);
      setShowOverlay(false);
    }
  };

  return (
    <View style={styles.flexContainer}>
      <WebView
        key={webViewKey} // Use the dynamic key
        source={{uri: currentUrl}}
        onNavigationStateChange={handleNavigationStateChange}
        style={styles.webViewStyle}
      />
      {showOverlay && (
        <View style={styles.overlay}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  flexContainer: {
    flex: 1,
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
});

export default WebViewScreen;
