import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  useWindowDimensions,
  Dimensions,
} from 'react-native';
import ReviewComponent from './ReviewComponent';

const {width: screenWidth, height: screenHeight} = Dimensions.get('window');

const MainLandingScreen = ({navigation}) => {
  // Proportional scaling based on the design width assumed to be 375px
  const designWidth = 375;
  const scaleFontSize = size => (size / designWidth) * screenWidth;

  return (
    <View style={styles.container}>
      {/* empty space - on the far left side of the screen */}
      <View style={{width: screenWidth * 0.024, height: screenHeight}} />
      {/* main container */}
      <View
        style={{
          width: screenWidth * 0.952,
          height: screenHeight,
          alignItems: 'center',
        }}>
        {/* empty space - right above the username and slogan text */}
        <View style={{width: '100%', height: '9.1666%'}} />
        {/* username text and slogan text area */}
        <View
          style={{
            width: '100%',
            height: '6.5972%',
            flexDirection: 'column',
            alignItems: 'flex-start',
          }}>
          <View
            style={{
              width: '100%',
              height: '46%',
              flexDirection: 'row',
              marginLeft: '8.22%',
            }}>
            <Text
              style={{
                color: '#2E2E2E',
                fontSize: 50,
                textAlignVertical: 'center',
                fontFamily: 'MICEGothicOTFBold',
              }}
              numberOfLines={1}
              adjustsFontSizeToFit>
              서전초이
            </Text>
            <Text
              style={{
                color: '#2E2E2E',
                fontSize: 18,
                textAlignVertical: 'center',
                fontFamily: 'MICEGothicOTFBold',
              }}
              numberOfLines={1}>
              님, 반가워요!
            </Text>
          </View>
          <View
            style={{
              width: '100%',
              height: '54%',
              justifyContent: 'row',
              marginLeft: '8.22%',
            }}>
            <Text
              style={{
                color: '#2E2E2E',
                fontSize: 120,
                textAlignVertical: 'center',
                fontFamily: 'MICEGothicOTF',
              }}
              numberOfLines={1}
              adjustsFontSizeToFit>
              당신의 탈모고민 끝날때까지
            </Text>
          </View>
        </View>
        {/* empty space - right above main blue container */}
        <View style={{width: '100%', height: '3.125%'}} />
        {/* blue container itself */}
        <View
          style={{
            width: '100%',
            height: '59.236%',
            backgroundColor: '#003DA5',
            borderTopLeftRadius: 35,
            borderTopRightRadius: 35,
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
            flexDirection: 'column',
            alignItems: 'center',
          }}>
          {/* empty space - right above before and after images inside the blue container */}
          <View style={{width: '100%', height: '6.1104%'}} />
          {/* before and after image section */}
          <View
            style={{
              width: '76.7405%',
              height: '38.19%',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            {/* slogan text on top of the before and after images */}
            <View
              style={{
                position: 'absolute',
                width: '100%',
                height: '30.841%',
                top: 5,
                zIndex: 2,
              }}>
              <View
                style={{
                  width: '100%',
                  height: '60%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    color: '#F5F5F5',
                    fontSize: 20,
                    textAlignVertical: 'center',
                    fontFamily: 'MICEGothicOTFBold',
                  }}
                  numberOfLines={1}
                  adjustsFontSizeToFit>
                  모발이식 후
                </Text>
              </View>
              <View
                style={{
                  width: '100%',
                  height: '40%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    color: '#F5F5F5',
                    fontSize: 20,
                    textAlignVertical: 'center',
                    fontFamily: 'MICEGothicOTFBold',
                  }}
                  numberOfLines={1}
                  adjustsFontSizeToFit>
                  달라진 나의 모습이 궁금하다면?
                </Text>
              </View>
            </View>
            <Image
              source={require('../../static/imgs/hair_before.png')}
              style={{
                height: '100%',
                width: '50%',
                zIndex: 1,
              }}
              resizeMode="cover"
            />
            <Image
              source={require('../../static/imgs/hair_after.png')}
              style={{
                height: '100%',
                width: '50%',
                zIndex: 1,
              }}
              resizeMode="cover"
            />
          </View>
          {/* empty space - right underneath before and after images inside the blue container */}
          <View style={{width: '100%', height: '1.411%'}} />
          {/* instructional text right underneath before and after images inside the blue container */}
          <View
            style={{
              width: '100%',
              height: '8.223%',
              flexDirection: 'column',
            }}>
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Text
                style={{
                  color: '#F5F5F5',
                  fontSize: 20,
                  textAlignVertical: 'center',
                  fontFamily: 'MICEGothicOTF',
                }}
                numberOfLines={1}
                adjustsFontSizeToFit>
                가상이식으로 이식 디자인 구현부터
              </Text>
            </View>
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Text
                style={{
                  color: '#F5F5F5',
                  fontSize: 20,
                  textAlignVertical: 'center',
                  fontFamily: 'MICEGothicOTF',
                }}
                numberOfLines={1}
                adjustsFontSizeToFit>
                예상 견적산출까지 한번에
              </Text>
            </View>
          </View>
          {/* empty space - right above the review carousel section inside the blue container */}
          <View style={{width: '100%', height: '4.4705%'}} />
          {/* review section carousel section */}
          <View
            style={{
              width: '93.3545%',
              // width: '100%',
              height: '37.7647%',
              backgroundColor: 'yellow',
              // marginLeft: '6.6455%',
            }}>
            <ReviewComponent />
          </View>
        </View>
        {/* empty space - right underneath the blue container */}
        <View style={{width: '100%', height: '1.411%'}} />
        {/* start simulation button */}
        <View
          style={{
            width: '85%',
            height: '8%',
            borderRadius: 35,
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 2,
            borderColor: '#2E2E2E',
          }}>
          <Text
            style={{
              color: '#2E2E2E',
              fontSize: 20,
              textAlignVertical: 'center',
              fontFamily: 'MICEGothicOTFBold',
            }}
            numberOfLines={1}
            adjustsFontSizeToFit>
            늦기전에 바로시작 →
          </Text>
        </View>
      </View>
      {/* empty space - far right of the entire screen */}
      <View style={{width: screenWidth * 0.024, height: screenHeight}} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5', // Overall background color
    flexDirection: 'row',
  },
  logoContainer: {
    alignItems: 'flex-start',
    marginTop: 40,
    paddingLeft: 20,
  },
  logoSymbol: {
    // Dynamic sizing based on screen width
  },
  blueContainer: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    alignSelf: 'center',
    backgroundColor: '#003DA5',
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  slogan: {
    fontFamily: 'MICEGothicOTFBold',
    color: '#FFFFFF',
  },
  loginButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', // Center text within the button
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginBottom: 10,
  },
  loginIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  loginText: {
    fontFamily: 'MICEGothicOTFBold',
    flex: 1,
  },
  separatorLine: {
    borderBottomColor: '#E0E0E0',
    borderBottomWidth: 1,
    marginVertical: 20,
    marginHorizontal: 30,
  },
  otherLoginContainer: {
    alignItems: 'center',
  },
  otherLoginText: {
    fontFamily: 'MICEGothicOTFBold',
    color: '#666666',
    marginBottom: 10,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '50%', // More clustered
  },
  iconButton: {
    padding: 10,
    backgroundColor: '#F5F5F5',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconLarge: {
    width: 40, // Larger icons
    height: 40,
  },
  forgotPasswordContainer: {
    alignItems: 'center',
  },
  forgotPasswordText: {
    fontFamily: 'MICEGothicOTF',
    color: '#999999',
    textDecorationLine: 'underline',
  },
});

export default MainLandingScreen;
