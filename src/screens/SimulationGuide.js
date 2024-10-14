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

const SimulationGuide = ({navigation}) => {
  // Proportional scaling based on the design width assumed to be 375px
  const designWidth = 375;
  const scaleFontSize = size => (size / designWidth) * screenWidth;

  return (
    <View style={styles.container}>
      <View style={{width: '3.609%', height: '100%'}} />
      {/* main container area */}
      <View style={{width: '92.782%', height: '100%', flexDirection: 'column'}}>
        {/* empty space */}
        <View style={{height: '5.76%', width: '100%'}} />
        {/* top 가상이식 and home button area */}
        <View
          style={{
            height: '3.75%',
            width: '100%',
            alignItems: 'flex-end',
          }}>
          <Text
            style={{
              color: '#9E9E9E',
              fontSize: 20,
              textAlignVertical: 'center',
              fontFamily: 'MICEGothicOTFBold',
              position: 'absolute',
              left: '6.9%',
            }}
            numberOfLines={1}
            adjustsFontSizeToFit>
            가상이식
          </Text>
          <Image
            source={require('../../static/icons/home_active.png')}
            style={{
              height: '150%',
              width: screenHeight * 0.1,
              zIndex: 1,
              top: '-40%',
            }}
            resizeMode="contain"
          />
        </View>
        {/* empty space */}
        <View style={{height: '4.861%', width: '100%'}} />
        {/* image guidelines blue container for image guidelines */}
        <View
          style={{
            height: '42.916%',
            width: '100%',
            backgroundColor: '#F5F5F5',
            flexDirection: 'column',
            borderWidth: 8,
            borderColor: '#003DA5',
            borderRadius: 12,
          }}>
          {/* empty space */}
          <View style={{height: '5.2%', width: '100%'}} />
          {/* 촬영 가이드 text area */}
          <View
            style={{
              height: '10%',
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: '#959E9E',
                fontSize: 27,
                textAlignVertical: 'center',
                fontFamily: 'MICEGothicOTFBold',
              }}
              numberOfLines={1}
              adjustsFontSizeToFit>
              촬영 가이드
            </Text>
          </View>
          {/* empty space */}
          <View style={{height: '4.5%', width: '100%'}} />
          {/* X and O image section */}
          <View
            style={{
              height: '75.2%',
              width: '100%',
              flexDirection: 'row',
              alignItems: 'flex-end',
              justifyContent: 'space-evenly',
            }}>
            <View
              style={{
                width: '38.4%',
                height: '93.8%',
              }}>
              <Image
                source={require('../../static/imgs/image_guideline_x.png')}
                style={{
                  height: '100%',
                  width: '100%',
                  zIndex: 1,
                }}
                resizeMode="contain"
              />
            </View>
            <View
              style={{
                width: 3,
                height: '100%',
                backgroundColor: '#959E9E',
                borderRadius: 10,
              }}
            />
            <View
              style={{
                width: '38.4%',
                height: '93.8%',
              }}>
              <Image
                source={require('../../static/imgs/image_guideline_o.png')}
                style={{
                  height: '100%',
                  width: '100%',
                  zIndex: 1,
                }}
                resizeMode="contain"
              />
            </View>
          </View>
          {/* empty space */}
          <View style={{height: '4.1%', width: '100%'}} />
        </View>
        {/* empty space */}
        <View style={{height: '5.6%', width: '100%'}} />
        {/* text guidelines blue container for text guidelines */}
        <View
          style={{
            height: '37.569%',
            width: '100%',
            backgroundColor: '#003DA5',
            flexDirection: 'column',
            alignItems: 'center',
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
          }}>
          {/* empty space */}
          <View style={{height: '7.58%', width: '100%'}} />
          {/* 정면 NO text area */}
          <View
            style={{
              height: '9.61%',
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: '#F5F5F5',
                fontSize: 150,
                textAlignVertical: 'center',
                fontFamily: 'MICEGothicOTFBold',
              }}
              numberOfLines={1}
              adjustsFontSizeToFit>
              정면 NO
            </Text>
          </View>
          {/* empty space */}
          <View style={{height: '2.77%', width: '100%'}} />
          {/* 정확한 가상이식 이미지를 */}
          <View
            style={{
              height: '7.2%',
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: '#F5F5F5',
                fontSize: 60,
                textAlignVertical: 'center',
                fontFamily: 'MICEGothicOTF',
              }}
              numberOfLines={1}
              adjustsFontSizeToFit>
              정확한 가상이식 이미지를
            </Text>
          </View>
          {/* 만들기 위해 */}
          <View
            style={{
              height: '7.2%',
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: '#F5F5F5',
                fontSize: 60,
                textAlignVertical: 'center',
                fontFamily: 'MICEGothicOTF',
              }}
              numberOfLines={1}
              adjustsFontSizeToFit>
              만들기 위해
            </Text>
          </View>
          {/* empty space */}
          <View style={{height: '2.77%', width: '100%'}} />
          {/* 이마가 잘 보이도록 */}
          <View
            style={{
              height: '8%',
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: '#F5F5F5',
                fontSize: 80,
                textAlignVertical: 'center',
                fontFamily: 'MICEGothicOTF',
              }}
              numberOfLines={1}
              adjustsFontSizeToFit>
              이마가 잘 보이도록
            </Text>
          </View>
          {/* 고개를 살짝 숙여 */}
          <View
            style={{
              height: '8.8%',
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: '#F5F5F5',
                fontSize: 100,
                textAlignVertical: 'center',
                fontFamily: 'MICEGothicOTF',
              }}
              numberOfLines={1}
              adjustsFontSizeToFit>
              고개를 살짝 숙여
            </Text>
          </View>
          {/* 촬영해주세요 */}
          <View
            style={{
              height: '8.8%',
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: '#F5F5F5',
                fontSize: 100,
                textAlignVertical: 'center',
                fontFamily: 'MICEGothicOTF',
              }}
              numberOfLines={1}
              adjustsFontSizeToFit>
              촬영해주세요
            </Text>
          </View>
          {/* empty space */}
          <View style={{height: '4%', width: '100%'}} />
          {/* 사진 촬영 버튼 */}
          <View
            style={{
              height: '15.8%',
              width: '70%',
              // backgroundColor: '#F5F5F5',
              backgroundColor: 'white',
              borderRadius: 30,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View
              style={{
                height: '50%',
                width: '70%',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: '#2E2E2E',
                  fontSize: 60,
                  textAlignVertical: 'center',
                  fontFamily: 'MICEGothicOTFBold',
                }}
                numberOfLines={1}
                adjustsFontSizeToFit>
                사 진 촬 영
              </Text>
            </View>
            <View
              style={{
                position: 'absolute',
                height: '90%',
                width: '20%',
                justifyContent: 'center',
                alignItems: 'center',
                right: '10%',
              }}>
              <Image
                source={require('../../static/imgs/take_photo.png')}
                style={{
                  height: '100%',
                  width: '100%',
                  zIndex: 1,
                }}
                resizeMode="contain"
              />
            </View>
          </View>
        </View>
      </View>
      <View style={{width: '3.609%', height: '100%'}} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#F5F5F5',
  },
});

export default SimulationGuide;
