import React, {useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Animated,
  useWindowDimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';

const MainLandingScreen = ({navigation}) => {
  const {width, height} = useWindowDimensions();
  const scrollX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const scrollInterval = setInterval(() => {
      let currentScrollPosition = 0;
      scrollX.addListener(({value}) => {
        currentScrollPosition = value;
      });

      const cardWidth = width * 0.75 + 15; // Card width plus marginRight
      const maxScroll = cardWidth * 2; // Total scrollable width

      if (currentScrollPosition >= maxScroll) {
        scrollX.setValue(0);
      } else {
        Animated.timing(scrollX, {
          toValue: currentScrollPosition + cardWidth,
          duration: 500,
          useNativeDriver: true,
        }).start();
      }
    }, 3000);

    return () => clearInterval(scrollInterval);
  }, [scrollX, width]);

  return (
    <ScrollView style={styles.container}>
      {/* Welcome Message */}
      <View style={styles.welcomeContainer}>
        <Text style={styles.welcomeText}>서전초이님, 반가워요!</Text>
        <Text style={styles.subText}>당신의 탈모고민 끝날때까지</Text>
      </View>

      {/* Blue Background Container */}
      <LinearGradient
        colors={['#003DA5', '#001E4F']} // Darker gradient for more contrast
        style={styles.blueBackground}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}>
        {/* Image Container */}
        <View style={styles.imageContainer}>
          <View style={styles.beforeAfterContainer}>
            <Image
              source={require('../../static/imgs/hair_before.png')}
              style={[
                styles.hairImage,
                {width: width * 0.43, height: height * 0.22},
              ]}
              resizeMode="contain"
            />
            <View style={{width: 10}} />
            <Image
              source={require('../../static/imgs/hair_after.png')}
              style={[
                styles.hairImage,
                {width: width * 0.43, height: height * 0.22},
              ]}
              resizeMode="contain"
            />
          </View>
          <Text style={styles.ctaText}>달라진 나의 모습이 궁금하다면?</Text>
          <View style={styles.separatorLine} />
          <Text style={styles.descriptionText}>
            가상이식으로 이식 디자인 구현부터{'\n'}
            예상 견적산출까지 한번에
          </Text>
        </View>

        {/* Review Section - Horizontal Scroll */}
        <Animated.ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.reviewContainer}
          contentContainerStyle={{paddingHorizontal: 20}}
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {x: scrollX}}}],
            {useNativeDriver: false},
          )}>
          <View style={[styles.reviewCard, {width: width * 0.75}]}>
            <Icon name="person-circle-outline" size={40} color="#003DA5" />
            <Text style={styles.reviewText}>
              모발이식하면 효과가 드라마틱하다고 해서 궁금했는데 이식 후 예상
              모습을 바로 볼 수 있어서 좋았어요.
            </Text>
            <Text style={styles.userInfoText}>
              M자 탈모가 심한 30대 회사원 K씨
            </Text>
          </View>

          <View style={[styles.reviewCard, {width: width * 0.75}]}>
            <Icon name="person-circle-outline" size={40} color="#003DA5" />
            <Text style={styles.reviewText}>
              회사 연차 내고 상담받으러 병원 갈 생각에 엄두가 안났는데 탈모엔딩
              앱 하나로 해결할 수 있어서 좋았어요.
            </Text>
            <Text style={styles.userInfoText}>
              탈모약으로 효과를 못 본 40대 가장 H씨
            </Text>
          </View>

          <View style={[styles.reviewCard, {width: width * 0.75}]}>
            <Icon name="person-circle-outline" size={40} color="#003DA5" />
            <Text style={styles.reviewText}>
              병원마다 모발이식 비용 차이가 너무 커서 혼란스러웠는데 한눈에
              비교할 수 있어서 꼭 써보세요.
            </Text>
            <Text style={styles.userInfoText}>
              스트레스로 탈모가 심해진 20대 사회초년생 J씨
            </Text>
          </View>
        </Animated.ScrollView>
      </LinearGradient>

      {/* Call-to-Action Button */}
      <TouchableOpacity style={styles.ctaButton}>
        <Text style={styles.ctaButtonText}>늦기전에 바로시작 →</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  welcomeContainer: {
    marginTop: 20,
    marginLeft: 20,
  },
  welcomeText: {
    fontSize: 24,
    fontFamily: 'SCDream9',
    color: '#333',
  },
  subText: {
    fontSize: 16,
    fontFamily: 'SCDream5',
    color: '#333',
    marginTop: 5,
  },
  blueBackground: {
    width: '100%',
    paddingVertical: 30,
    paddingHorizontal: 20,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 10},
    shadowOpacity: 0.5, // More noticeable shadow
    shadowRadius: 10,
    elevation: 10,
    paddingBottom: 20,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  beforeAfterContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%', // Adjusted width
  },
  hairImage: {
    borderRadius: 15,
    borderWidth: 2, // Thin white border
    borderColor: '#FFFFFF',
  },
  ctaText: {
    fontSize: 16,
    fontFamily: 'SCDream5',
    color: '#FFFFFF',
    marginTop: 10,
    textAlign: 'center',
  },
  separatorLine: {
    borderBottomColor: '#FFFFFF',
    borderBottomWidth: 1,
    width: '80%',
    alignSelf: 'center',
    marginVertical: 10,
  },
  descriptionText: {
    fontSize: 14,
    fontFamily: 'SCDream5',
    color: '#FFFFFF',
    marginTop: 5,
    textAlign: 'center',
  },
  reviewContainer: {
    marginTop: 5, // Moved review section upwards
    marginHorizontal: 10,
  },
  reviewCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 20,
    marginRight: 15,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.4, // More noticeable shadow
    shadowRadius: 10,
    elevation: 5,
  },
  reviewText: {
    fontSize: 14,
    fontFamily: 'SCDream5',
    color: '#333',
    marginTop: 10,
  },
  userInfoText: {
    fontSize: 12,
    fontFamily: 'SCDream3',
    color: '#999',
    marginTop: 10,
  },
  ctaButton: {
    backgroundColor: '#003DA5',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginVertical: 20,
    marginHorizontal: 20,
    marginBottom: 80, // Shift the button further upwards
  },
  ctaButtonText: {
    fontSize: 18,
    fontFamily: 'SCDream9',
    color: '#FFFFFF',
  },
});

export default MainLandingScreen;
