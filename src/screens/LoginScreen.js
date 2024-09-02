import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  useWindowDimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';

const LoginScreen = ({navigation}) => {
  const {width, height} = useWindowDimensions();

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
      <LinearGradient
        colors={['#003DA5', '#001E4F']} // Shifted towards darker blue
        style={[styles.blueContainer, {width: width * 0.9, paddingBottom: 50}]}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}>
        <Text style={styles.slogan}>
          당신의{'\n'}탈모고민{'\n'}끝날때까지
        </Text>
        <TouchableOpacity
          style={[styles.loginButton, styles.kakaoButton, {width: '100%'}]} // Set button width to 100% of the container
          onPress={() => navigation.navigate('MainTabs')}>
          <Image
            source={require('../../static/icons/kakao_login.png')}
            style={styles.loginIcon}
          />
          <Text style={[styles.loginText, {textAlign: 'center', flex: 1}]}>
            카카오톡으로 로그인
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.loginButton, styles.naverButton, {width: '100%'}]} // Set button width to 100% of the container
          onPress={() => console.log('Naver pressed')}>
          <Image
            source={require('../../static/icons/naver_login.png')}
            style={styles.loginIcon}
          />
          <Text style={[styles.loginText, {textAlign: 'center', flex: 1}]}>
            네이버로 로그인
          </Text>
        </TouchableOpacity>
      </LinearGradient>

      {/* Separator Line */}
      <View style={styles.separatorLine} />

      {/* Other Login Methods */}
      <View style={[styles.otherLoginContainer, {marginBottom: height * 0.05}]}>
        <Text style={styles.otherLoginText}>다른 방법으로 로그인</Text>
        <View style={styles.iconContainer}>
          <TouchableOpacity style={styles.iconButton}>
            <Icon name="logo-apple" size={35} color="#000000" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Icon name="logo-google" size={35} color="#000000" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Icon name="mail-outline" size={35} color="#000000" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Forgot Password Section */}
      <View
        style={[styles.forgotPasswordContainer, {marginBottom: height * 0.1}]}>
        <TouchableOpacity onPress={() => console.log('Forgot account pressed')}>
          <Text style={styles.forgotPasswordText}>
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
    backgroundColor: '#F5F5F5', // Off-white background color
    justifyContent: 'space-between',
  },
  logoContainer: {
    alignItems: 'flex-start',
    marginTop: 40,
    paddingLeft: 20,
  },
  logoSymbol: {
    // Width and height dynamically adjusted based on screen size
  },
  blueContainer: {
    paddingVertical: 30,
    paddingHorizontal: 20,
    borderTopLeftRadius: 40, // Rounded top corners
    borderTopRightRadius: 40, // Rounded top corners
    borderBottomLeftRadius: 0, // Flat bottom
    borderBottomRightRadius: 0, // Flat bottom
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 15},
    shadowOpacity: 0.8, // Increased shadow opacity
    shadowRadius: 15, // Increased shadow radius for a more noticeable effect
    elevation: 15,
  },
  slogan: {
    fontSize: 32, // Increased font size for the text
    fontFamily: 'SCDream9', // Use SCDream9 for bold text
    color: '#FFFFFF',
    textAlign: 'left', // Left-aligned text
    marginBottom: 20,
  },
  loginButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start', // Align text and icon to the left within the button
    paddingVertical: 15,
    paddingHorizontal: 20, // Reduced padding for better alignment
    borderRadius: 25,
    marginBottom: 15,
    width: '100%', // Increased width to fill more space within the container
  },
  kakaoButton: {
    backgroundColor: '#FEE500', // Ensuring background color for Kakao login button
  },
  naverButton: {
    backgroundColor: '#2DB400', // Ensuring background color for Naver login button
  },
  loginIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  loginText: {
    fontSize: 16,
    fontFamily: 'SCDream6', // Use SCDream6 for regular bold text
    color: '#000000', // Use black text for better contrast
    flex: 1, // Ensure text takes up remaining space
    textAlign: 'center', // Center the text within the remaining space
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
    fontSize: 14,
    fontFamily: 'SCDream5', // Use SCDream5 for smaller text
    color: '#666666', // A darker shade for better readability
    marginBottom: 10,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '60%',
  },
  iconButton: {
    padding: 10,
    backgroundColor: '#F0F0F0',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  forgotPasswordContainer: {
    alignItems: 'center',
  },
  forgotPasswordText: {
    fontSize: 12,
    fontFamily: 'SCDream4', // Use SCDream4 for smaller, lighter text
    color: '#999999',
    textDecorationLine: 'underline',
  },
});

export default LoginScreen;
