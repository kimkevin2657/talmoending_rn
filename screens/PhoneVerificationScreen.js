import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Animated,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PhoneVerificationScreen = () => {
  const navigation = useNavigation();
  const [countryCode, setCountryCode] = useState('+82');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [timer, setTimer] = useState(300); // 5 minutes timer
  const [showVerificationInput, setShowVerificationInput] = useState(false);
  const [canRequestCode, setCanRequestCode] = useState(true);
  const [isVerified, setIsVerified] = useState(false);
  const opacityAnim = useRef(new Animated.Value(0.5)).current;

  useEffect(() => {
    let interval;
    if (showVerificationInput && timer > 0) {
      interval = setInterval(() => {
        setTimer(prevTimer => {
          if (prevTimer === 1) {
            resetVerification();
          }
          return prevTimer - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [showVerificationInput, timer]);

  useEffect(() => {
    Animated.timing(opacityAnim, {
      toValue: isVerified ? 1 : 0.5,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isVerified]);

  const requestVerificationCode = () => {
    if (canRequestCode) {
      setShowVerificationInput(true);
      setCanRequestCode(false);
      setTimer(300); // Reset timer
    }
  };

  const verifyCode = () => {
    if (verificationCode.length === 6) {
      // Assuming 6 is the length of a valid code
      setIsVerified(true);
    }
  };

  const resetVerification = () => {
    setShowVerificationInput(false);
    setCanRequestCode(true);
    setVerificationCode('');
    setIsVerified(false);
    setTimer(300);
  };

  const saveAndNext = async () => {
    if (isVerified) {
      await AsyncStorage.setItem('@phone_countrycode', countryCode);
      await AsyncStorage.setItem('@phone_number', phoneNumber);
      navigation.navigate('RegistrationBasic');
    }
    return;
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.navigate('RegistrationAgreementScreen')}
            style={styles.backArrowContainer}>
            <Text style={styles.backArrow}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerText}>SMS 인증</Text>
        </View>

        <Text style={styles.boldText}>SMS 인증을 진행해주세요.</Text>

        <View style={styles.inputRow}>
          <Picker
            selectedValue={countryCode}
            style={styles.pickerStyle}
            onValueChange={itemValue => setCountryCode(itemValue)}>
            <Picker.Item label="+82 Korea" value="+82" />
            <Picker.Item label="+1 USA" value="+1" />
          </Picker>
          <TextInput
            style={styles.phoneNumberInput}
            placeholder="전화번호 입력"
            keyboardType="phone-pad"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
          />
          <TouchableOpacity
            onPress={requestVerificationCode}
            style={[
              styles.smallButton,
              !canRequestCode ? styles.disabledButton : null,
            ]}
            disabled={!canRequestCode}>
            <Text style={styles.buttonTextMultiLine}>인증번호{'\n'}받기</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.horizontalLine} />

        {!showVerificationInput && (
          <Text style={styles.explanationText}>
            5분 이내로 인증번호를 입력 후 아래 "확인" 버튼을 눌러주세요.
          </Text>
        )}

        {showVerificationInput && (
          <View style={styles.verificationContainer}>
            <TextInput
              style={styles.input}
              placeholder="인증번호 입력"
              keyboardType="number-pad"
              value={verificationCode}
              onChangeText={setVerificationCode}
            />
            <Text style={styles.timerText}>{`${Math.floor(timer / 60)}:${
              timer % 60 < 10 ? '0' : ''
            }${timer % 60}`}</Text>
            <TouchableOpacity
              onPress={verifyCode}
              style={[
                styles.smallButton,
                verificationCode.length === 0 ? styles.disabledButton : null,
              ]}
              disabled={verificationCode.length === 0}>
              <Text style={styles.buttonText}>인증하기</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      <Animated.View style={[styles.nextButton, {opacity: opacityAnim}]}>
        <TouchableOpacity
          disabled={!isVerified}
          onPress={() => saveAndNext()}
          style={styles.nextButtonTouchable}>
          <Text style={styles.nextButtonText}>다음</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFF',
  },
  scrollView: {
    flexGrow: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  backArrowContainer: {
    position: 'absolute',
    left: 20,
  },
  backArrow: {
    fontSize: 28,
    color: '#3C5A99',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#3C5A99',
  },
  boldText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3C5A99',
    padding: 20,
    textAlign: 'left',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
  },
  phoneNumberInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#4267B2',
    borderRadius: 8,
    padding: 10,
    marginHorizontal: 10,
  },
  smallButton: {
    backgroundColor: '#4267B2',
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 8,
    minWidth: 80,
  },
  buttonTextMultiLine: {
    color: '#FFFFFF',
    fontSize: 14,
    textAlign: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  explanationText: {
    fontSize: 14,
    color: '#3C5A99',
    textAlign: 'center',
    marginVertical: 20,
  },
  verificationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 20,
  },
  timerText: {
    fontSize: 16,
    color: '#3C5A99',
  },
  nextButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: '#4267B2',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nextButtonTouchable: {
    width: '100%',
  },
  pickerStyle: {
    height: 50,
    width: 120,
    borderWidth: 1,
    borderColor: '#4267B2',
    borderRadius: 8,
  },
  disabledButton: {
    backgroundColor: '#E0E0E0', // Light grey to indicate deactivation
  },
  horizontalLine: {
    borderBottomColor: '#4267B2',
    borderBottomWidth: 1,
    marginVertical: 10,
    marginHorizontal: 20,
  },
});

export default PhoneVerificationScreen;
