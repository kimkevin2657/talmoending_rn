import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // Use Ionicons for additional icons
import LinearGradient from 'react-native-linear-gradient';

const LoginScreen = ({navigation}) => {
  const {width, height} = useWindowDimensions();

  useEffect(() => {
    console.log('LoginScreen mounted');
  }, []);

  return (
    <LinearGradient colors={['#1e3c72', '#2a5298']} style={styles.container}>
      {/* Top Section */}
      <View style={[styles.topSection, {height: height * 0.4}]}>
        <Text style={styles.appTitle}>탈모엔딩</Text>
        <Text style={styles.slogan}>당신의 탈모 고민이 끝날때까지</Text>
      </View>

      {/* Main Login Buttons */}
      <View style={styles.loginButtonContainer}>
        <TouchableOpacity
          style={[styles.loginButton, styles.kakaoButton]}
          onPress={() => navigation.navigate('MainTabs')}>
          <Text style={styles.loginText}>카카오로 로그인</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.loginButton, styles.naverButton]}
          onPress={() => console.log('naver pressed')}>
          <Text style={styles.loginText}>네이버로 로그인</Text>
        </TouchableOpacity>
      </View>

      {/* Other Login Options */}
      <View style={styles.bottomSection}>
        <Text style={styles.otherLoginText}>다른 방법으로 시작하기</Text>
        <View style={styles.iconContainer}>
          <TouchableOpacity style={styles.iconButton}>
            <Icon name="logo-apple" size={40} color="#ffffff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Icon name="mail-outline" size={40} color="#ffffff" />
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
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topSection: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  appTitle: {
    color: '#ffffff',
    fontSize: 40,
    fontFamily: 'SCDream9',
    marginBottom: 10,
  },
  slogan: {
    color: '#ffffff',
    fontSize: 18,
    fontFamily: 'SCDream7',
    textAlign: 'center',
    marginTop: 5,
  },
  loginButtonContainer: {
    marginTop: 20,
  },
  loginButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
    alignSelf: 'center',
    paddingVertical: 15,
    borderRadius: 30,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  kakaoButton: {
    backgroundColor: '#FFCD00',
  },
  naverButton: {
    backgroundColor: '#03C75A',
  },
  loginText: {
    fontSize: 18,
    color: '#ffffff',
    fontFamily: 'SCDream7',
  },
  bottomSection: {
    justifyContent: 'center',
    backgroundColor: 'transparent',
    paddingVertical: 30,
  },
  otherLoginText: {
    fontSize: 16,
    color: '#ffffff',
    fontFamily: 'SCDream6',
    textAlign: 'center',
    marginBottom: 20,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 30,
  },
  iconButton: {
    backgroundColor: '#4b6cb7',
    padding: 15,
    marginHorizontal: 20,
    borderRadius: 50,
  },
  helpLinks: {
    alignItems: 'center',
  },
  helpText: {
    fontSize: 14,
    color: '#ffffff',
    fontFamily: 'SCDream5',
    textDecorationLine: 'underline',
    marginBottom: 10,
  },
});

export default LoginScreen;
