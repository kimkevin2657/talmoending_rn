import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

const MainLandingScreen = () => {
  return (
    <ScrollView style={styles.container}>
      {/* Top section with the text */}
      <View style={styles.topSection}>
        <Text style={styles.mainText}>
          <Text style={styles.boldText}>서전초이</Text>님, 반가워요!
        </Text>
        <Text style={styles.largerText}>당신의 탈모고민 끝날때까지</Text>
      </View>

      {/* Blue container section */}
      <View style={styles.blueContainer}>
        {/* Image Section: Two images side by side */}
        <View style={styles.imageRow}>
          {/* Text on top of the images, brought to the front using zIndex */}
          <Text style={styles.imageTitle}>모발이식 후</Text>
          <Text style={styles.imageSubTitle}>
            달라진 나의 모습이 궁금하다면?
          </Text>
          <Image
            source={require('../../static/imgs/hair_before.png')}
            style={styles.hairTransplantImage}
          />
          <Image
            source={require('../../static/imgs/hair_after.png')}
            style={styles.hairTransplantImage}
          />
        </View>

        {/* Simulation Text */}
        <Text style={styles.simulationText}>
          가상이식으로 이식 디자인 구현부터{'\n'}예상 견적산출까지 한번에
        </Text>

        {/* Horizontal Testimonial Section */}
        <ScrollView
          horizontal
          style={styles.testimonialSection}
          showsHorizontalScrollIndicator={false}>
          <View style={styles.testimonialBox}>
            <Text style={styles.quoteMark}>“</Text>
            <Text style={styles.testimonialQuote}>
              모발이식하면 효과가 드라마틱하다고 해서 궁금했는데{'\n'}
              이식 후의 내 모습을 바로 볼 수 있어서 좋았어요.
            </Text>
            <View style={styles.profileSection}>
              <Image
                source={require('../../static/imgs/profile_icon.png')}
                style={styles.profileIcon}
              />
              <Text style={styles.reviewerInfo}>
                M자 탈모가 심한 30대 회사원 K씨
              </Text>
            </View>
          </View>
          <View style={styles.testimonialBox}>
            <Text style={styles.quoteMark}>“</Text>
            <Text style={styles.testimonialQuote}>
              회사 여자 대고 상담받으러 병원 갈 생각에 어색했는데{'\n'}
              탈모인이 모여 하나로 해결할 수 있어서 좋았어요.
            </Text>
            <View style={styles.profileSection}>
              <Image
                source={require('../../static/imgs/profile_icon.png')}
                style={styles.profileIcon}
              />
              <Text style={styles.reviewerInfo}>
                탈모로 고민 중인 40대 직장인 S씨
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>

      {/* Bottom Button */}
      <TouchableOpacity style={styles.startButton}>
        <Text style={styles.startButtonText}>늦기전에 바로시작</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  topSection: {
    marginVertical: 10,
    paddingHorizontal: 20, // Align flush with the blue container
  },
  mainText: {
    fontSize: 16,
    color: '#000', // Changed to black
    textAlign: 'left',
    marginBottom: 5,
  },
  boldText: {
    fontSize: 20, // Slightly larger for "서전초이"
    fontWeight: 'bold',
  },
  largerText: {
    fontSize: 18, // Larger for "당신의 탈모고민 끝날때까지"
    color: '#000',
    textAlign: 'left',
  },
  blueContainer: {
    backgroundColor: '#003DA5', // Dark blue background color
    borderRadius: 15,
    padding: 20,
    margin: 20,
    alignItems: 'center',
  },
  imageRow: {
    flexDirection: 'row',
    position: 'relative',
  },
  imageTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    position: 'absolute', // Absolute positioning on top of images
    top: 10,
    left: '60%',
    transform: [{translateX: -80}],
    zIndex: 1, // Bring text to the front
  },
  imageSubTitle: {
    fontSize: 18,
    color: '#fff',
    position: 'absolute',
    top: 35,
    left: '50%',
    transform: [{translateX: -110}],
    zIndex: 1, // Bring text to the front
  },
  hairTransplantImage: {
    width: 160,
    height: 160,
    resizeMode: 'contain',
    marginLeft: 0, // No gap between the images
  },
  simulationText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#fff',
    marginTop: 10,
  },
  testimonialSection: {
    marginVertical: 20,
  },
  testimonialBox: {
    backgroundColor: '#F0F0F0',
    padding: 20,
    borderRadius: 10,
    marginHorizontal: 10,
    width: 220, // Narrower width
    height: 220, // Taller height
    justifyContent: 'center', // Center content vertically
  },
  quoteMark: {
    fontSize: 36,
    position: 'absolute',
    top: 10,
    left: 15,
    color: '#333',
  },
  testimonialQuote: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
    textAlign: 'center',
    padding: 10, // Add padding to center text more
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', // Center the profile section horizontally
    marginTop: 10,
    paddingHorizontal: 10, // Make the profile section narrower
  },
  profileIcon: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  reviewerInfo: {
    fontSize: 12,
    color: '#333',
    flexWrap: 'wrap', // Ensure the text wraps correctly
    maxWidth: 100, // Limit width so it wraps
  },
  startButton: {
    backgroundColor: '#ffffff',
    paddingVertical: 10,
    paddingHorizontal: 40,
    alignSelf: 'center',
    borderRadius: 30,
    borderColor: '#D0D0D0',
    borderWidth: 1,
    marginVertical: 20,
  },
  startButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default MainLandingScreen;
