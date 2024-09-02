import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import {WebView} from 'react-native-webview';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const BSInputScreen = () => {
  const navigation = useNavigation();
  const [token, setToken] = useState('');
  const [targetSteps, setTargetSteps] = useState('');
  const [actualSteps, setActualSteps] = useState('');

  useEffect(() => {
    const getToken = async () => {
      const storedToken = await AsyncStorage.getItem('@jwt_token');
      if (storedToken) {
        setToken(storedToken);
      }
    };

    getToken();
  }, []);

  const saveSteps = async () => {
    try {
      const token = await AsyncStorage.getItem('@jwt_token');
      if (!token) {
        Alert.alert(
          '인증 오류',
          '로그인 세션이 만료되었습니다. 다시 로그인 해주세요.',
        );
        return;
      }

      const response = await axios.post(
        'http://43.202.219.28:8000/common/api/recordhealthdata',
        JSON.stringify({
          token: token,
          type: 'bloodsugar',
          value: {
            bloodsugar: targetSteps,
          },
        }),
        {headers: {'Content-Type': 'application/json'}},
      );

      if (response.status === 201) {
        Alert.alert('저장 성공', '혈당 수치가 성공적으로 저장되었습니다.');
        navigation.navigate('MainLandingScreen');
      } else {
        throw new Error('Failed to save data'); // Just in case the status code isn't handled above
      }
    } catch (error) {
      console.log(error);
      const errorMessage =
        error.response?.data?.message || '데이터 저장 중 오류가 발생했습니다.';
      Alert.alert('저장 실패', errorMessage);
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollView}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.navigate('MainLandingScreen')}>
          <Icon name="arrow-left" size={24} color="#3C5A99" />
        </TouchableOpacity>
        <Text style={styles.headerText}>혈당 입력하기</Text>
      </View>
      <View style={{width: 1, height: '10%'}} />
      <View
        style={{
          width: '100%',
          height: '50%',
          backgroundColor: '#FAFAFF',
        }}>
        <View style={{flex: 1}}>
          <WebView
            source={{
              uri: `http://43.202.219.28:8000/common/bschart?token=${token}`,
            }}
            style={{height: '100%', width: '100%'}}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            startInLoadingState={true}
            mixedContentMode="always"
            onError={syntheticEvent => {
              const {nativeEvent} = syntheticEvent;
              console.error('WebView error: ', nativeEvent);
            }}
            onHttpError={syntheticEvent => {
              const {nativeEvent} = syntheticEvent;
              console.error('HTTP error status code: ', nativeEvent.statusCode);
            }}
          />
        </View>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={targetSteps}
          onChangeText={setTargetSteps}
          placeholder="혈당 (mg/dL)"
          keyboardType="numeric"
          placeholderTextColor="#3C5A99"
        />
        <TouchableOpacity style={styles.button} onPress={saveSteps}>
          <Text style={styles.buttonText}>저장하기</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFF',
  },
  scrollView: {
    flexGrow: 1,
    backgroundColor: '#FAFAFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: '#FAFAFF',
  },
  headerText: {
    color: '#3C5A99',
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  graph: {
    height: '100%',
    width: '100%',
  },
  inputContainer: {
    padding: 20,
  },
  input: {
    height: 50,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#4267B2',
    marginBottom: 10,
    paddingHorizontal: 15,
    color: '#3C5A99',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#4267B2',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default BSInputScreen;
