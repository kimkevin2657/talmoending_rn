import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  PermissionsAndroid,
  Platform,
  StyleSheet,
  Alert,
  Image,
  ActivityIndicator,
} from 'react-native';
import BleManager from 'react-native-ble-manager';
import {NativeEventEmitter, NativeModules} from 'react-native';
import {SERVICE_UUID, WRITE_UUID, READ_UUID} from './constants';
import base64 from 'react-native-base64';
import {decode as atob} from 'base-64';
import {TextEncoder} from 'text-encoding';
import {Buffer} from 'buffer';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import DeviceInfo from 'react-native-device-info';
// import IntentLauncher, {IntentConstant} from 'react-native-intent-launcher';

// const package2 = DeviceInfo.getBundleId();
const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

const BLEScreen = () => {
  const navigation = useNavigation();
  const [devices, setDevices] = useState([]);
  const [isScanning, setIsScanning] = useState(false);
  const [connectedDevice, setConnectedDevice] = useState(null);
  const [characteristics, setCharacteristics] = useState(null);
  const [jsonMessage, setJsonMessage] = useState('');
  const [spinnerLoading, setSpinnerloading] = useState(false);

  useEffect(() => {
    console.log('!!!=================== useEffect executed');
    BleManager.start({showAlert: false});

    const handleDiscoverPeripheral = async peripheral => {
      if (
        peripheral.advertising &&
        peripheral.advertising.localName === 'Lumiio'
      ) {
        console.log('Lumiio discovered:', peripheral);
        setDevices([peripheral]);
        await AsyncStorage.setItem('@peripheral', JSON.stringify(peripheral));
        stopScan2(); // Stop scanning once Lumiio is found
      }
    };

    const stopScan2 = () => {
      if (isScanning) {
        BleManager.stopScan();
        setIsScanning(false);
        console.log('Scan stopped after finding Lumiio');
      }
    };

    const handleStopScan = async () => {
      setIsScanning(false);
      setSpinnerloading(false);
      console.log('!!!=================== Scan stopped');
      if (devices.length === 0) {
        console.log(
          '!!!=================== Scan stopped and devices length is zero ',
        );
        const peripheral_async = await AsyncStorage.getItem('@peripheral');
        if (peripheral_async) {
          const peripheral_local = JSON.parse(peripheral_async);
          setDevices([peripheral_local]);
          console.log(
            '!!!=================== Scan stopped and devices length is zero and set devices from the last device',
          );
        }
      }
    };

    const handleDisconnectedPeripheral = data => {
      console.log(
        '!!!=================== Disconnected from ' + data.peripheral,
      );
      if (connectedDevice && data.peripheral === connectedDevice.id) {
        setConnectedDevice(null);
        setCharacteristics(null);
      }
    };

    const postBloodTestResults = async (bloodData, periId) => {
      try {
        const token = await AsyncStorage.getItem('@jwt_token');
        if (!token) {
          console.error('Token not found in storage');
          return;
        }
        console.log('!!!========== postBloodTestResults request body  ', {
          token: token,
          bloodResult: bloodData,
        });
        if (token === 'test') {
          var bloodResult_async2 = await AsyncStorage.getItem('@bloodHistory');
          var bloodResult_async = [];
          var bloodResult_local = [];
          if (bloodResult_async2) {
            bloodResult_async = JSON.parse(bloodResult_async2);
          }

          let datenow = new Date();
          bloodResult_local.push({
            id: String(0),
            title: '혈액검사',
            time: generateDatabaseDateTime(datenow),
            value: '혈액검사 1번',
            range: '',
            bloodResult: bloodData,
          });
          for (var i = 0; i < bloodResult_async.length; i++) {
            bloodResult_local.push({
              id: String(i + 1),
              title: '혈액검사',
              time: bloodResult_async[i].time,
              value: '혈액검사 ' + String(i + 2) + '번',
              range: '',
              bloodResult: bloodResult_async[i].bloodResult,
            });
          }
          console.log('!!!========== bloodResult_local   ', bloodResult_local);
          await AsyncStorage.setItem(
            '@bloodHistory',
            JSON.stringify(bloodResult_local),
          );
          Alert.alert(
            '혈액검사 업로드 성공',
            '홈 화면에서 혈액검사 모두보기에서 확인 해보세요',
          );
          navigation.navigate('MainLandingScreen');
        } else {
          const response = await axios.post(
            'http://43.202.219.28:8000/common/api/savebloodtest',
            JSON.stringify({token: token, bloodResult: bloodData}),
            {headers: {'Content-Type': 'application/json'}},
          );

          console.log('!!!========== response  ', response);
          // setSpinnerloading(false);

          if (response.status === 200 || response.status === 201) {
            console.log(
              'Blood test data successfully sent to server:',
              response.data,
            );
            Alert.alert(
              '혈액검사 업로드 성공',
              '홈 화면에서 혈액검사 모두보기에서 확인 해보세요',
            );
            // navigation.navigate('MainLandingScreen');
          } else {
            console.error(
              'Failed to send blood test data:',
              response.status,
              response.data,
            );
          }
        }
      } catch (error) {
        console.error('Error posting blood test data:', error);
      } finally {
        // Ensure disconnection from BLE device after handling data
        if (periId) {
          console.log('!!!========== postBloodTestResults periId   ', periId);
          BleManager.disconnect(periId)
            .then(() => {
              console.log('!!!========== Disconnected from device');
              setConnectedDevice(null);
              navigation.navigate('MainLandingScreen');
            })
            .catch(error => {
              console.error('!!!========== Disconnection error:', error);
            });
        } else {
          console.log(
            '!!!========== No connected device found or already disconnected.',
          );
          navigation.navigate('MainLandingScreen');
        }
        setSpinnerloading(false);
      }
    };

    const handleUpdateValueForCharacteristic = async data => {
      console.log(
        '!!!========== handleUpdateValueForCharacteristic data ',
        data,
      );

      // Convert byte array to string to properly format it as base64
      const base64String = String.fromCharCode.apply(null, data.value);
      console.log(`Base64 String: ${base64String}`);

      try {
        const decodedData = base64.decode(base64String);
        console.log(
          `!!!=================== Received data from ${data.peripheral} characteristic ${data.characteristic}`,
          decodedData,
        );

        if (decodedData === 'JSON' || decodedData === 'json_data') {
          setJsonMessage('');
        } else if (decodedData === 'END') {
          const jsonData = JSON.parse(jsonMessage + '"}' + '}');
          console.log(
            '!!!=================== Complete JSON message:',
            jsonData.bloodResult,
          );
          await postBloodTestResults(jsonData.bloodResult, data.peripheral);
        } else {
          setJsonMessage(prevMessage => prevMessage + decodedData);
        }
      } catch (error) {
        console.error('Base64 Decode Error: ', error);
      }
    };

    const discoverPeripheralListener = bleManagerEmitter.addListener(
      'BleManagerDiscoverPeripheral',
      handleDiscoverPeripheral,
    );
    const stopScanListener = bleManagerEmitter.addListener(
      'BleManagerStopScan',
      handleStopScan,
    );
    const disconnectPeripheralListener = bleManagerEmitter.addListener(
      'BleManagerDisconnectPeripheral',
      handleDisconnectedPeripheral,
    );
    const updateValueForCharacteristicListener = bleManagerEmitter.addListener(
      'BleManagerDidUpdateValueForCharacteristic',
      handleUpdateValueForCharacteristic,
    );

    return () => {
      discoverPeripheralListener.remove();
      stopScanListener.remove();
      disconnectPeripheralListener.remove();
      updateValueForCharacteristicListener.remove();
    };
  }, [
    connectedDevice,
    jsonMessage,
    isScanning,
    navigation,
    spinnerLoading,
    devices.length,
  ]);

  const startScan = async () => {
    setSpinnerloading(true);
    console.log('!!!=================== startScan executed');
    if (isScanning) {
      console.log('!!!=================== Already scanning');
      return;
    }
    console.log('!!!=================== startScan executed 2');
    if (Platform.OS === 'android' && Platform.Version >= 23) {
      console.log('!!!=================== startScan executed 3');
      const locationPermissionGranted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: '위치 권한',
          message: '블루투스 통신을 위해서는 위치 권한 승인이 필요합니다.',
          buttonNeutral: '나중에 다시 요청하기',
          buttonNegative: '취소',
          buttonPositive: '승인',
        },
      );
      console.log(
        '!!!=================== startScan locationPermissionGranted',
        locationPermissionGranted,
      );
      const bluetoothPermissionsGranted =
        Platform.Version >= 31
          ? await PermissionsAndroid.requestMultiple([
              PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
              PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
            ])
          : true;
      console.log(
        '!!!=================== startScan bluetoothPermissionsGranted',
        bluetoothPermissionsGranted,
      );
      if (
        locationPermissionGranted !== PermissionsAndroid.RESULTS.GRANTED ||
        (Platform.Version >= 31 &&
          (bluetoothPermissionsGranted['android.permission.BLUETOOTH_SCAN'] !==
            PermissionsAndroid.RESULTS.GRANTED ||
            bluetoothPermissionsGranted[
              'android.permission.BLUETOOTH_CONNECT'
            ] !== PermissionsAndroid.RESULTS.GRANTED))
      ) {
        Alert.alert(
          '권한 설정 필수',
          '위치 정보와 블루투스 정보는 루미오 기기 연동에 필수 권한입니다. 휴대폰 설정에서 synopex 앱의 사용 권한 승인 후 사용 해주세요.',
        );
        return;
      }
    }
    console.log('!!!=================== Setting up scan');
    setDevices([]);
    setIsScanning(true);
    console.log(
      '!!!=================== startScan setIsScanning value',
      isScanning,
    );

    try {
      await BleManager.scan([], 5, true);
      console.log('Scanning...');
      setTimeout(async () => {
        if (isScanning) {
          console.log('Restarting scan...');
          await startScan(); // Restart scan if still scanning and Lumiio not found
        }
      }, 500); // Restart scan every 6 seconds until Lumiio is found
    } catch (error) {
      console.error('Scan failed:', error);
    }
  };

  const stopScan = async () => {
    console.log('!!!=================== stopScan executed');
    try {
      await BleManager.stopScan();
      setIsScanning(false);
      setSpinnerloading(false);
      console.log('!!!=================== Scan stopped successfully');
    } catch (err) {
      console.error('!!!=================== Stop scan error:', err);
    }
  };

  const connectDevice = async peripheralId => {
    setSpinnerloading(true);
    console.log('!!!=================== connectDevice executed');
    try {
      await BleManager.connect(peripheralId);
      console.log('!!!=================== Connected to ' + peripheralId);
      setConnectedDevice({id: peripheralId});
      // Alert.alert('Connected', `Connected to device ${peripheralId}`);

      const services = await BleManager.retrieveServices(peripheralId);
      const characteristics = services.characteristics.filter(
        c => c.properties.Notify || c.properties.Write,
      );

      characteristics.forEach(async char => {
        if (char.properties.Notify) {
          await enableNotification(peripheralId, char);
        }
        if (char.properties.Write) {
          await writeData('JSON_GET', peripheralId, char.characteristic);
        }
      });
    } catch (error) {
      console.error('!!!=================== Connection error', error);
      Alert.alert(
        'Connection Error',
        `Could not connect to device ${peripheralId}`,
      );
    }
  };

  const enableNotification = async (peripheralId, characteristic) => {
    console.log('!!!=================== enableNotification executed');
    try {
      await BleManager.startNotification(
        peripheralId,
        characteristic.service,
        characteristic.characteristic,
      )
        .then(() => {
          console.log('!!!=================== Notification started');
        })
        .catch(error => {
          console.error('!!!=================== Notification error:', error);
        });

      bleManagerEmitter.addListener(
        'BleManagerDidUpdateValueForCharacteristic',
        ({value, peripheral, characteristic, service}) => {
          console.log(
            '!!!========== enableNotification bleManagerEmitter value ',
            value,
          );
          const decodedData = Buffer.from(value).toString('utf-8');
          console.log(`Received data from ${peripheral}: ${decodedData}`);
          // Process data as needed
        },
      );

      return true;
    } catch (error) {
      console.error('!!!=================== Notification error:', error);
      return false;
    }
  };

  const writeData = async (data, periId, writeCharacteristicUUID) => {
    console.log(
      '!!!=================== writeData executed ',
      periId,
      writeCharacteristicUUID,
    );

    if (periId && writeCharacteristicUUID) {
      try {
        const buffer = Buffer.from(data);
        console.log(
          '!!!=================== Bytes to write:',
          buffer.toJSON().data,
        );

        await BleManager.writeWithoutResponse(
          periId,
          SERVICE_UUID,
          writeCharacteristicUUID,
          buffer.toJSON().data,
        )
          .then(() => {
            console.log('Write success');
          })
          .catch(error => {
            console.error('Write failed', error);
          });

        console.log('!!!=================== Write successful');
      } catch (error) {
        console.error('!!!=================== Write error:', error);
      }
    } else {
      console.log('!!!=================== Required data not available');
    }
  };

  // const openAppSettings = () => {
  //   if (Platform.OS === 'ios') {
  //     Linking.openURL('app-settings:');
  //   } else {
  //     IntentLauncher.startActivity({
  //       action: 'android.settings.APPLICATION_DETAILS_SETTINGS',
  //       data: 'package:' + package2,
  //     });
  //   }
  // };

  const renderDevice = ({item}) => (
    <View style={styles.deviceContainer}>
      <Text style={styles.deviceText}>{item.name || 'Unknown Device'}</Text>

      <Text style={styles.deviceText}>{item.id}</Text>
      <TouchableOpacity
        style={styles.connectButton}
        onPress={() => connectDevice(item.id)}>
        <Text style={styles.buttonText}>연결하기</Text>
      </TouchableOpacity>
    </View>
  );
  function generateDatabaseDateTime(date) {
    return date.toISOString().replace('T', ' ').substring(0, 19);
  }

  return (
    <>
      <View style={styles.container}>
        {spinnerLoading ? (
          <ActivityIndicator
            size="large"
            color="#4267B2"
            style={{position: 'absolute', zIndex: 1, top: '55%'}}
          />
        ) : null}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.navigate('MainLandingScreen')}
            style={styles.backArrowContainer}>
            <Icon name="arrow-left" size={24} color="#3C5A99" />
          </TouchableOpacity>
          <Text style={styles.headerText}>디바이스 연동</Text>
        </View>
        <FlatList
          data={devices}
          keyExtractor={item => item.id}
          renderItem={renderDevice}
          style={styles.deviceList}
        />
        <View style={styles.footer}>
          <Text style={styles.infoText}>
            {
              "블루투스 스캔 시작하기 버튼 누르신 후, Lumiio 라고 적힌 디바이스에서 '연결하기' 버튼을 눌러 주세요."
            }
          </Text>
          <TouchableOpacity style={styles.scanButton} onPress={startScan}>
            <Text style={styles.buttonText}>블루투스 스캔 시작하기</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.scanButton} onPress={stopScan}>
            <Text style={styles.buttonText}>스캔 일시정지</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FAFAFF',
    justifyContent: 'center', // Centers content vertically in the container
    alignItems: 'center', // Centers content horizontally in the container
    zIndex: 0,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#FAFAFF',
    width: '100%',
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
  scanButton: {
    backgroundColor: '#4267B2',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
  },
  deviceList: {
    width: '100%', // Ensures the FlatList takes the full width
  },
  deviceContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    alignItems: 'center', // Center aligns all children horizontally
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  deviceText: {
    fontSize: 16,
    color: '#3C5A99',
    marginBottom: 5,
  },
  connectButton: {
    backgroundColor: '#4267B2',
    padding: 10,
    borderRadius: 8,
    width: '100%', // Button takes full container width
    alignItems: 'center',
  },
  deviceImage: {
    width: '100%', // Image takes full container width
    height: 150, // Fixed height for the image
    marginVertical: 10, // Adds space above and below the image
  },
  footer: {
    width: '100%', // Ensures footer takes the full width
    padding: 10,
    borderTopWidth: 1,
    borderColor: '#ccc',
  },
  infoText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
});

export default BLEScreen;
