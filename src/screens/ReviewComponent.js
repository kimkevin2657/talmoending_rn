import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  FlatList,
  Text,
  Image,
} from 'react-native';

// Get screen dimensions
const {width: screenWidth} = Dimensions.get('window');

// Calculate the total review section width (94.77726% of screen width)
const reviewSectionWidth = screenWidth * 0.92;

// Calculate the card width (36.5963% of screen width)
const cardWidth = screenWidth * 0.365963;
// Calculate the gap between each card (2.4096% of screen width)
const cardGap = screenWidth * 0.024096;

// Calculate total item width (card width + gap)
const totalItemWidth = cardWidth + cardGap;

// Sample review data
const reviews = [
  {
    text: '모발이식하면 효과가 드라마틱하다고 해서 궁금했는데 이식 후 예상 모습을 바로 볼 수 있어서 강추합니다',
    avatar: require('../../static/imgs/profile_icon.png'),
    name: 'M자 탈모가 심한 30대 회사원 K씨',
  },
  {
    text: '회사 연차 내고 상담받으러 병원 갈 생각에 엄두가 안났는데 탈모엔딩 앱 하나로 해결할 수 있어서 좋았어요',
    avatar: require('../../static/imgs/profile_icon.png'),
    name: '탈모약 효과를 못본 40대 가장 H씨',
  },
  {
    text: '참여해주셔서 감사해요',
    avatar: require('../../static/imgs/profile_icon.png'),
    name: '다른 사용자',
  },
];

// Carousel Component using FlatList for Infinite Scroll
export default function ReviewComponent() {
  const [dataState, setDataState] = useState([
    ...reviews,
    ...reviews,
    ...reviews,
    ...reviews,
    ...reviews,
    ...reviews,
  ]); // Duplicate data for infinite effect
  const sliderRef = useRef(null);
  const intervalRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Autoplay effect
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrentIndex(prevIndex => {
        const nextIndex = prevIndex + 1;
        return nextIndex;
      });
    }, 4000); // Every 4 seconds

    return () => {
      clearInterval(intervalRef.current);
    };
  }, []);

  // Scroll to current index
  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.scrollToIndex({
        index: currentIndex % dataState.length,
        animated: true,
      });
    }
  }, [currentIndex, dataState.length]);

  // Render each card
  const _renderItem = ({item}) => {
    return (
      <View style={[styles.card, {marginHorizontal: cardGap / 2}]}>
        {/* quotation mark area */}
        <View
          style={{
            height: '12%',
            width: '100%',
            justifyContent: 'flex-start',
          }}>
          <Text
            style={{
              fontSize: 30,
            }}>
            "
          </Text>
        </View>
        {/* review text area */}
        <View
          style={{
            width: '90%',
            height: '70%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontSize: 11,
              textAlignVertical: 'center',
              fontFamily: 'MICEGothicOTF',
            }}
            adjustsFontSizeToFit={false}>
            {item.text}
          </Text>
        </View>
        {/* bottom profile icon and user name area */}
        <View
          style={{
            width: '120%',
            height: '30%',
            flexDirection: 'row',
          }}>
          {/* profile icon area */}
          <View
            style={{
              width: '30%',
              height: '100%',
            }}>
            <Image
              source={item.avatar}
              style={{
                height: '100%',
                width: '100%',
                zIndex: 1,
              }}
              resizeMode="contain"
            />
          </View>
          {/* user profile name area */}
          <View
            style={{
              width: '70%',
              height: '100%',
              alignItems: 'flex-start',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                fontSize: 10,
                textAlignVertical: 'center',
                fontFamily: 'MICEGothicOTF',
              }}
              adjustsFontSizeToFit={false}>
              {item.name}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  // Infinite scroll logic by appending more data dynamically
  const handleScrollEnd = () => {
    if (currentIndex >= dataState.length - reviews.length) {
      setDataState(prevData => [...prevData, ...reviews]); // Append original data
    }
  };

  return (
    <View style={[styles.container, {width: reviewSectionWidth}]}>
      <FlatList
        ref={sliderRef}
        data={dataState}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        snapToInterval={totalItemWidth} // Card width + gap
        decelerationRate="fast"
        renderItem={_renderItem}
        keyExtractor={(item, index) => `carousel-item-${index}`}
        onScrollToIndexFailed={() => {}}
        onMomentumScrollEnd={handleScrollEnd}
        getItemLayout={(data, index) => ({
          length: totalItemWidth,
          offset: totalItemWidth * index,
          index,
        })}
      />
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', // Center the carousel vertically
    alignItems: 'center', // Center the carousel horizontally
    backgroundColor: '#003DA5', // For testing purposes
  },
  card: {
    backgroundColor: 'white', // White background for the review cards
    borderRadius: 20, // Rounded corners
    width: cardWidth, // Full width of each card
    height: '100%', // Full height of the carousel section
    padding: 20,
    // justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
});
