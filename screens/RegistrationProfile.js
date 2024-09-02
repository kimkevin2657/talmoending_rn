import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome5';

const RegistrationProfile = ({navigation}) => {
  const [birthDate, setBirthDate] = useState(new Date());
  const [gender, setGender] = useState('남성');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bodyType, setBodyType] = useState('근육형');
  const [name, setName] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || birthDate;
    setShowDatePicker(Platform.OS === 'ios');
    setBirthDate(currentDate);
  };

  const saveAndNext = async () => {
    await AsyncStorage.setItem(
      '@birthdate',
      birthDate.toISOString().split('T')[0],
    );
    await AsyncStorage.setItem('@name', name);
    await AsyncStorage.setItem('@gender', gender);
    await AsyncStorage.setItem('@height', height);
    await AsyncStorage.setItem('@weight', weight);
    await AsyncStorage.setItem('@body_type', bodyType);
    // handleRegister();
    navigation.navigate('SetPinScreen');
  };

  const validateAndSave = async () => {
    let errorMessage = '';

    // Validate each field and add to the error message if any field is invalid
    if (!name) {
      errorMessage += '이름을 입력해 주세요.\n';
    }
    if (!birthDate) {
      errorMessage += '생일을 선택해 주세요.\n';
    }
    if (!height) {
      errorMessage += '신장을 입력해 주세요.\n';
    }
    if (!weight) {
      errorMessage += '체중을 입력해 주세요.\n';
    }

    // Check if there were any errors
    if (errorMessage) {
      Alert.alert('입력 오류', errorMessage);
    } else {
      // If no errors, save the data and navigate
      await AsyncStorage.setItem(
        '@birthdate',
        birthDate.toISOString().split('T')[0],
      );
      await AsyncStorage.setItem('@name', name);
      await AsyncStorage.setItem('@gender', gender);
      await AsyncStorage.setItem('@height', height);
      await AsyncStorage.setItem('@weight', weight);
      await AsyncStorage.setItem('@body_type', bodyType);
      navigation.navigate('SetPinScreen');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.navigate('RegistrationBasic')}
            style={styles.backArrowContainer}>
            <Icon name="arrow-left" size={24} color="#3C5A99" />
          </TouchableOpacity>
          <Text style={styles.headerText}>프로필 입력</Text>
        </View>

        <TextInput
          style={styles.input}
          placeholder="성함"
          placeholderTextColor="#3C5A99"
          value={name}
          keyboardType="email-address"
          onChangeText={setName}
        />
        <View style={styles.horizontalLine} />

        <TouchableOpacity
          onPress={() => setShowDatePicker(true)}
          style={styles.input}>
          <Text style={styles.inputText}>{birthDate.toLocaleDateString()}</Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={birthDate}
            mode="date"
            display="default"
            onChange={onChangeDate}
          />
        )}
        <View style={styles.horizontalLine} />

        <Picker
          selectedValue={gender}
          style={styles.picker}
          onValueChange={(itemValue, itemIndex) => setGender(itemValue)}>
          <Picker.Item label="남자" value="남성" />
          <Picker.Item label="여자" value="여성" />
        </Picker>
        <View style={styles.horizontalLine} />

        <TextInput
          style={styles.input}
          placeholder="신장 (cm)"
          placeholderTextColor="#3C5A99"
          value={height}
          keyboardType="numeric"
          onChangeText={setHeight}
        />
        <View style={styles.horizontalLine} />

        <TextInput
          style={styles.input}
          placeholder="체중 (kg)"
          placeholderTextColor="#3C5A99"
          value={weight}
          keyboardType="numeric"
          onChangeText={setWeight}
        />
        <View style={styles.horizontalLine} />

        <Text style={styles.label}>체형선택:</Text>
        <Picker
          selectedValue={bodyType}
          style={styles.picker}
          onValueChange={(itemValue, itemIndex) => setBodyType(itemValue)}>
          <Picker.Item label="근육형" value="muscular" />
          <Picker.Item label="일반형" value="normal" />
          <Picker.Item label="복부 비만형" value="bellyFat" />
          <Picker.Item label="과체중형" value="overweight" />
          <Picker.Item label="비만형" value="obese" />
        </Picker>
      </ScrollView>

      <TouchableOpacity
        style={[styles.button, styles.nextButton]}
        onPress={() => validateAndSave()}>
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
    justifyContent: 'center',
    color: '#3C5A99',
  },
  inputText: {
    color: '#3C5A99',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#4267B2',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
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
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 20,
    color: '#3C5A99',
  },
  horizontalLine: {
    borderBottomColor: '#4267B2',
    borderBottomWidth: 1,
    marginVertical: 10,
  },
  label: {
    fontSize: 16,
    color: '#3C5A99',
    marginBottom: 5,
  },
});

export default RegistrationProfile;
