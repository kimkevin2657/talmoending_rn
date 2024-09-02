import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const PhoneVerificationScreen = () => {
  const navigation = useNavigation();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [codeSent, setCodeSent] = useState(false);

  const sendVerificationCode = () => {
    console.log(`Sending verification code to ${phoneNumber}`);
    setCodeSent(true);
  };

  const verifyCodeAndProceed = () => {
    console.log(`Verifying code ${verificationCode} for ${phoneNumber}`);
    navigation.navigate('SetPinScreen');
    // Proceed to the next step/screen
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>SMS 인증을 진행해주세요.</Text>

      <TextInput
        style={styles.input}
        placeholder="휴대폰 번호"
        placeholderTextColor="#999"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        keyboardType="phone-pad"
        textContentType="telephoneNumber"
      />

      {codeSent && (
        <TextInput
          style={styles.input}
          placeholder="인증번호"
          placeholderTextColor="#999"
          value={verificationCode}
          onChangeText={setVerificationCode}
          keyboardType="number-pad"
        />
      )}

      <TouchableOpacity
        style={styles.button}
        onPress={codeSent ? verifyCodeAndProceed : sendVerificationCode}>
        <Text style={styles.buttonText}>
          {codeSent ? '다음' : '인증번호 발송'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: '500',
    color: '#333',
    marginBottom: 30,
  },
  input: {
    width: '100%',
    borderColor: '#DDD',
    borderWidth: 1,
    backgroundColor: '#FFF',
    marginBottom: 15,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    fontSize: 16,
    color: '#333',
  },
  button: {
    width: '100%',
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    fontSize: 18,
    color: '#FFF',
    fontWeight: '500',
  },
});

export default PhoneVerificationScreen;
