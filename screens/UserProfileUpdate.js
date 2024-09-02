import React, {useState} from 'react';
import {Picker} from '@react-native-picker/picker';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
import Icon from 'react-native-vector-icons/FontAwesome5';

const UserProfileUpdate = () => {
  const navigation = useNavigation();
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bodyType, setBodyType] = useState('근육형');

  const handleSaveChanges = async () => {
    try {
      await AsyncStorage.setItem('@height', height);
      await AsyncStorage.setItem('@weight', weight);
      Alert.alert(
        '프로필 업데이트 성공',
        '이용자님의 프로필이 성공적으로 업데이트 되었습니다.',
      );
      navigation.goBack();
    } catch (error) {
      console.error('Failed to save the data', error);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backArrowContainer}>
            <Icon name="arrow-left" size={24} color="#3C5A99" />
          </TouchableOpacity>
          <Text style={styles.headerText}>유저 정보 변경하기</Text>
        </View>
        <TextInput
          style={styles.input}
          value={height}
          onChangeText={setHeight}
          placeholder="신장 (cm)"
          placeholderTextColor="#3C5A99"
        />
        <TextInput
          style={styles.input}
          value={weight}
          onChangeText={setWeight}
          placeholder="체중 (kg)"
          placeholderTextColor="#3C5A99"
        />
        <Text style={styles.label}>체형 선택:</Text>
        <Picker
          selectedValue={bodyType}
          style={styles.picker}
          onValueChange={itemValue => setBodyType(itemValue)}>
          <Picker.Item label="근육형" value="muscular" />
          <Picker.Item label="일반형" value="normal" />
          <Picker.Item label="복부 비만형" value="bellyFat" />
          <Picker.Item label="과체중형" value="overweight" />
          <Picker.Item label="비만형" value="obese" />
        </Picker>
        <TouchableOpacity style={styles.button} onPress={handleSaveChanges}>
          <Text style={styles.buttonText}>저장하기</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
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
    backgroundColor: '#FAFAFF',
  },
  backArrowContainer: {
    position: 'absolute',
    left: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#3C5A99',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
    color: '#3C5A99',
  },
  button: {
    backgroundColor: '#4267B2',
    padding: 15,
    alignItems: 'center',
    borderRadius: 12,
    marginTop: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 20,
    backgroundColor: '#FFFFFF',
    color: '#3C5A99',
  },
  label: {
    fontSize: 16,
    color: '#3C5A99',
    marginVertical: 5,
  },
});

export default UserProfileUpdate;
