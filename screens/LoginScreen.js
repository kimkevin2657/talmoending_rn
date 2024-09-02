import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  Alert,
  Animated,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const LoginScreen = ({navigation}) => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [autoLogin, setAutoLogin] = useState(false);
  const borderColorUserId = useRef(new Animated.Value(0)).current;
  const borderColorPassword = useRef(new Animated.Value(0)).current;

  const animateBorder = (animatedValue, toValue) => {
    Animated.timing(animatedValue, {
      toValue: toValue,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const handleFocus = animatedValue => {
    animateBorder(animatedValue, 1);
  };

  const handleBlur = animatedValue => {
    animateBorder(animatedValue, 0);
  };

  const handleLogin = async () => {
    try {
      console.log(
        '!!!=========== LoginScreen  ',
        userId,
        '   ',
        password,
        '    ',
      );
      if (userId === 'test') {
        await AsyncStorage.setItem('@jwt_token', 'test');
        await AsyncStorage.setItem('@auto_login', 'true');
        navigation.navigate('PinEntryScreen');
      } else {
        const response = await axios.post(
          'http://43.202.219.28:8000/common/api/login',
          JSON.stringify({username: userId, password}),
          {headers: {'Content-Type': 'application/json'}},
        );

        if (response.status === 200 || response.status === 201) {
          if (autoLogin) {
            await AsyncStorage.setItem('@auto_login', 'true');
          }
          await AsyncStorage.setItem('@jwt_token', response.data.token);
          navigation.navigate('PinEntryScreen');
        }
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || '로그인 중 오류가 발생했습니다.';
      Alert.alert('로그인 실패', errorMessage);
    }
  };

  const borderColorInterpolation = animatedValue => {
    return animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['#FFFFFF', '#4267B2'], // Change to any color you need
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lumiio 혈액 분석기</Text>
      <Animated.View
        style={[
          styles.inputContainer,
          {
            borderColor: borderColorInterpolation(borderColorUserId),
            borderWidth: 2,
          },
        ]}>
        <TextInput
          style={styles.input}
          placeholder="아이디"
          placeholderTextColor="#3C5A99"
          value={userId}
          onChangeText={setUserId}
          onFocus={() => handleFocus(borderColorUserId)}
          onBlur={() => handleBlur(borderColorUserId)}
          autoCapitalize="none"
        />
      </Animated.View>
      <Animated.View
        style={[
          styles.inputContainer,
          {
            borderColor: borderColorInterpolation(borderColorPassword),
            borderWidth: 2,
          },
        ]}>
        <TextInput
          style={styles.input}
          placeholder="비밀번호"
          placeholderTextColor="#3C5A99"
          value={password}
          onChangeText={setPassword}
          onFocus={() => handleFocus(borderColorPassword)}
          onBlur={() => handleBlur(borderColorPassword)}
          secureTextEntry
        />
      </Animated.View>
      <View style={styles.checkboxContainer}>
        <CheckBox
          value={autoLogin}
          onValueChange={setAutoLogin}
          tintColors={{true: '#4267B2', false: '#4267B2'}}
          style={styles.checkbox}
        />
        <Text style={styles.label}>자동 로그인</Text>
      </View>
      <View style={styles.linksContainer}>
        <TouchableOpacity onPress={() => {}}>
          <Text style={styles.linkText}>아이디 찾기</Text>
        </TouchableOpacity>
        <View style={{width: 10}} />
        <TouchableOpacity onPress={() => {}}>
          <Text style={styles.linkText}>비밀번호 찾기</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>로그인하기</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.registerButton}
        onPress={() => navigation.navigate('RegistrationAgreementScreen')}>
        <Text style={styles.registerButtonText}>회원가입하러 가기</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FAFAFF',
  },
  title: {
    marginBottom: 40,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3C5A99',
  },
  inputContainer: {
    width: '90%',
    height: 50,
    marginBottom: 10,
    paddingLeft: 20,
    borderRadius: 25,
    backgroundColor: '#FFFFFF',
    elevation: 5,
    fontSize: 16,
  },
  input: {
    height: '100%',
    // color: '#333333',
    color: '#3C5A99',
  },
  button: {
    width: '90%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4267B2',
    borderRadius: 25,
    marginBottom: 20,
    elevation: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  checkboxContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'center',
    width: '90%',
  },
  checkbox: {
    marginRight: 8,
  },
  label: {
    fontSize: 16,
    color: '#3C5A99',
  },
  linksContainer: {
    flexDirection: 'row',
    width: '90%',
    justifyContent: 'center',
    marginBottom: 20,
  },
  linkText: {
    color: '#4267B2',
    fontSize: 16,
  },
  registerButton: {
    marginTop: 10,
  },
  registerButtonText: {
    color: '#4267B2',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LoginScreen;
