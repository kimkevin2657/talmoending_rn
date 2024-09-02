import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const BloodTestHistoryScreen = () => {
  const navigation = useNavigation();
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem('@jwt_token');
        if (!token) {
          Alert.alert('Session Error', 'No token found, please login again.');
          navigation.navigate('LoginScreen');
          return;
        }
        try {
          if (token === 'test') {
            // var temp_bloodResult = {
            //   cartridgeSN: 'A00000000',
            //   ctc: false,
            //   hct: 33.9,
            //   hemoglobin: 11.3,
            //   lymph: 37,
            //   lymphocyte: 33.6,
            //   mch: 31.4,
            //   mchc: 33.3,
            //   mcv: 94.2,
            //   mono: 1,
            //   monocyte: 0.9,
            //   mpv: 10.7,
            //   neut: 72,
            //   neutrophil: 65.5,
            //   pct: 4.034,
            //   pdw: 15.5,
            //   'plt concentration': 377,
            //   'rbc concentration': 3.6,
            //   rdw: 42,
            //   'wbc concentration': 3.2,
            // };
            // let fetchedData = [];
            // for (var i = 0; i < 15; i++) {
            //   fetchedData.push({
            //     id: String(i),
            //     title: '혈액검사',
            //     time: '2024-06-04 14:22:00',
            //     value: '혈액검사 ' + JSON.stringify(i + 1) + '번',
            //     range: '',
            //     bloodResult: temp_bloodResult,
            //   });
            // }
            const bloodHistory = await AsyncStorage.getItem('@bloodHistory');
            var bloodHistory_local = [];
            if (bloodHistory) {
              bloodHistory_local = JSON.parse(bloodHistory);
            }
            setData(bloodHistory_local);
          } else {
            const response = await axios.post(
              'http://43.202.219.28:8000/common/api/retrievebloodtesthistory',
              JSON.stringify({token: token}),
              {headers: {'Content-Type': 'application/json'}},
            );

            if (response.status === 200 || response.status === 201) {
              console.log('!!!========== response ', response.data);
              // Assume the response has the format {results: [{bloodResult: {}, datetime: ""}]}
              const fetchedData = response.data.results.map((item, index) => ({
                id: String(index),
                title: '혈액검사',
                time: item.datetime,
                // value: item.bloodResult.ctc ? '혈액암 세포 O' : '혈액암 세포 X',
                value: '혈액검사 ' + JSON.stringify(index + 1) + '번',
                range: '',
                bloodResult: item.bloodResult,
              }));
              setData(fetchedData);
            } else {
              Alert.alert(
                'Error',
                'Failed to fetch data from the server.',
                response.status,
                response.data,
              );
            }
          }
        } catch (err) {
          console.log('!!!========== err ', err);
        }
      } catch (error) {
        console.error('Error fetching blood test history:', error);
        Alert.alert('Error', 'There was a problem fetching data.');
      }
    };

    fetchData();
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.navigate('MainLandingScreen')}>
          <Icon name="arrow-left" size={24} color="#3C5A99" />
        </TouchableOpacity>
        <Text style={styles.headerText}>혈액검사 모두 보기</Text>
      </View>

      <FlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              navigation.navigate('BloodTestSpecific', {
                bloodResult: item.bloodResult,
              })
            }>
            <View style={styles.cardTopRow}>
              <View style={styles.titleWithIcon}>
                <Icon name="vial" size={24} color="#3C5A99" />
                <Text style={styles.cardTitle}>{item.title}</Text>
              </View>
              <Text style={styles.cardTime}>{item.time}</Text>
            </View>
            <View style={styles.cardBottomRow}>
              <View style={styles.valueWrapper}>
                <Text style={styles.valueCount}>{item.value}</Text>
                <Text style={styles.totalRange}>{item.range}</Text>
              </View>
              <View style={styles.iconButton}>
                <Icon name="info-circle" size={24} color="#3C5A99" />
              </View>
            </View>
          </TouchableOpacity>
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    marginHorizontal: '5%',
    marginVertical: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    height: 100, // Reduced height
  },
  cardTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#3C5A99',
    marginLeft: 5,
  },
  cardTime: {
    fontSize: 14,
    color: '#3C5A99',
  },
  cardBottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  valueWrapper: {
    flexDirection: 'row',
    alignItems: 'baseline', // Keeps text aligned at their baseline
  },
  valueCount: {
    fontSize: 20, // Large font size for value count
    fontWeight: 'bold',
    color: '#3C5A99',
  },
  totalRange: {
    fontSize: 15, // Smaller font size for total range
    fontWeight: 'normal', // Less emphasis compared to value count
    color: '#3C5A99',
  },
  iconButton: {
    paddingLeft: 10,
  },
});

export default BloodTestHistoryScreen;
