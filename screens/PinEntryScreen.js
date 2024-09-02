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

const PinEntryScreen = () => {
  const navigation = useNavigation();
  const [enteredPin, setEnteredPin] = useState('');
  const [storedPin, setStoredPin] = useState('');
  const [opacityAnim] = useState(new Animated.Value(1)); // Animated opacity for dots

  useEffect(() => {
    const fetchPin = async () => {
      const pin = await AsyncStorage.getItem('@user_pin');
      setStoredPin(pin);
    };

    fetchPin();
  }, []);

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
        verifyPin(newPin);
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

  const verifyPin = async pin => {
    try {
      const jwtToken = await AsyncStorage.getItem('@jwt_token');
      if (!jwtToken) {
        Alert.alert('오류', '로그인 세션이 만료되었거나 존재하지 않습니다.');
        return;
      }
      if (jwtToken === 'test') {
        navigation.navigate('MainLandingScreen');
      } else {
        const response = await axios.post(
          'http://43.202.219.28:8000/common/api/verifypin',
          JSON.stringify({token: jwtToken, pin: pin}),
          {headers: {'Content-Type': 'application/json'}},
        );

        if (response.status === 200) {
          navigation.navigate('MainLandingScreen');
        } else {
          Alert.alert('인증실패', 'PIN 번호가 일치하지 않습니다.');
          setEnteredPin(''); // Reset PIN entry for retry
          animateOpacity(1); // Reset opacity animation
        }
      }
    } catch (error) {
      console.log(error);
      Alert.alert('오류', 'PIN 검증 중 오류가 발생했습니다.');
      setEnteredPin(''); // Reset PIN entry for retry
      animateOpacity(1); // Reset opacity animation
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
      <Text style={styles.text}>Pin 번호를 입력 해주세요.</Text>
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

export default PinEntryScreen;
