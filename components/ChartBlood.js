// import React from 'react';
// import {View, StyleSheet} from 'react-native';
// import {
//   VictoryPolarAxis,
//   VictoryChart,
//   VictoryTheme,
//   VictoryArea,
// } from 'victory-native';

// const ChartBlood = ({wbc, rbc, plt, hb, hct}) => {
//   const data = [
//     {x: 'WBC', y: wbc / 10},
//     {x: 'RBC', y: rbc / 5},
//     {x: 'PLT', y: plt / 400},
//     {x: 'Hb', y: hb / 15},
//     {x: 'Hct', y: hct / 50},
//   ];

//   return (
//     <View style={styles.container}>
//       <VictoryChart polar theme={VictoryTheme.material}>
//         <VictoryPolarAxis
//           dependentAxis
//           style={{axis: {stroke: 'none'}}}
//           tickFormat={() => ''}
//         />
//         <VictoryPolarAxis />
//         <VictoryArea
//           data={data}
//           style={{
//             data: {
//               fillOpacity: 0.2,
//               fill: '#5E548E',
//               stroke: '#5E548E',
//               strokeWidth: 2,
//             },
//           }}
//           interpolation="cardinal"
//         />
//       </VictoryChart>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: '#FAFAFF',
//     padding: 20,
//   },
// });

// export default ChartBlood;
