import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {WebView} from 'react-native-webview';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const BloodTestChart = () => {
  const navigation = useNavigation();
  const data = {
    WBC: 10,
    RBC: 20,
    PLT: 30,
    Hb: 40,
    Hct: 50,
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
        <Text style={styles.headerText}>혈액 검사 결과 차트</Text>
      </View>
      <View style={{height: '40%', width: '100%'}}>
        <WebView
          source={{
            uri: `http://43.202.219.28:8000/common/radarchart?WBC=${data.WBC}&RBC=${data.RBC}&PLT=${data.PLT}&Hb=${data.Hb}&Hct=${data.Hct}`,
          }}
          style={styles.chartWebView}
        />
      </View>
      <TouchableOpacity
        style={styles.detailsButton}
        onPress={() => navigation.navigate('BloodTestSpecific')}>
        <Text style={styles.buttonText}>혈액검사 결과 상세보기</Text>
      </TouchableOpacity>
      <View style={styles.detailsWebViewContainer}>
        <WebView
          source={{uri: 'http://43.202.219.28:8000/common/boxchart'}}
          style={styles.detailsWebView}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollView: {
    flexGrow: 1,
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
  chartWebView: {
    height: '100%',
    width: '100%',
  },
  detailsButton: {
    backgroundColor: '#4267B2',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  detailsWebViewContainer: {
    height: '40%',
    width: '100%',
    // backgroundColor: 'yellow',
  },
  detailsWebView: {
    height: '100%',
    width: '100%',
  },
});

export default BloodTestChart;
