import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Animated,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';

const SetPinScreen = () => {
  const navigation = useNavigation();
  const [enteredPin, setEnteredPin] = useState('');
  const [opacityAnim] = useState(new Animated.Value(1)); // Animated opacity for dots

  const handlePress = digit => {
    if (digit === '삭제') {
      setEnteredPin(enteredPin.slice(0, -1));
      animateOpacity(1); // Fade in on deletion
      return;
    }

    const newPin = enteredPin + digit;
    if (newPin.length <= 6) {
      setEnteredPin(newPin);

      if (newPin.length === 6) {
        savePin(newPin);
      }
    }
  };

  const animateOpacity = toValue => {
    Animated.timing(opacityAnim, {
      toValue: toValue,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const handleRegister = async () => {
    const birthDate = await AsyncStorage.getItem('@birthdate');
    const name = await AsyncStorage.getItem('@name');
    const gender = await AsyncStorage.getItem('@gender');
    const height = await AsyncStorage.getItem('@height');
    const weight = await AsyncStorage.getItem('@weight');
    const bodyType = await AsyncStorage.getItem('@body_type');

    console.log('!!!=================== handleRegister executed ');
    if (!gender || !height || !weight || !bodyType) {
      Alert.alert('양식을 완성하세요', '모든 필드를 채워주세요.');
      return;
    }
    console.log('!!!=================== handleRegister executed 2');
    const phone_number = await AsyncStorage.getItem('@phone_number');
    const phone_countrycode = await AsyncStorage.getItem('@phone_countrycode');
    const email = await AsyncStorage.getItem('@email');
    const password = await AsyncStorage.getItem('@password');
    const nickname = await AsyncStorage.getItem('@nickname');
    console.log('!!!=================== handleRegister executed 3');
    const formData = {
      username: nickname,
      password: password,
      passwordConfirm: password,
      email: email,
      // birthdate: birthDate.toISOString().split('T')[0],
      birthdate: birthDate,
      gender: gender,
      height: height,
      weight: weight,
      body_type: bodyType,
      phone_number: phone_number,
      phone_countrycode: phone_countrycode,
      name: name,
    };

    console.log(
      '!!!================ RegistrationProfile formData   ',
      formData,
    );
    if (nickname === 'test') {
      await AsyncStorage.setItem('@jwt_token', 'test');
      return 'test';
    } else {
      try {
        const response = await axios.post(
          'http://43.202.219.28:8000/common/api/register',
          JSON.stringify(formData),
          {headers: {'Content-Type': 'application/json'}},
        );

        console.log('Registration successful: ', response.data);
        await AsyncStorage.setItem('@jwt_token', response.data.jwt_token);
        // navigation.navigate('SetPinScreen');
        return response.data.jwt_token;
      } catch (error) {
        console.error(
          'Registration failed: ',
          error.response ? error.response.data : error.message,
        );
        Alert.alert(
          '등록 실패',
          error.response?.data?.error || '문제가 발생했습니다.',
        );
      }
    }
  };

  const savePin = async pin => {
    const jwtToken = await handleRegister();

    console.log('!!!========== jwtToken    ', jwtToken);
    if (jwtToken && jwtToken === 'test') {
      Alert.alert('PIN 설정됨', 'PIN이 성공적으로 설정되었습니다.');
      navigation.navigate('MainLandingScreen');
    }

    if (jwtToken && jwtToken !== 'test') {
      try {
        const response = await axios.post(
          'http://43.202.219.28:8000/common/api/setpin',
          JSON.stringify({token: jwtToken, pin: pin}),
          {headers: {'Content-Type': 'application/json'}},
        );
        if (response.status === 200) {
          Alert.alert('PIN 설정됨', 'PIN이 성공적으로 설정되었습니다.');
          navigation.navigate('MainLandingScreen');
        } else {
          Alert.alert('오류', 'PIN 설정에 실패했습니다.');
          setEnteredPin(''); // Reset PIN entry for retry
          animateOpacity(1); // Reset opacity animation
        }
      } catch (error) {
        console.error(error);
        Alert.alert('오류', 'PIN 설정에 실패했습니다.');
        setEnteredPin(''); // Reset PIN entry for retry
        animateOpacity(1); // Reset opacity animation
      }
    } else {
      Alert.alert('오류', '인증 토큰이 없습니다. 다시 로그인 해주세요.');
    }
  };

  const renderDots = () => {
    return Array.from({length: 6}, (_, i) => (
      <Animated.View
        key={i}
        style={[
          styles.dot,
          {
            backgroundColor: i < enteredPin.length ? '#4267B2' : '#8B9DC3',
            opacity: opacityAnim,
          },
        ]}
      />
    ));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>새 PIN 번호를 입력 해주세요.</Text>
      <View style={styles.dotsContainer}>{renderDots()}</View>
      <View style={styles.keypad}>
        {['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', '삭제'].map(
          (digit, index) => (
            <TouchableOpacity
              key={index}
              style={styles.key}
              onPress={() => handlePress(digit)}
              onLongPress={() => animateOpacity(0.5)} // Dim on long press
            >
              <Text style={styles.keyText}>{digit}</Text>
            </TouchableOpacity>
          ),
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#FAFAFF',
  },
  text: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
    color: '#3C5A99',
  },
  dotsContainer: {
    flexDirection: 'row',
    marginBottom: 40,
  },
  dot: {
    width: 15,
    height: 15,
    borderRadius: 7.5,
    margin: 5,
  },
  keypad: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    maxWidth: 240,
  },
  key: {
    width: 70,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    borderRadius: 35,
    backgroundColor: '#4267B2',
    elevation: 5,
  },
  keyText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});

export default SetPinScreen;
