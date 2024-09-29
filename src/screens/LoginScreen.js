/* eslint-disable react-native/no-inline-styles */
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

const {width: screenWidth, height: screenHeight} = Dimensions.get('window');

const LoginScreen = ({navigation}) => {
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
          flexDirection: 'column',
          alignItems: 'center',
        }}>
        {/* empty space - right above the logo */}
        <View style={{width: '100%', height: screenHeight * (101 / 1421)}} />
        {/* logo section */}
        <View
          style={{
            width: '100%',
            height: '6.333%',
            alignItems: 'flex-start',
            justifyContent: 'center',
          }}>
          {/* logo image */}
          <Image
            source={require('../../static/imgs/logo_symbol.png')}
            style={{
              height: '120%',
              width: '20%',
              marginLeft: '3.645%',
            }}
            resizeMode="contain"
          />
        </View>
        {/* empty space - right underneath the logo */}
        <View style={{width: '100%', height: screenHeight * (50 / 1421)}} />
        {/* blue container section itself */}
        <View
          style={{
            width: '100%',
            height: screenHeight * (622 / 1421),
            backgroundColor: '#003DA5',
            borderTopLeftRadius: 35,
            borderTopRightRadius: 35,
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
            flexDirection: 'row',
          }}>
          {/* empty space - far left side of the blue container */}
          <View style={{height: '100%', width: '3.94944705%'}} />
          {/* inside main blue container */}
          <View
            style={{
              height: '100%',
              width: '92.10110585%',
              flexDirection: 'column',
            }}>
            {/* empty space - right above the slogan text area */}
            <View style={{width: '100%', height: '19.26163724%'}} />
            {/* slogan text area */}
            <View
              style={{
                width: '100%',
                height: '24.07704655%',
                flexDirection: 'column',
              }}>
              <View
                style={{
                  flex: 1,
                  alignItems: 'flex-start',
                  marginLeft: '3.6144%',
                }}>
                <Text
                  style={{
                    color: '#F5F5F5',
                    fontSize: 50,
                    textAlignVertical: 'center',
                    fontFamily: 'MICEGothicOTFBold',
                  }}
                  numberOfLines={1}
                  adjustsFontSizeToFit>
                  당신의
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  alignItems: 'flex-start',
                  marginLeft: '3.6144%',
                }}>
                <Text
                  style={{
                    color: '#F5F5F5',
                    fontSize: 50,
                    textAlignVertical: 'center',
                    fontFamily: 'MICEGothicOTFBold',
                  }}
                  numberOfLines={1}
                  adjustsFontSizeToFit>
                  탈모고민
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  alignItems: 'flex-start',
                  marginLeft: '3.6144%',
                }}>
                <Text
                  style={{
                    color: '#F5F5F5',
                    fontSize: 50,
                    textAlignVertical: 'center',
                    fontFamily: 'MICEGothicOTFBold',
                  }}
                  numberOfLines={1}
                  adjustsFontSizeToFit>
                  끝날때까지
                </Text>
              </View>
            </View>
            {/* empty space - right underneath the slogan text area */}
            <View style={{width: '100%', height: '4.3548%'}} />
            {/* kakao login area */}
            <View
              style={{
                width: '100%',
                height: '18.7096%',
                backgroundColor: '#F5F5F5',
                justifyContent: 'center',
                alignItems: 'center',
                borderTopLeftRadius: 35,
                borderTopRightRadius: 35,
                borderBottomLeftRadius: 35,
                borderBottomRightRadius: 35,
              }}>
              <View
                style={{
                  position: 'absolute',
                  height: '75%',
                  width: '15%',
                  // backgroundColor: 'red',
                  left: '2%',
                  alignItems: 'flex-start',
                }}>
                <Image
                  source={require('../../static/icons/kakao_login.png')}
                  style={{
                    height: '100%',
                    width: '100%',
                  }}
                  resizeMode="contain"
                />
              </View>
              <View
                style={{
                  height: '40.513%',
                  width: '100%',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    color: '#2E2E2E',
                    fontSize: 200,
                    textAlignVertical: 'center',
                    fontFamily: 'MICEGothicOTF',
                  }}
                  numberOfLines={1}
                  adjustsFontSizeToFit>
                  카카오톡으로 로그인
                </Text>
              </View>
            </View>
            {/* empty space - right underneath kakao login button */}
            <View style={{width: '100%', height: '3.8709%'}} />
            {/* naver login area */}
            <View
              style={{
                width: '100%',
                height: '18.7096%',
                backgroundColor: '#F5F5F5',
                justifyContent: 'center',
                alignItems: 'center',
                borderTopLeftRadius: 35,
                borderTopRightRadius: 35,
                borderBottomLeftRadius: 35,
                borderBottomRightRadius: 35,
              }}>
              <View
                style={{
                  position: 'absolute',
                  height: '75%',
                  width: '15%',
                  // backgroundColor: 'red',
                  left: '2%',
                  alignItems: 'flex-start',
                }}>
                <Image
                  source={require('../../static/icons/naver_login.png')}
                  style={{
                    height: '100%',
                    width: '100%',
                  }}
                  resizeMode="contain"
                />
              </View>
              <View
                style={{
                  height: '40.513%',
                  width: '100%',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    color: '#2E2E2E',
                    fontSize: 200,
                    textAlignVertical: 'center',
                    fontFamily: 'MICEGothicOTF',
                  }}
                  numberOfLines={1}
                  adjustsFontSizeToFit>
                  네이버로 로그인
                </Text>
              </View>
            </View>
          </View>
        </View>
        {/* empty space - right underneath the entire blue container section */}
        <View style={{height: '8.304%', width: '100%'}} />
        {/* alternative login method text */}
        <View
          style={{
            width: '100%',
            height: '2%',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              color: '#2E2E2E',
              fontSize: 40,
              textAlignVertical: 'center',
              fontFamily: 'MICEGothicOTF',
            }}
            numberOfLines={1}
            adjustsFontSizeToFit>
            다른 방법으로 로그인
          </Text>
        </View>
        {/* empty space - right underneath the alternatie login text */}
        <View style={{height: '2%', width: '100%'}} />
        {/* alternative login icons */}
        <View
          style={{
            width: '50%',
            height: '6.333%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          {/* apple login image */}
          <Image
            source={require('../../static/icons/apple_login.png')}
            style={{
              height: screenHeight * (86 / 1421),
              width: screenHeight * (86 / 1421),
            }}
            resizeMode="contain"
          />
          {/* google login image */}
          <Image
            source={require('../../static/icons/google_login.png')}
            style={{
              height: screenHeight * (86 / 1421),
              width: screenHeight * (86 / 1421),
            }}
            resizeMode="contain"
          />
          {/* email login image */}
          <Image
            source={require('../../static/icons/email_login.png')}
            style={{
              height: screenHeight * (86 / 1421),
              width: screenHeight * (86 / 1421),
            }}
            resizeMode="contain"
          />
        </View>
        {/* empty space - right underneath alternative login icons */}
        <View style={{height: '13.793%', width: '100%'}} />
        <View
          style={{
            width: '100%',
            height: '2%',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              color: '#2E2E2E',
              fontSize: 40,
              textAlignVertical: 'center',
              fontFamily: 'MICEGothicOTF',
              textDecorationLine: 'underline',
            }}
            numberOfLines={1}
            adjustsFontSizeToFit>
            가입한 계정을 잊으셨다면?
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

export default LoginScreen;
