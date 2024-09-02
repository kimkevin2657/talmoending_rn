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

const MainLandingScreen = ({navigation}) => {
  const {width, height} = useWindowDimensions();

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {/* Header */}
        <View style={styles.headerContainer}>
          <View style={styles.header}>
            <Text style={styles.headerText}>모발이식 후</Text>
            <Text style={[styles.headerText, styles.headerHighlight]}>
              달라진 나의 모습이
            </Text>
            <Text style={styles.headerText}>궁금하다면?</Text>
          </View>
        </View>

        {/* Images Section */}
        <View style={[styles.imageSection, {height: height * 0.3}]}>
          <Image
            source={require('../../static/imgs/hair_before.png')}
            style={[styles.image, {width: width * 0.45}]}
            resizeMode="cover"
          />
          <Image
            source={require('../../static/imgs/hair_after.png')}
            style={[styles.image, {width: width * 0.45}]}
            resizeMode="cover"
          />
        </View>

        {/* Information Section */}
        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>가상이식 설명</Text>
          <Text style={styles.infoText}>
            AI 기반 가상 이식 및 예상 견적을 확인해보세요.
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#003DA5',
  },
  contentContainer: {
    alignItems: 'center',
    paddingBottom: 80, // Bottom padding to prevent content cut-off
  },
  headerContainer: {
    width: '100%',
    padding: 15,
    backgroundColor: '#FFCD00', // Reverted to yellow color
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 8},
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 10,
  },
  header: {
    alignItems: 'center',
  },
  headerText: {
    color: '#ffffff',
    fontSize: 22,
    fontFamily: 'SCDream9',
    textAlign: 'center',
    lineHeight: 30,
  },
  headerHighlight: {
    color: '#003DA5', // Highlight text color
    fontSize: 26,
    fontFamily: 'SCDream9',
    marginVertical: 5,
  },
  imageSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  image: {
    height: '100%',
    borderRadius: 15,
    marginHorizontal: 10,
    borderWidth: 2,
    borderColor: '#DCDCDC', // Light border to enhance the image
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  infoSection: {
    width: '90%',
    backgroundColor: '#F0F0F0',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 5,
  },
  infoTitle: {
    color: '#003DA5', // Title color matching the main theme
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
    backgroundColor: '#FFCD00', // Reverted to yellow color
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    marginBottom: 30, // Sufficient margin to avoid cut-off
  },
  actionButtonText: {
    color: '#003DA5',
    fontSize: 20,
    fontFamily: 'SCDream9',
    fontWeight: 'bold',
  },
});

export default MainLandingScreen;
