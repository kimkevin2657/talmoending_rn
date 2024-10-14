import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Animated,
  useWindowDimensions,
} from 'react-native';

const SplashScreen = ({navigation}) => {
  const [fadeAnim] = useState(new Animated.Value(1)); // Initial opacity for first fade-out
  const {width, height} = useWindowDimensions(); // Capture width and height from useWindowDimensions

  // Calculate scaling factor based on a design width of 360 (or your specific design width)
  const designWidth = 360; // Design width of the original screen
  const scaleFactor = width / designWidth;

  useEffect(() => {
    // First phase: fade out after 2 seconds
    const timeout1 = setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        // Navigate to the next screen once fade-out is almost complete
        const userIsLoggedIn = false; // Replace with actual login check
        if (userIsLoggedIn) {
          navigation.replace('MainTabs');
        } else {
          // navigation.replace('LoginScreen');
          navigation.replace('MainTabs');
        }
      });
    }, 2000);

    return () => {
      clearTimeout(timeout1);
    };
  }, [navigation, fadeAnim]);

  return (
    <View style={styles.container}>
      <Animated.View style={{opacity: fadeAnim}}>
        <View style={[styles.firstScreen, {paddingTop: height * 0.15}]}>
          <Text style={[styles.slogan, {fontSize: 18 * scaleFactor}]}>
            당신의 탈모고민 끝날때까지
          </Text>
          <Text style={[styles.title, {fontSize: 60 * scaleFactor}]}>
            탈모엔딩
          </Text>
          <View style={[styles.logoContainer, {left: -width * 0.6}]}>
            <Image
              source={require('../../static/imgs/logo_symbol.png')}
              style={[
                styles.logoSymbol,
                {
                  width: width * 1.2,
                  height: width * 1.2,
                  marginLeft: width * 0.08,
                  marginBottom: height * 0.01,
                }, // Adjusted size
              ]}
              resizeMode="cover"
            />
          </View>
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#ffffff', // White background
  },
  firstScreen: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-start', // Align items to the top
    alignItems: 'center',
  },
  slogan: {
    color: '#003DA5',
    fontFamily: 'MICEGothicOTFBold', // Changed to MICE 고딕
    textAlign: 'center',
    marginTop: 10,
  },
  title: {
    color: '#003DA5',
    fontFamily: 'MICEGothicOTFBold', // Changed to MICE 고딕 Bold
    textAlign: 'center',
    marginTop: 5,
  },
  logoContainer: {
    position: 'absolute',
    bottom: 0,
  },
  logoSymbol: {
    // The logo will be large and shifted leftwards
  },
});

export default SplashScreen;
