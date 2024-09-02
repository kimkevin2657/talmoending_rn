import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Animated,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const RegistrationAgreementScreen = () => {
  const navigation = useNavigation();
  const [agreements, setAgreements] = useState({
    allAgreed: false,
    ageConfirmation: false,
    termsOfService: false,
    privacyPolicy: false,
    thirdPartyInfo: false,
  });

  // Calculate if all specific agreements are true
  const allAgreed = Object.values(agreements).every(Boolean);

  const allSpecificAgreed = Object.entries(agreements)
    .filter(([key]) => key !== 'allAgreed') // Filter out the 'allAgreed'
    .every(([key, value]) => value); // Check if every other agreement is true

  // useEffect(() => {
  //   setAgreements(prev => ({
  //     ...prev,
  //     allAgreed: allAgreed,
  //     ageConfirmation: allAgreed,
  //     termsOfService: allAgreed,
  //     privacyPolicy: allAgreed,
  //     thirdPartyInfo: allAgreed,
  //   }));
  // }, [allAgreed]);

  // useEffect(() => {
  //   if (agreements.allAgreed) {
  //     const updatedAgreements = Object.fromEntries(
  //       Object.keys(agreements).map(key => [key, true]),
  //     );
  //     setAgreements(updatedAgreements);
  //   } else if (Object.values(agreements).every(value => value === true)) {
  //     // Check if all are true, then uncheck 'allAgreed' should make all false
  //     const updatedAgreements = Object.fromEntries(
  //       Object.keys(agreements).map(key => [key, false]),
  //     );
  //     setAgreements(updatedAgreements);
  //   }
  // }, [agreements.allAgreed]);

  useEffect(() => {
    // This will handle both setting all to true and all to false
    const updatedAgreements = Object.fromEntries(
      Object.keys(agreements).map(key => [key, agreements.allAgreed]),
    );
    setAgreements(updatedAgreements);
  }, [agreements.allAgreed]);

  const handleAgreementChange = (key, value) => {
    setAgreements(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  const opacityAnim = useRef(new Animated.Value(0.5)).current;
  useEffect(() => {
    Animated.timing(opacityAnim, {
      toValue: allSpecificAgreed ? 1 : 0.5,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [allSpecificAgreed]);

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.navigate('LoginScreen')}
            style={styles.backArrowContainer}>
            <Icon name="arrow-left" size={24} color="#3C5A99" />
          </TouchableOpacity>
          <Text style={styles.headerText}>회원가입</Text>
        </View>

        <View style={styles.agreements}>
          <View style={styles.agreementItem}>
            <CheckBox
              value={agreements.allAgreed}
              onValueChange={() =>
                handleAgreementChange('allAgreed', !agreements.allAgreed)
              }
              tintColors={{true: '#4267B2', false: 'gray'}}
            />
            <Text style={styles.agreementText}>전체 동의</Text>
          </View>
          <View style={styles.divider} />
          {Object.keys(agreements)
            .filter(key => key !== 'allAgreed')
            .map((key, index) => (
              <View key={index} style={styles.agreementItem}>
                <CheckBox
                  value={agreements[key]}
                  onValueChange={value => handleAgreementChange(key, value)}
                  tintColors={{true: '#4267B2', false: 'gray'}}
                />
                <Text style={styles.agreementText}>
                  {getAgreementText(key)}
                </Text>
                <View style={styles.divider} />
              </View>
            ))}
        </View>
      </ScrollView>
      <Animated.View style={[styles.nextButton, {opacity: opacityAnim}]}>
        <TouchableOpacity
          disabled={!allSpecificAgreed}
          onPress={() => navigation.navigate('RegistrationBasic')}
          style={styles.nextButtonTouchable}>
          <Text style={styles.nextButtonText}>다음</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const getAgreementText = key => {
  const texts = {
    ageConfirmation: '만 14세 이상입니다. (필수)',
    termsOfService: '이용약관 (필수)',
    privacyPolicy: '개인정보 수집 및 이용에 대한 동의 (필수)',
    thirdPartyInfo: '개인정보 취급 업무 위탁 동의 (필수)',
  };
  return texts[key];
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#FAFAFF',
  },
  backArrowContainer: {
    position: 'absolute',
    left: 20,
  },
  backArrow: {
    fontSize: 28,
    color: '#3C5A99',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#3C5A99',
  },
  agreements: {
    padding: 20,
  },
  agreementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  agreementText: {
    fontSize: 16,
    color: '#3C5A99',
    flex: 1,
  },
  divider: {
    borderBottomColor: '#4267B2',
    borderBottomWidth: 1,
    marginBottom: 15,
  },
  nextButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: '#4267B2',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  nextButtonTouchable: {
    width: '100%',
  },
});

export default RegistrationAgreementScreen;
