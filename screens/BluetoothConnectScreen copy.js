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
} from 'react-native';
import BleManager from 'react-native-ble-manager';
import {NativeEventEmitter, NativeModules} from 'react-native';
import {SERVICE_UUID, WRITE_UUID, READ_UUID} from './constants';
import base64 from 'react-native-base64';
import {decode as atob} from 'base-64';
import {TextEncoder} from 'text-encoding';
import {Buffer} from 'buffer';

const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

const BLEScreen = () => {
  const [devices, setDevices] = useState([]);
  const [isScanning, setIsScanning] = useState(false);
  const [connectedDevice, setConnectedDevice] = useState(null);
  const [characteristics, setCharacteristics] = useState(null);
  const [jsonMessage, setJsonMessage] = useState('');

  useEffect(() => {
    console.log('!!!=================== useEffect executed');
    BleManager.start({showAlert: false});

    const handleDiscoverPeripheral = peripheral => {
      console.log('!!!=================== Discovered peripheral', peripheral);
      setDevices(prevDevices => {
        if (!prevDevices.some(device => device.id === peripheral.id)) {
          return [...prevDevices, peripheral];
        }
        return prevDevices;
      });
    };

    const handleStopScan = () => {
      setIsScanning(false);
      console.log('!!!=================== Scan stopped');
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

    const handleUpdateValueForCharacteristic = data => {
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
          console.log(
            '!!!=================== Complete JSON message:',
            jsonMessage,
          );
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
  }, [connectedDevice, jsonMessage]);

  const startScan = async () => {
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
          title: 'Location Permission',
          message: 'Bluetooth Low Energy requires Location',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
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
          'Permission Denied',
          'Location and Bluetooth permissions are required to scan for BLE devices.',
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
      console.log('!!!=================== Scanning...');
    } catch (err) {
      console.error('!!!=================== Scan error:', err);
    }
  };

  const stopScan = async () => {
    console.log('!!!=================== stopScan executed');
    try {
      await BleManager.stopScan();
      setIsScanning(false);
      console.log('!!!=================== Scan stopped successfully');
    } catch (err) {
      console.error('!!!=================== Stop scan error:', err);
    }
  };

  const connectDevice = async peripheralId => {
    console.log('!!!=================== connectDevice executed');
    try {
      await BleManager.connect(peripheralId);
      console.log('!!!=================== Connected to ' + peripheralId);
      setConnectedDevice({id: peripheralId});
      Alert.alert('Connected', `Connected to device ${peripheralId}`);

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

  const renderDevice = ({item}) => (
    <View style={styles.deviceContainer}>
      <Text style={styles.deviceText}>{item.name || 'Unknown Device'}</Text>
      <Text style={styles.deviceText}>{item.id}</Text>
      <TouchableOpacity
        style={styles.connectButton}
        onPress={() => connectDevice(item.id)}>
        <Text style={styles.buttonText}>Connect</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.scanButton} onPress={startScan}>
        <Text style={styles.buttonText}>Start Scan</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.scanButton} onPress={stopScan}>
        <Text style={styles.buttonText}>Stop Scan</Text>
      </TouchableOpacity>
      <FlatList
        data={devices}
        keyExtractor={item => item.id}
        renderItem={renderDevice}
        style={styles.deviceList}
      />
      {connectedDevice && (
        <View style={styles.controlContainer}>
          <Text style={styles.deviceText}>
            Connected to: {connectedDevice.id}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FAFAFF',
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
    marginTop: 20,
  },
  deviceContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
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
    alignItems: 'center',
  },
  controlContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
});

export default BLEScreen;
