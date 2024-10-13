import React from 'react';
import {View, Image, StyleSheet, Dimensions, Text} from 'react-native';
import Carousel from 'react-native-snap-carousel';

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

// Carousel Component
export default function ReviewComponent() {
  // Render each carousel item
  const _renderItem = ({item}) => {
    return (
      <View style={[styles.card, {paddingRight: cardGap}]}>
        {/* Temporarily commented out content for simplicity */}
        {/* <Image
          source={item.avatar}
          style={styles.avatar}
          resizeMode="contain"
        />
        <Text style={styles.reviewText}>{item.text}</Text>
        <Text style={styles.name}>{item.name}</Text> */}
      </View>
    );
  };

  return (
    <View style={[styles.container, {width: reviewSectionWidth}]}>
      <Carousel
        data={reviews}
        renderItem={_renderItem}
        sliderWidth={reviewSectionWidth} // Total width of the review section
        itemWidth={totalItemWidth} // Width of each item (card width + gap)
        loop={true} // Enable infinite looping
        loopClonesPerSide={reviews.length} // Add enough clones to make looping smooth
        autoplay={true} // Automatically scroll
        autoplayDelay={1000} // Delay between scrolls
        autoplayInterval={4000} // Time interval between autoplay scrolls
        enableMomentum={false}
        lockScrollWhileSnapping={true} // Prevent multiple swipes at the same time
        inactiveSlideScale={1} // Disable scaling of inactive slides
        inactiveSlideOpacity={1} // Keep opacity of inactive slides constant
        containerCustomStyle={styles.carouselContainer} // Custom container for styling
        windowSize={10} // Set windowSize to avoid VirtualizedList error
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
    backgroundColor: 'red', // For testing purposes
  },
  carouselContainer: {
    width: '100%',
    height: '100%',
  },
  card: {
    backgroundColor: 'white', // White background for the review cards
    borderRadius: 20, // Rounded corners
    width: cardWidth, // Full width of each card
    height: '100%', // Full height of the carousel section
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: cardGap, // Add right padding to create visual gap
  },
});
