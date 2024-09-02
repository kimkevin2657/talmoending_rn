import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  processColor,
  Alert,
  Dimensions,
} from 'react-native';
import {RadarChart} from 'react-native-charts-wrapper';

const RadarChartComponent = ({data}) => {
  // If the data prop is directly passed, we will assume it is structured as you've defined:
  // data = {
  //   dataSets: [{
  //     values: [...],
  //     label: '검사 수치',
  //     config: {
  //       color: processColor(...),
  //       drawFilled: true,
  //       ...
  //     }
  //   }],
  //   labels: [...]
  // }

  const xAxis = {
    valueFormatter: data.labels, // use directly from data
    textSize: 12,
    textColor: processColor('black'),
  };

  const legend = {
    enabled: true,
    textSize: 14,
    form: 'CIRCLE',
    textColor: processColor('#3C5A99'),
    horizontalAlignment: 'RIGHT',
    verticalAlignment: 'TOP',
    orientation: 'VERTICAL',
    wordWrapEnabled: true,
  };

  const handleSelect = event => {
    console.log(event.nativeEvent);
    if (event.nativeEvent.selected) {
      Alert.alert('Data Selected', `Index: ${event.nativeEvent.selectedIndex}`);
    }
  };

  return (
    <View style={styles.container}>
      <RadarChart
        style={{
          height: '100%',
          width: '100%',
        }}
        data={data}
        xAxis={xAxis}
        yAxis={{drawLabels: true}}
        chartDescription={{text: ''}}
        legend={legend}
        drawWeb={true}
        webLineWidth={2}
        webLineWidthInner={2}
        webAlpha={255}
        webColor={processColor('grey')}
        webColorInner={processColor('grey')}
        skipWebLineCount={0}
        onSelect={handleSelect}
        onChange={event => console.log(event.nativeEvent)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#FFF',
  },
  header: {
    fontSize: 20,
    marginBottom: 10,
    textAlign: 'center',
  },
});

export default RadarChartComponent;
