import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';

const RegistrationScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registration Screen</Text>
      <Button title="Register" onPress={() => navigation.replace('MainTabs')} />
      <Button
        title="Back to Login"
        onPress={() => navigation.navigate('LoginScreen')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
});

export default RegistrationScreen;
