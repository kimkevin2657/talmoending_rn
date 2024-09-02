import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  useWindowDimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const MainLandingScreen = ({navigation}) => {
  const {width, height} = useWindowDimensions();

  return (
    <LinearGradient colors={['#1e3c72', '#2a5298']} style={styles.container}>
      <LinearGradient
        colors={['rgba(0, 0, 0, 0.6)', 'transparent']}
        style={styles.overlay}>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerText}>모발이식 후</Text>
            <Text style={[styles.headerText, styles.headerHighlight]}>
              달라진 나의 모습이
            </Text>
            <Text style={styles.headerText}>궁금하다면?</Text>
          </View>

          {/* Images Section */}
          <View style={styles.imageSection}>
            <Image
              source={require('../../static/imgs/hair_before.png')}
              style={[styles.image, {width: width * 0.4, height: 200}]}
              resizeMode="cover"
            />
            <Image
              source={require('../../static/imgs/hair_after.png')}
              style={[styles.image, {width: width * 0.4, height: 200}]}
              resizeMode="cover"
            />
          </View>

          {/* Information Section */}
          <View style={styles.infoSection}>
            <Text style={styles.infoTitle}>가상이식 설명</Text>
            <Text style={styles.infoText}>
              AI 기반 가상 이식 및 예상 견적을 확인 해보세요.
            </Text>
            <Text style={styles.infoText}>
              가상 이식 해보기 버튼을 눌러 시작하세요.
            </Text>
          </View>

          {/* Action Button */}
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate('GraftingScreen')}>
            <Text style={styles.actionButtonText}>가상이식 해보기</Text>
          </TouchableOpacity>
        </ScrollView>
      </LinearGradient>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    padding: 20,
  },
  contentContainer: {
    alignItems: 'center',
    paddingBottom: 100, // Bottom padding to prevent content cut-off
  },
  header: {
    alignItems: 'center',
    marginVertical: 20,
  },
  headerText: {
    color: '#ffffff',
    fontSize: 24,
    fontFamily: 'SCDream9',
    textAlign: 'center',
    lineHeight: 30,
  },
  headerHighlight: {
    color: '#FFA07A', // Changed color from yellow to a coral shade
    fontSize: 26,
    fontFamily: 'SCDream9',
    marginVertical: 5,
  },
  imageSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 20,
    width: '90%',
  },
  image: {
    borderRadius: 10,
    marginHorizontal: 10,
    borderWidth: 1,
    borderColor: '#DCDCDC',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  infoSection: {
    width: '90%',
    backgroundColor: '#F0F0F0',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  infoTitle: {
    color: '#003DA5',
    fontSize: 20,
    fontFamily: 'SCDream9',
    marginBottom: 10,
  },
  infoText: {
    color: '#003DA5',
    fontSize: 16,
    fontFamily: 'SCDream7',
    marginBottom: 10,
    lineHeight: 24,
  },
  actionButton: {
    backgroundColor: '#20B2AA', // Changed color to a light sea green
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    marginBottom: 30,
  },
  actionButtonText: {
    color: '#ffffff',
    fontSize: 20,
    fontFamily: 'SCDream9',
    fontWeight: 'bold',
  },
});

export default MainLandingScreen;
