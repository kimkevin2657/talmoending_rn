import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  Platform,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Picker} from '@react-native-picker/picker';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';

const RegistrationScreen = () => {
  const navigation = useNavigation();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    passwordConfirm: '',
    email: '',
    birthdate: new Date(),
    gender: '',
    height: '',
    weight: '',
    body_type: '',
  });
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleRegister = async () => {
    // Check if any form field is empty
    const emptyFields = Object.entries(formData).filter(
      ([key, value]) => value === '',
    );

    if (emptyFields.length > 0) {
      // Create a message listing all empty fields that need to be filled
      const fieldsNames = emptyFields.map(([key]) => key).join(', ');
      Alert.alert(
        '양식을 완성하세요',
        `다음 필드를 채워주세요: ${fieldsNames}`,
      );
      return;
    }

    // Prepare data with proper date format
    const submitData = {
      ...formData,
      birthdate: formData.birthdate.toISOString().split('T')[0], // Format the date as YYYY-MM-DD
    };

    // Check if the passwords match
    if (formData.password !== formData.passwordConfirm) {
      Alert.alert('비밀번호 확인', '입력하신 비밀번호가 일치하지 않습니다.');
      return;
    }

    try {
      console.log('!!!===========  formData   ', formData);
      const response = await axios.post(
        'http://43.202.219.28:8000/common/api/register',
        submitData, // Ensure formData is serialized as a JSON string
        {
          headers: {
            'Content-Type': 'application/json', // Set the Content-Type header for JSON data
          },
        },
      );
      console.log('!!!===========  response   ', response);
      if (response.status === 200 || response.status === 201) {
        console.log('!!!===========  response.data    ', response.data);
        await AsyncStorage.setItem('@jwt_token', response.data.jwt_token);
        navigation.navigate('SetPinScreen');
      }
    } catch (error) {
      console.log(
        'Error:',
        error.response ? error.response.data : error.message,
      );
      Alert.alert(
        '등록 실패',
        error.response?.data?.error || '문제가 발생했습니다.',
      );
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <View style={styles.container}>
        <Text style={styles.header}>회원가입</Text>
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="사용자 이름"
            value={formData.username}
            onChangeText={text => setFormData({...formData, username: text})}
          />
          <TextInput
            style={styles.input}
            secureTextEntry
            placeholder="비밀번호"
            value={formData.password}
            onChangeText={text => setFormData({...formData, password: text})}
          />
          <TextInput
            style={styles.input}
            secureTextEntry
            placeholder="비밀번호 확인"
            value={formData.passwordConfirm}
            onChangeText={text =>
              setFormData({...formData, passwordConfirm: text})
            }
          />
          <TextInput
            style={styles.input}
            placeholder="이메일"
            keyboardType="email-address"
            value={formData.email}
            onChangeText={text => setFormData({...formData, email: text})}
          />
          <TouchableOpacity
            style={styles.input}
            onPress={() => setShowDatePicker(true)}>
            <Text style={styles.dateText}>
              {formData.birthdate.toDateString()}
            </Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={formData.birthdate}
              mode="date"
              display="default"
              onChange={(event, selectedDate) => {
                setShowDatePicker(Platform.OS === 'ios');
                setFormData({
                  ...formData,
                  birthdate: selectedDate || formData.dob,
                });
              }}
            />
          )}
          <Picker
            selectedValue={formData.gender}
            style={styles.picker}
            onValueChange={itemValue =>
              setFormData({...formData, gender: itemValue})
            }>
            <Picker.Item label="성별 선택" value="" />
            <Picker.Item label="남성" value="male" />
            <Picker.Item label="여성" value="female" />
          </Picker>
          <TextInput
            style={styles.input}
            placeholder="신장 (cm)"
            keyboardType="numeric"
            value={formData.height}
            onChangeText={text => setFormData({...formData, height: text})}
          />
          <TextInput
            style={styles.input}
            placeholder="체중 (kg)"
            keyboardType="numeric"
            value={formData.weight}
            onChangeText={text => setFormData({...formData, weight: text})}
          />
          <Picker
            selectedValue={formData.body_type}
            style={styles.picker}
            onValueChange={itemValue =>
              setFormData({...formData, body_type: itemValue})
            }>
            <Picker.Item label="체형 선택" value="" />
            <Picker.Item label="근육형" value="muscular" />
            <Picker.Item label="일반형" value="normal" />
            <Picker.Item label="복부 비만형" value="abdominal_obesity" />
            <Picker.Item label="과체중형" value="overweight" />
            <Picker.Item label="비만형" value="obese" />
          </Picker>
        </View>
        <TouchableOpacity
          style={styles.registerButton}
          onPress={handleRegister}>
          <Text style={styles.buttonText}>생성하기</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.loginRedirectButton}
          onPress={() => navigation.navigate('LoginScreen')}>
          <Text style={styles.loginRedirectText}>로그인하러 가기</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#F9FAFB', // Light background color
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 30,
  },
  form: {
    width: '100%',
    maxWidth: 400, // Max width for the form
  },
  input: {
    width: '100%',
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginBottom: 15,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    fontSize: 16,
    color: '#1F2937', // Darker text color for better contrast
  },
  dateText: {
    fontSize: 16,
    color: '#6B7280', // Medium contrast text color
  },
  picker: {
    width: '100%',
    marginBottom: 15,
  },
  registerButton: {
    backgroundColor: '#10B981', // Green button for positive action
    padding: 15,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
  },
  loginRedirectButton: {
    marginTop: 20,
  },
  loginRedirectText: {
    color: '#3B82F6', // Blue color for the redirect text
    fontSize: 16,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default RegistrationScreen;
