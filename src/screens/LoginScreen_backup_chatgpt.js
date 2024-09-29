import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  useWindowDimensions,
} from 'react-native';

const LoginScreen = ({navigation}) => {
  const {width, height} = useWindowDimensions();

  // Proportional scaling based on the design width assumed to be 375px
  const designWidth = 375;
  const scaleFontSize = size => (size / designWidth) * width;

  return (
    <View style={styles.container}>
      {/* App Logo */}
      <View style={styles.logoContainer}>
        <Image
          source={require('../../static/imgs/logo_symbol.png')}
          style={[styles.logoSymbol, {width: width * 0.2, height: width * 0.2}]}
          resizeMode="contain"
        />
      </View>

      {/* Blue Container with Text and Buttons */}
      <View
        style={[
          styles.blueContainer,
          {
            width: width * 0.9,
            paddingVertical: height * 0.035, // Slightly reduced height
          },
        ]}>
        <Text
          style={[
            styles.slogan,
            {fontSize: scaleFontSize(26), textAlign: 'left', marginBottom: 10}, // Slightly smaller text
          ]}>
          당신의{'\n'}탈모고민{'\n'}끝날때까지
        </Text>
        <TouchableOpacity
          style={[styles.loginButton, {backgroundColor: '#F5F5F5'}]}
          onPress={() => navigation.navigate('MainTabs')}>
          <Image
            source={require('../../static/icons/kakao_login.png')}
            style={styles.loginIcon}
          />
          <Text
            style={[
              styles.loginText,
              {fontSize: scaleFontSize(18), color: '#606060'}, // Slightly smaller text
            ]}>
            카카오톡으로 로그인
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.loginButton, {backgroundColor: '#F5F5F5'}]}
          onPress={() => console.log('Naver pressed')}>
          <Image
            source={require('../../static/icons/naver_login.png')}
            style={styles.loginIcon}
          />
          <Text
            style={[
              styles.loginText,
              {fontSize: scaleFontSize(18), color: '#606060'}, // Slightly smaller text
            ]}>
            네이버로 로그인
          </Text>
        </TouchableOpacity>
      </View>

      {/* Separator Line */}
      <View style={styles.separatorLine} />

      {/* Other Login Methods */}
      <View style={styles.otherLoginContainer}>
        <Text style={[styles.otherLoginText, {fontSize: scaleFontSize(15)}]}>
          다른 방법으로 로그인
        </Text>
        <View style={styles.iconContainer}>
          <TouchableOpacity style={styles.iconButton}>
            <Image
              source={require('../../static/icons/apple_login.png')}
              style={styles.iconLarge}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Image
              source={require('../../static/icons/google_login.png')}
              style={styles.iconLarge}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Image
              source={require('../../static/icons/email_login.png')}
              style={styles.iconLarge}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Forgot Password Section */}
      <View
        style={[styles.forgotPasswordContainer, {marginBottom: height * 0.05}]}>
        <TouchableOpacity onPress={() => console.log('Forgot account pressed')}>
          <Text
            style={[styles.forgotPasswordText, {fontSize: scaleFontSize(15)}]}>
            가입한 계정을 잊으셨다면?
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5', // Overall background color
    justifyContent: 'space-between',
  },
  logoContainer: {
    alignItems: 'flex-start',
    marginTop: 40,
    paddingLeft: 20,
  },
  logoSymbol: {
    // Dynamic sizing based on screen width
  },
  blueContainer: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    alignSelf: 'center',
    backgroundColor: '#003DA5',
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  slogan: {
    fontFamily: 'MICEGothicOTFBold',
    color: '#FFFFFF',
  },
  loginButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', // Center text within the button
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginBottom: 10,
  },
  loginIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  loginText: {
    fontFamily: 'MICEGothicOTFBold',
    flex: 1,
  },
  separatorLine: {
    borderBottomColor: '#E0E0E0',
    borderBottomWidth: 1,
    marginVertical: 20,
    marginHorizontal: 30,
  },
  otherLoginContainer: {
    alignItems: 'center',
  },
  otherLoginText: {
    fontFamily: 'MICEGothicOTFBold',
    color: '#666666',
    marginBottom: 10,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '50%', // More clustered
  },
  iconButton: {
    padding: 10,
    backgroundColor: '#F5F5F5',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconLarge: {
    width: 40, // Larger icons
    height: 40,
  },
  forgotPasswordContainer: {
    alignItems: 'center',
  },
  forgotPasswordText: {
    fontFamily: 'MICEGothicOTF',
    color: '#999999',
    textDecorationLine: 'underline',
  },
});

export default LoginScreen;
