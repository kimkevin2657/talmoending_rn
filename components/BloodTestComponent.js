import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Carousel from 'react-native-snap-carousel'; // Ensure you have installed this package or a similar one

const BloodTestComponent = ({isConnected}) => {
  const carouselItems = [
    {
      text: 'Lumiio 기기의 전원을 연결하고, 스위치를 켜면 동그란 버튼에 전원이 표시됩니다.',
    },
    {
      text: '혈액분석이 시작되면서 진행율이 표시됩니다. 진행율이 100%가 되었을 때 혈액검사결과를 연동하세요.',
    },
  ];

  const renderCarouselItem = ({item}) => (
    <View style={styles.slide}>
      <Text style={styles.text}>{item.text}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {isConnected ? (
        <Carousel
          data={carouselItems}
          renderItem={renderCarouselItem}
          sliderWidth={300}
          itemWidth={300}
          loop={true}
        />
      ) : (
        <></>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  fullImage: {
    width: '100%',
    height: '100%',
    marginBottom: 20,
    resizeMode: 'contain',
  },
  carouselImage: {
    width: '100%',
    height: '70%',
  },
  text: {
    fontSize: 16,
    color: '#3C5A99',
    textAlign: 'center',
    height: '30%',
  },
  button: {
    padding: 10,
    backgroundColor: '#4267B2',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  slide: {
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    height: '100%',
    width: '100%',
    padding: 20,
    marginLeft: 0,
    marginRight: 0,
  },
});

export default BloodTestComponent;
