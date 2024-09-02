import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  useWindowDimensions,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // Use Ionicons for additional icons

const LoginScreen = ({navigation}) => {
  const {width, height} = useWindowDimensions();

  useEffect(() => {
    console.log('LoginScreen mounted');
  }, []);

  return (
    <View style={styles.container}>
      {/* Top Section */}
      <View style={[styles.topSection, {height: height * 0.33}]}>
        <Image
          source={require('../../static/imgs/logo_vertical.png')}
          style={[styles.logo, {width: width * 0.4}]} // Increased the size
          resizeMode="contain"
        />
        <Text style={styles.slogan}>당신의 탈모 고민이 끝날때까지</Text>
      </View>

      {/* Main Login Buttons */}
      <View style={[styles.loginButtonContainer]}>
        <TouchableOpacity
          style={[styles.loginButton, styles.kakaoButton]}
          onPress={() => navigation.navigate('MainTabs')}>
          <Image
            source={require('../../static/icons/kakao_login.png')}
            style={styles.loginIcon}
            resizeMode="contain"
          />
          <Text style={styles.loginText}>카카오로 로그인</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.loginButton, styles.naverButton]}
          onPress={() => {
            console.log('naver pressed');
          }}>
          <Image
            source={require('../../static/icons/naver_login.png')}
            style={styles.loginIcon}
            resizeMode="contain"
          />
          <Text style={styles.loginText}>네이버로 로그인</Text>
        </TouchableOpacity>
      </View>

      {/* Other Login Options */}
      <View style={[styles.bottomSection, {height: height * 0.25}]}>
        <Text style={styles.otherLoginText}>다른 방법으로 시작하기</Text>
        <View style={styles.iconContainer}>
          <TouchableOpacity style={styles.iconButton}>
            <Text>
              <Icon name="logo-apple" size={40} color="#b3b3b3" />{' '}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Text>
              <Icon name="mail-outline" size={40} color="#b3b3b3" />{' '}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.helpLinks}>
          <TouchableOpacity onPress={() => navigation.navigate('FindAccount')}>
            <Text style={styles.helpText}>계정 및 로그인 방법 찾기</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('FindEmail')}>
            <Text style={styles.helpText}>이메일로 찾기</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('FindPhone')}>
            <Text style={styles.helpText}>전화번호로 찾기</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff', // Set the entire screen's background color to white
  },
  topSection: {
    backgroundColor: '#F0F0F0', // Slightly more off-white color
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    paddingBottom: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  logo: {
    marginBottom: 15,
  },
  slogan: {
    color: '#003DA5', // Change text color to blue to match the new background
    fontSize: 20,
    fontFamily: 'SCDream9',
    textAlign: 'center',
  },
  loginButtonContainer: {
    marginTop: -30, // Overlap with top section
  },
  loginButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    alignSelf: 'center',
    paddingVertical: 15,
    borderRadius: 30,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  kakaoButton: {
    backgroundColor: '#FFCD00', // Correct Kakao color
  },
  naverButton: {
    backgroundColor: '#2DB400', // Correct Naver color
  },
  loginIcon: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  loginText: {
    fontSize: 18,
    color: '#F5F5F5', // Off-white color for the text
    fontFamily: 'SCDream7',
    fontWeight: 'bold', // Make the text bolder
  },
  bottomSection: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#003DA5', // Bottom section with blue color
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    paddingVertical: 20,
  },
  otherLoginText: {
    fontSize: 16,
    color: '#ffffff', // White text to contrast with the blue background
    fontFamily: 'SCDream6',
    textAlign: 'center',
    marginBottom: 15,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 30,
  },
  iconButton: {
    backgroundColor: '#F5F5F5', // Off-white buttons for icons
    padding: 15,
    marginHorizontal: 20,
    borderRadius: 50,
  },
  helpLinks: {
    alignItems: 'center',
  },
  helpText: {
    fontSize: 14,
    color: '#ffffff', // White text to contrast with the blue background
    fontFamily: 'SCDream5',
    textDecorationLine: 'underline',
    marginBottom: 10,
  },
});

export default LoginScreen;
