import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useNavigation} from '@react-navigation/native';
import {WebView} from 'react-native-webview';
import BloodTestComponent from '../components/BloodTestComponent';

const MainLandingScreen = () => {
  const navigation = useNavigation();
  const [selectedChart, setSelectedChart] = useState('혈액검사');
  const [token, setToken] = useState('');
  const [isBloodTestConnected, setIsBloodTestConnected] = useState(false);

  const [userData, setUserData] = useState({
    nickname: '',
    age: 0,
    height: 0,
    weight: 0,
  });

  const bloodTestData = {
    WBC: 10,
    RBC: 20,
    PLT: 30,
    Hb: 40,
    Hct: 50,
  };

  const navigateInput = () => {
    if (selectedChart === '혈액검사') {
      // setIsBloodTestConnected(true);
      navigation.navigate('BluetoothConnectScreen');
    } else if (selectedChart === '걷기') {
      navigation.navigate('WalkingInputScreen');
    } else if (selectedChart === '혈압') {
      navigation.navigate('BPInputScreen');
    } else if (selectedChart === '혈당') {
      navigation.navigate('BSInputScreen');
    } else {
      return;
    }
  };

  const navigateHistory = () => {
    if (selectedChart === '혈액검사') {
      navigation.navigate('BloodTestHistoryScreen');
    } else if (selectedChart === '걷기') {
      navigation.navigate('WalkingHistoryScreen');
    } else if (selectedChart === '혈압') {
      navigation.navigate('BPHistoryScreen');
    } else if (selectedChart === '혈당') {
      navigation.navigate('BSHistoryScreen');
    } else {
      return;
    }
  };

  const bmi = (userData.weight / Math.pow(userData.height / 100, 2)).toFixed(1);
  const chartTypes = ['혈액검사', '걷기', '혈압', '혈당'];
  const screenWidth = Dimensions.get('window').width;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = await AsyncStorage.getItem('@jwt_token');
        setToken(token); // Store the token in state
        const response = await axios.post(
          'http://43.202.219.28:8000/common/api/getprofile',
          JSON.stringify({token: token}),
          {headers: {'Content-Type': 'application/json'}},
        );
        const {name, age, height, weight} = response.data;
        setUserData({nickname: name, age, height, weight});
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const renderChartDetails = (chartType, data) => {
    const timestamp = new Date().getTime();
    if (chartType === '혈액검사') {
      return <BloodTestComponent isConnected={isBloodTestConnected} />;
    }
    const urls = {
      혈액검사: `http://43.202.219.28:8000/common/radarchart?WBC=${data.WBC}&RBC=${data.RBC}&PLT=${data.PLT}&Hb=${data.Hb}&Hct=${data.Hct}`,
      걷기: `http://43.202.219.28:8000/common/walkingchart?token=${token}&_=${timestamp}`,
      혈압: `http://43.202.219.28:8000/common/bpchart?token=${token}&_=${timestamp}`,
      혈당: `http://43.202.219.28:8000/common/bschart?token=${token}&_=${timestamp}`,
    };
    return (
      <WebView
        source={{uri: urls[chartType]}}
        style={{height: '47%', width: '100%'}}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
        mixedContentMode="always"
        onError={event => {
          const {nativeEvent} = event;
          console.error('WebView error: ', nativeEvent);
        }}
        onHttpError={event => {
          const {nativeEvent} = event;
          console.error('HTTP error status code: ', nativeEvent.statusCode);
        }}
      />
    );
  };

  const setSelectedChartAndResetConnection = chartType => {
    setSelectedChart(chartType);
    if (chartType !== '혈액검사') {
      setIsBloodTestConnected(false);
    }
  };

  const renderConnectionButton = () => {
    if (selectedChart === '혈액검사' && isBloodTestConnected) {
      return null; // Don't render the button if the device is connected for blood tests
    }

    return (
      <TouchableOpacity
        style={styles.linkButton}
        onPress={() => navigateInput()}>
        <Text style={styles.linkButtonText}>{selectedChart} 연동하기</Text>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Lumiio</Text>
          <Icon name="bell" size={24} color="#3C5A99" style={styles.icon} />
        </View>
        <View style={styles.profileCard}>
          <Image
            source={{uri: 'https://via.placeholder.com/150'}}
            style={styles.profileImage}
          />
          <View style={styles.profileDetails}>
            <View style={styles.nameAgeRow}>
              <Text style={styles.nickname}>{userData.nickname}</Text>
              <View style={styles.ageContainer}>
                <Text style={styles.age}>{userData.age}세</Text>
              </View>
            </View>
            <Text style={styles.biometricDetail}>
              {userData.height}cm | {userData.weight}kg | BMI {bmi}
            </Text>
          </View>
        </View>
        <View style={styles.chartCard}>
          <Text style={styles.sectionTitle}>통합차트</Text>
          <Text style={styles.chartDateRange}>
            2023년 1월 1일 - 2023년 12월 31일
          </Text>
          <View style={styles.buttonContainer}>
            {chartTypes.map(chartType => (
              <TouchableOpacity
                key={chartType}
                onPress={() => setSelectedChartAndResetConnection(chartType)}
                style={[
                  styles.toggleButton,
                  selectedChart === chartType
                    ? styles.activeButton
                    : styles.inactiveButton,
                ]}>
                <Text style={styles.buttonText}>{chartType}</Text>
              </TouchableOpacity>
            ))}
          </View>
          {renderChartDetails(selectedChart, bloodTestData)}
          {renderConnectionButton()}
          <TouchableOpacity
            style={[styles.viewAllButton, styles.fixedBottom]}
            onPress={() => navigateHistory()}>
            <Text style={styles.viewAllButtonText}>
              {selectedChart} 모두보기
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <TouchableOpacity
          onPress={() => console.log('Home')}
          style={styles.iconButton}>
          <Icon name="home" size={20} color="#3C5A99" />
          <Text style={styles.iconText}>홈</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => console.log('Health Data')}
          style={styles.iconButton}>
          <Icon name="chart-line" size={20} color="#3C5A99" />
          <Text style={styles.iconText}>건강데이터</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => console.log('More')}
          style={styles.iconButton}>
          <Icon name="bars" size={20} color="#3C5A99" />
          <Text style={styles.iconText}>더보기</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('LoginScreen')}
          style={styles.iconButton}>
          <Icon name="sign-out-alt" size={20} color="#3C5A99" />
          <Text style={styles.iconText}>로그아웃</Text>
        </TouchableOpacity>
      </View>
    </>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3C5A99',
  },
  icon: {
    position: 'absolute',
    right: 20,
  },
  profileCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 15,
    marginHorizontal: 20,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 50,
  },
  profileDetails: {
    flex: 1,
    marginLeft: 10,
  },
  nameAgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nickname: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#3C5A99',
  },
  ageContainer: {
    marginLeft: 10,
    backgroundColor: '#4267B2',
    borderRadius: 12,
    paddingVertical: 2,
    paddingHorizontal: 6,
  },
  age: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  biometricDetail: {
    fontSize: 16,
    color: '#3C5A99',
    marginTop: 5,
  },
  chartCard: {
    // width: '90%',
    height: '63%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 15,
    marginHorizontal: 20,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  webView: {
    width: '100%',
    flex: 1,
  },
  sectionTitle: {
    fontSize: 20,
    color: '#3C5A99',
    marginBottom: 5,
  },
  chartDateRange: {
    fontSize: 14,
    color: '#3C5A99',
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  toggleButton: {
    padding: 10,
    borderRadius: 12,
  },
  activeButton: {
    backgroundColor: '#4267B2',
  },
  inactiveButton: {
    backgroundColor: '#E0E0E0',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  detailsContainer: {
    width: '100%',
    height: '55%',
    padding: 10,
    justifyContent: 'center',
    marginBottom: '2%',
  },
  linkButton: {
    backgroundColor: '#F8F9FA',
    padding: 10,
    borderRadius: 25,
    borderColor: '#343a40',
    borderWidth: 2,
    width: '65%',
    alignSelf: 'center',
    marginBottom: 50,
    alignItems: 'center',
  },
  linkButtonText: {
    color: '#343a40',
    fontSize: 16,
  },
  viewAllButton: {
    backgroundColor: '#4267B2',
    padding: 10,
    borderRadius: 12,
    width: '110%',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  viewAllButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  fixedBottom: {
    marginBottom: 0,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: -1},
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 20,
  },
  iconButton: {
    justifyContent: 'center',
    alignItems: 'center', // Center the icon vertically and horizontally
  },
  iconText: {
    textAlign: 'center', // Ensure the text is centered under the icon
    color: '#3C5A99',
  },
});

export default MainLandingScreen;
