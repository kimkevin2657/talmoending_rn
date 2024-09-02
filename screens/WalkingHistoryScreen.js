import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const WalkingHistoryScreen = () => {
  const navigation = useNavigation();

  // Dummy data for walking history
  // const walkingData = Array.from({length: 20}, (_, i) => ({
  //   id: String(i),
  //   title: '걷기',
  //   time: `오후 ${Math.floor(Math.random() * 12 + 1)}:${Math.floor(
  //     Math.random() * 60,
  //   )
  //     .toString()
  //     .padStart(2, '0')}`,
  //   steps: 100,
  // }));

  const [walkingData, setWalkingData] = useState([]);

  useEffect(() => {
    fetchWalkingData();
  }, []);

  const fetchWalkingData = async () => {
    try {
      const token = await AsyncStorage.getItem('@jwt_token');
      const response = await axios.post(
        'http://43.202.219.28:8000/common/api/fetchhealthdatahistory',
        {
          token: token,
          type: 'walking',
        },
        {
          headers: {'Content-Type': 'application/json'},
        },
      );

      if (response.status === 200) {
        setWalkingData(response.data.value); // Adjust this according to actual API response format
      } else {
        Alert.alert('Fetch Error', 'Unable to fetch walking data');
      }
    } catch (error) {
      console.error('Fetching Walking Data Error:', error);
      Alert.alert('Network Error', 'Unable to connect to the server');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.navigate('MainLandingScreen')}>
          <Icon name="arrow-left" size={24} color="#3C5A99" />
        </TouchableOpacity>
        <Text style={styles.headerText}>걷기 모두보기</Text>
      </View>

      <FlatList
        data={walkingData}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <View style={styles.card}>
            <View style={styles.cardTopRow}>
              <View style={styles.titleWithIcon}>
                <Icon name="walking" size={24} color="#3C5A99" />
                <Text style={styles.cardTitle}>{item.title}</Text>
              </View>
              <Text style={styles.cardTime}>{item.time}</Text>
            </View>
            <View style={styles.cardBottomRow}>
              <View style={styles.stepsWrapper}>
                <Text style={styles.stepsCount}>{item.steps}</Text>
                <Text style={styles.totalSteps}>/{item.target}걸음</Text>
              </View>
              <TouchableOpacity
                style={styles.iconButton}
                onPress={() => navigation.navigate('WalkingInputScreen')}>
                <Icon name="pen" size={24} color="#3C5A99" />
              </TouchableOpacity>
            </View>
          </View>
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
  stepsWrapper: {
    flexDirection: 'row',
    alignItems: 'baseline', // Keeps text aligned at their baseline
  },
  stepsCount: {
    fontSize: 28, // Large font size for steps count
    fontWeight: 'bold',
    color: '#3C5A99',
  },
  totalSteps: {
    fontSize: 15, // Smaller font size for total steps
    fontWeight: 'normal', // Less emphasis compared to steps count
    color: '#3C5A99',
  },
  iconButton: {
    paddingLeft: 10,
  },
});

export default WalkingHistoryScreen;
