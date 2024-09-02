import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useNavigation} from '@react-navigation/native';
import {WebView} from 'react-native-webview';

const TotalDataScreen = () => {
  const navigation = useNavigation();

  const handleBack = () => {
    navigation.navigate('MainLandingScreen');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack}>
          <Icon name="arrow-left" size={24} color="#3C5A99" />
        </TouchableOpacity>
        <Text style={styles.headerText}>건강 데이터</Text>
      </View>

      {/* 혈액검사 Card */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>혈액검사</Text>
        <Text style={styles.cardTime}>오후 6:20</Text>
        <WebView source={{uri: 'https://google.com'}} style={styles.webView} />
      </View>

      {/* 걷기 Card */}
      <View style={styles.card}>
        <View style={styles.cardTopRow}>
          <View style={styles.titleWithIcon}>
            <Icon name="walking" size={24} color="#3C5A99" />
            <Text style={styles.cardTitle}>걷기</Text>
          </View>
          <Text style={styles.cardTime}>오후 6:30</Text>
        </View>
        <View style={styles.cardBottomRow}>
          <View style={styles.stepsWrapper}>
            <Text style={styles.stepsCount}>800</Text>
            <Text style={styles.totalSteps}>/1,000걸음</Text>
          </View>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => navigation.navigate('WalkingInputScreen')}>
            <Icon name="pen" size={24} color="#3C5A99" />
          </TouchableOpacity>
        </View>
      </View>

      {/* 혈압 Card */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>혈압</Text>
        <Text style={styles.cardTime}>오후 6:20</Text>
        <WebView
          source={{uri: 'http://example.com/bpchart'}}
          style={styles.webView}
        />
      </View>

      {/* 혈당 Card */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>혈당</Text>
        <Text style={styles.cardTime}>오후 6:20</Text>
        <WebView
          source={{uri: 'http://example.com/bschart'}}
          style={styles.webView}
        />
      </View>
    </ScrollView>
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
    padding: 20,
    backgroundColor: '#FAFAFF',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3C5A99',
    marginLeft: 10,
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
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20, // Added margin for better visual separation
  },
  stepsGoal: {
    fontSize: 18,
    color: '#3C5A99',
  },
  webView: {
    flex: 1,
    marginTop: 10,
  },
  icon: {
    marginLeft: 5,
  },
});

export default TotalDataScreen;
