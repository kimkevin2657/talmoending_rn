import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome5';

const RegistrationBasic = ({navigation}) => {
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [emailCode, setEmailCode] = useState('');
  const [showEmailVerificationInput, setShowEmailVerificationInput] =
    useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleEmailVerification = () => {
    // Logic to request email verification code
    setShowEmailVerificationInput(true);
    // Mock verification code sent
    console.log('Verification code sent to:', email);
  };

  const emailPattern2 = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validateForm = () => {
    console.log('!!!========== emailCode   ', emailCode);
    // if (true) {
    //   return true;
    // }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      Alert.alert('잘못된 이메일 형식', '올바른 이메일을 입력해주세요.');
      return false;
    }
    if (password !== confirmPassword) {
      Alert.alert('비밀번호 불일치', '입력하신 비밀번호가 일치하지 않습니다.');
      return false;
    }
    if (password.length < 8) {
      Alert.alert('비밀번호 조건 미달', '비밀번호는 8자 이상이어야 합니다.');
      return false;
    }
    /*
    if (emailCode.length < 1) {
      Alert.alert(
        '이메일 인증 번호 누락',
        '이메일 인증을 진행하여 인증 번호를 입력 해주세요.',
      );
      return false;
    }*/
    return true;
  };

  const saveAndNext = async () => {
    await AsyncStorage.setItem('@nickname', nickname);
    await AsyncStorage.setItem('@email', email);
    await AsyncStorage.setItem('@password', password);
    navigation.navigate('RegistrationProfile');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.navigate('RegistrationAgreementScreen')}
            style={styles.backArrowContainer}>
            <Icon name="arrow-left" size={24} color="#3C5A99" />
          </TouchableOpacity>
          <Text style={styles.headerText}>기본 정보 입력</Text>
        </View>

        <TextInput
          style={styles.input}
          placeholder="로그인 아이디"
          placeholderTextColor="#3C5A99"
          value={nickname}
          onChangeText={setNickname}
        />
        <View style={styles.horizontalLine} />

        <View style={styles.row}>
          <TextInput
            style={[styles.input, {flex: 1}]}
            placeholder="이메일"
            placeholderTextColor="#3C5A99"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
        </View>
        {showEmailVerificationInput && (
          <TextInput
            style={styles.input}
            placeholder="이메일 인증 번호"
            placeholderTextColor="#3C5A99"
            value={emailCode}
            onChangeText={setEmailCode}
          />
        )}
        <View style={styles.horizontalLine} />

        <TextInput
          style={styles.input}
          placeholder="비밀번호"
          placeholderTextColor="#3C5A99"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <View style={styles.horizontalLine} />

        <TextInput
          style={styles.input}
          placeholder="비밀번호 확인"
          placeholderTextColor="#3C5A99"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />
        <View style={styles.horizontalLine} />
      </ScrollView>
      <TouchableOpacity
        style={[styles.button, styles.nextButton]}
        onPress={() => {
          if (validateForm()) {
            saveAndNext();
          }
        }}
        // disabled={
        //   password !== confirmPassword ||
        //   password === '' ||
        //   !showEmailVerificationInput
        // }
        disabled={false}>
        <Text style={styles.buttonText}>다음</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFF',
  },
  scrollView: {
    flexGrow: 1,
    padding: 20,
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
  input: {
    borderWidth: 1,
    borderColor: '#4267B2',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    marginBottom: 10,
    color: '#3C5A99',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: '#4267B2',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginLeft: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  nextButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  horizontalLine: {
    borderBottomColor: '#4267B2',
    borderBottomWidth: 1,
    marginVertical: 10,
  },
});

export default RegistrationBasic;
