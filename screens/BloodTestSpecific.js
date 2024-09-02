import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
  Dimensions,
  processColor,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {WebView} from 'react-native-webview';
import {useNavigation} from '@react-navigation/native';
import RadarChartComponent from '../components/RadarChart';

const BloodTestSpecific = ({route}) => {
  const navigation = useNavigation();
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;
  const bloodResult = route.params.bloodResult; // Assume bloodResult is passed via route params

  const constructUrlWithParams = () => {
    const params = [
      `WBC=${bloodResult['wbc concentration']}`,
      `RBC=${bloodResult['rbc concentration']}`,
      `PLT=${bloodResult['plt concentration']}`,
      `Hb=${bloodResult.hemoglobin}`,
      `Hct=${bloodResult.hct}`,
    ];
    return `http://43.202.219.28:8000/common/radarchart?${params.join('&')}`;
  };

  const chartData = {
    dataSets: [
      {
        values: [
          bloodResult['wbc concentration'],
          bloodResult['rbc concentration'],
          bloodResult['plt concentration'],
          bloodResult.hemoglobin,
          bloodResult.hct,
        ],
        label: '검사 수치',
        config: {
          color: processColor('#3C5A99'),
          drawFilled: true,
          fillColor: processColor('#4267B2'),
          fillAlpha: 100,
          lineWidth: 2,
        },
      },
    ],
    labels: [
      '백혈구(WBC)',
      '적혈구(RBC)',
      '혈소판수(PLT)',
      '헤모글로빈(Hb)',
      '적혈구용적(Hct)',
    ], // Default labels
  };

  // Map provided blood result keys to detailed descriptions and normal ranges
  const bloodTestData = [
    {
      key: 'WBC',
      label: '백혈구수 (WBC)',
      value: bloodResult['wbc concentration'],
      range: '4.0~10.0 µL',
      isHighLighted:
        bloodResult['wbc concentration'] >= 4.0 &&
        bloodResult['wbc concentration'] <= 10.0,
      description:
        '백혈구는 골수에서 생성되어 감염이 있을 때 신체를 방어하고 면역반응에 관여하여 감염을 일으킨 세균, 진균, 바이러스 등을 공격하여 제거합니다. 백혈구증가증은 백혈구수가 정상치보다 많은 경우로 세균감염, 염증, 백혈병, 외상, 심한 운동, 임신, 스트레스로 인해 발생할 수 있습니다. 백혈구감소증은 백혈구수가 정상치보다 적은 경우로 화학요법, 방사선 치료, 면역체계에 영향을 끼치는 질환 등 다양한 원인에 의해 발생할 수 있습니다. 백혈구수는 아침에는 낮고 오후에는 높은 경향을 보입니다. 정상 신생아는 성인보다 높은 백혈구 수치를 보이고, 노령층은 감염이 있어도 백혈구증가증이 동반되지 않을 수 있습니다.',
    },
    {
      key: 'RBC',
      label: '적혈구수 (RBC)',
      value: bloodResult['rbc concentration'],
      range: '4.1~5.6 µL',
      isHighLighted:
        bloodResult['rbc concentration'] >= 4.1 &&
        bloodResult['rbc concentration'] <= 5.6,
      description:
        '적혈구는 신체 구석구석에 산소를 운반하여 신진대사를 원활하게 도와줍니다. 적혈구 수는 혈액에서 발견되는 총 적혈구 수를 나타내며, 정상범위보다 적혈구 수치가 낮은 상태를 빈혈, 정상범위보다 높은 상태를 적혈구증가증이라고 합니다. 적혈구감소증은 출혈, 빈혈 등으로 인해 발생할 수 있습니다. 적혈구증가증은 탈수, 폐기종, 심한 운동, 흡연 등으로 인해 발생할 수 있습니다.',
    },
    {
      key: 'PLT',
      label: '혈소판 (PLT)',
      value: bloodResult['plt concentration'],
      range: '150~370 µL',
      isHighLighted:
        bloodResult['plt concentration'] >= 150 &&
        bloodResult['plt concentration'] <= 370,
      description:
        '혈소판은 혈액 응고를 담당합니다. 혈소판수가 너무 적으면 과도한 출혈이나 멍이 생길 수 있고, 혈소판수가 너무 많으면 혈액이 과도하게 응고될 수 있습니다. 혈소판감소증은 재생 불량성 빈혈, 방사선 노출, 골수 손상, 임신, 항암제나 항생제, 전신 세균성 감염 등으로 인해 발생할 수 있습니다. 혈소판증가증은 철분 결핍, 전이암, 골수 기능 장애, 감염증, 수술 등으로 인해 발생할 수 있습니다.',
    },
    {
      key: 'Hb',
      label: '혈색소 (Hb)',
      value: bloodResult.hemoglobin,
      range: '13~16.5 g/dL',
      isHighLighted:
        bloodResult.hemoglobin >= 13 && bloodResult.hemoglobin <= 16.5,
      description:
        '혈색소는 폐로부터 다른 장기로 산소를 운반하는 적혈구 내부에서 실제로 산소를 운반하는 물질입니다. 적혈구가 너무 적거나 혈색소가 너무 적은 경우, 혈액이 신체에 필요한 모든 산소를 운반할 수 없어 빈혈이 발생됩니다. 높은 혈색소 수치는 탈수, 골수에서의 적혈구 과다생산, 심각한 폐 질환 등으로 인해 발생할 수 있습니다. 낮은 혈색소 수치는 빈혈, 철분 또는 비타민B12와 엽산의 결핍, 간경변증, 과다출혈, 신장질환 등으로 인해 발생할 수 있습니다.',
    },
    {
      key: 'Hct',
      label: '적혈구용적 (Hct)',
      value: bloodResult.hct,
      range: '39~51 %',
      isHighLighted: bloodResult.hct >= 39 && bloodResult.hct <= 51,
      description:
        '적혈구용적률은 혈액 중 적혈구가 차지하는 비율을 측정하는 것입니다. 적혈구용적률이 감소하면 철 결핍이나 다른 결핍증에 의해 초래될 수 있는 빈혈이 발생됩니다. 낮은 적혈구용적률은 빈혈, 비타민이나 무기질의 결핍, 출혈, 간경화증, 암 등으로 인해 발생할 수 있습니다. 적혈구용적률을 증가시키는 가장 흔한 원인은 탈수증으로 적절한 수액 섭취로 정상치로 돌아옵니다. 그러나 혈구용적률이 지속적으로 높다면 병원에 방문하여 진료를 받아야 합니다.',
    },
    {
      key: 'Neut',
      label: '호중구 (Neut)',
      value: bloodResult.neut,
      range: '3000~7500 개/μL',
      isHighLighted: bloodResult.neut >= 3000 && bloodResult.neut <= 7500,
      description:
        '호중구는 백혈구의 가장 큰 비율을 차지하며 다양한 염증, 전염병과 싸우기 위해 골수에서 생성됩니다. 호중구가 감염을 방어하지 못하면 감염을 조절하는데 문제가 발생하게 됩니다.※ 출처 : 대한진단검사의학회, 서울대학교병원 진단검사의학과 누리집',
    },
    {
      key: 'Lymph',
      label: '림프구 (Lymph)',
      value: bloodResult.lymph,
      range: '1500~4500 개/μL',
      isHighLighted: bloodResult.lymph >= 1500 && bloodResult.lymph <= 4500,
      description:
        '림프구는 이물질이나 세균으로부터 우리 몸을 보호하는 백혈구의 한 유형으로 외부에서 들어오는 항원과 싸워 항체를 형성하는 면역반응에 관여합니다.※ 출처 : 대한진단검사의학회, 서울대학교병원 진단검사의학과 누리집',
    },
    {
      key: 'Mono',
      label: '단핵구 (Mono)',
      value: bloodResult.mono,
      range: '100~500 개/μL',
      isHighLighted: bloodResult.mono >= 100 && bloodResult.mono <= 500,
      description:
        '단핵구는 백혈구의 한 유형으로 호중구와 함께 작동하여 감염 및 기타 질병을 퇴치하는 동시에 손상되거나 죽은 세포를 제거합니다.※ 출처 : 대한진단검사의학회, 서울대학교병원 진단검사의학과 누리집',
    },
    {
      key: 'MCV',
      label: '평균적혈구용적(MCV)',
      value: bloodResult.mcv,
      range: '82.0~102.0 fL',
      isHighLighted: bloodResult.mcv >= 82 && bloodResult.mcv <= 102,
      description:
        '평균적혈구용적은 적혈구의 평균 크기를 측정하는 것으로 적혈구, 백혈구, 혈소판 등의 수치를 참고하여 질환을 진단하는데 사용됩니다.※ 출처 : 대한진단검사의학회, 서울대학교병원 진단검사의학과 누리집',
    },
    {
      key: 'MCH',
      label: '평균적혈구혈색소량(MCH)',
      value: bloodResult.mch,
      range: '25.0~33.0 pg',
      isHighLighted: bloodResult.mch >= 25 && bloodResult.mch <= 33,
      description:
        '평균적혈구혈색소량은 적혈구 내부의 평균 혈색소 양을 측정하는 것으로 평균적혈구용적(MCH)과 평균적혈구혈색소농도(MCHC), 적혈구분포(RDW) 등과 함께 빈혈을 측정하는데 사용됩니다.※ 출처 : 대한진단검사의학회, 서울대학교병원 진단검사의학과 누리집',
    },
    {
      key: 'MCHC',
      label: '평균적혈구혈색소농도(MCHC)',
      value: bloodResult.mchc,
      range: '30.0~35.0 g/dL',
      isHighLighted: bloodResult.mchc >= 30 && bloodResult.mchc <= 35,
      description:
        '평균적혈구혈색소량은 적혈구 내부의 평균 혈색소 양을 측정하는 것으로 평균적혈구용적(MCH)과 평균적혈구혈색소농도(MCHC), 적혈구분포(RDW) 등과 함께 빈혈을 측정하는데 사용됩니다.※ 출처 : 대한진단검사의학회, 서울대학교병원 진단검사의학과 누리집',
    },
    {
      key: 'RDW',
      label: '적혈구분포(RDW)',
      value: bloodResult.rdw,
      range: '11.5~15.4 %',
      isHighLighted: bloodResult.rdw >= 11.5 && bloodResult.rdw <= 15.4,
      description:
        '평균적혈구혈색소농도는 적혈구 내에 혈색소가 얼마나 농축되어 있는지를 계산한 값으로 빈혈과 다혈증 진단 등에 사용됩니다.※ 출처 : 대한진단검사의학회, 서울대학교병원 진단검사의학과 누리집',
    },
    {
      key: 'MPV',
      label: '평균혈소판용적(MPV)',
      value: bloodResult.mpv,
      range: '8.6~12.6 fL',
      isHighLighted: bloodResult.mpv >= 8.6 && bloodResult.mpv <= 12.6,
      description:
        '평균적혈구혈색소농도는 적혈구 내에 혈색소가 얼마나 농축되어 있는지를 계산한 값으로 빈혈과 다혈증 진단 등에 사용됩니다.※ 출처 : 대한진단검사의학회, 서울대학교병원 진단검사의학과 누리집',
    },
    {
      key: 'PDW',
      label: '혈소판분포폭(PDW)',
      value: bloodResult.pdw,
      range: '8.8~16.5 %',
      isHighLighted: bloodResult.pdw >= 8.8 && bloodResult.pdw <= 16.5,
      description:
        '혈소판분포폭은 혈소판 크기가 얼마나 일정한지, 크기의 분포 정도를 알아보는 검사로 혈소판의 상태를 통해 빈혈 진단에 활용합니다.※ 출처 : 대한진단검사의학회, 서울대학교병원 진단검사의학과 누리집',
    },
    {
      key: 'PCT',
      label: '혈소판용적(PCT)',
      value: bloodResult.pct,
      range: '0.2~0.4%',
      isHighLighted: bloodResult.pct >= 0.2 && bloodResult.pct <= 0.4,
      description:
        '혈소판이 혈액 중에 차지하는 양을 측정하는 것으로 다른 혈액검사와 함께 질환을 진단하는데 활용합니다.※ 출처 : 대한진단검사의학회, 서울대학교병원 진단검사의학과 누리집',
    },
    {
      key: 'NEUT%',
      label: '호중구 비율 (NEUT %)',
      value: bloodResult.neutrophil,
      range: '54~75 %',
      isHighLighted:
        bloodResult.neutrophil >= 54 && bloodResult.neutrophil <= 75,
      description:
        '호중구 비율은 백혈구 내에서 가장 큰 비율을 차지하는 호중구가 백혈구 내에서 차지하는 비율을 측정한 결과입니다. 호중구 감소증은 백혈구 내 차지하는 비율이 50~70% 정도여야 하는 호중구가, 비정상적으로 감소된 것을 말합니다. 호중구의 수가 1500μL 이하로 감소된 경우를 호중구 감소증이라고 합니다. 호중구는 다양한 염증 및 전염병과 싸우기 위해 골수에서 생성되는데 호중구가 감염을 방어하지 못하면 감염을 조절하는 데 문제가 발생하게 됩니다.※ 출처 : 대한진단검사의학회, 서울대학교병원 진단검사의학과 누리집',
    },
    {
      key: 'LYMPH %',
      label: '림프구 비율(LYMPH %)',
      value: bloodResult.lymphocyte,
      range: '25~40 %',
      isHighLighted:
        bloodResult.lymphocyte >= 25 && bloodResult.lymphocyte <= 40,
      description:
        '림프구 비율은 백혈구 내에서 림프구가 차지하는 비율을 측정한 결과입니다. 백혈구 중 림프구가 20~40%를 차지하는 것이 정상이며, 보통 성인의 경우 혈액 마이크로리터당 1,500개 이상이고, 소아의 경우 3,000개 이상입니다. 림프구는 이물질이나 세균으로부터 우리 몸을 보호하는 백혈구의 한 유형으로 외부에서 들어오는 항원과 싸워 항체를 형성하는 면역반응에 관여합니다.※ 출처 : 대한진단검사의학회, 서울대학교병원 진단검사의학과 누리집',
    },
    {
      key: 'MONO %',
      label: '단핵구 비율 (MONO %)',
      value: bloodResult.monocyte,
      range: '2~8%',
      isHighLighted: bloodResult.monocyte >= 2 && bloodResult.monocyte <= 8,
      description:
        '단핵구 비율은 백혈구 내에서 단핵구가 차지하는 비율을 측정한 결과입니다. 5%이내로 측정되는 것이 정상이며, 화학요법 또는 골수 장애와 같이 전체 백혈구 수를 감소시키는 상태로 인해 감소할 수 있습니다. 단핵구는 백혈구의 한 유형으로 호중구와 함께 작동하여 감염 및 기타 질병을 퇴치하는 동시에 손상되거나 죽은 세포를 제거합니다.※ 출처 : 대한진단검사의학회, 서울대학교병원 진단검사의학과 누리집',
    },
  ];

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDescription, setSelectedDescription] = useState('');

  const handlePressInfo = description => {
    setSelectedDescription(description);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{selectedDescription}</Text>
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>닫기</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.navigate('BloodTestHistoryScreen')}>
          <Icon name="arrow-left" size={24} color="#3C5A99" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>혈액검사 상세보기</Text>
      </View>
      <View
        style={{
          height: screenHeight * 0.35,
          width: screenWidth * 0.9,
          marginLeft: screenWidth * 0.05,
        }}>
        <WebView
          source={{uri: constructUrlWithParams()}}
          style={{height: '100%', width: '100%'}}
        />
      </View>

      {/* <RadarChartComponent data={chartData} /> */}

      <ScrollView style={styles.contentContainer} persistentScrollbar={true}>
        <View style={styles.tableContainer}>
          <View style={styles.tableHeader}>
            <Text
              style={[styles.cell, styles.headerCell, styles.column1header]}>
              항목
            </Text>
            <Text style={[styles.cell, styles.headerCell, styles.column2]}>
              결과
            </Text>
            <Text style={[styles.cell, styles.headerCell, styles.column3]}>
              정상범위
            </Text>
          </View>
          {bloodTestData.map(item => (
            <View
              key={item.key}
              style={[
                styles.tableRow,
                !item.isHighLighted ? styles.highlighted : {},
              ]}>
              {/* <Text style={[styles.cell, styles.label, styles.column1]}> */}
              <Text style={[styles.cell, styles.column1]}>
                {item.label}
                <TouchableOpacity
                  onPress={() => handlePressInfo(item.description)}>
                  <Icon name="info-circle" size={15} color="#007bff" />
                </TouchableOpacity>
              </Text>
              <Text style={[styles.cell, styles.column2]}>{item.value}</Text>
              <Text style={[styles.cell, styles.column3]}>{item.range}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    color: '#3C5A99',
  },
  textStyle: {
    color: '#3C5A99',
    textAlign: 'center',
  },

  container: {
    flex: 1,
    // backgroundColor: '#FAFAFF',
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: '#FAFAFF',
  },
  headerTitle: {
    color: '#3C5A99',
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },
  tableContainer: {
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f1f1f1',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  tableRow: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  highlighted: {
    backgroundColor: '#FFEEEE', // A light red background color for high-priority items
  },
  cell: {
    // flex: 1,
    fontSize: 16,
    color: '#3C5A99',
    padding: 10,
    textAlign: 'center',
    borderRightWidth: 1,
    borderRightColor: '#ddd',
  },
  label: {
    textAlign: 'left',
    paddingLeft: 15,
  },
  headerCell: {
    fontWeight: 'bold',
    backgroundColor: '#f1f1f1',
  },
  // column1: {
  //   width: '50%', // Adjust the width as needed
  // },
  // column2: {
  //   width: '25%', // Adjust the width as needed
  // },
  // column3: {
  //   width: '25%', // Adjust the width as needed
  // },
  column1header: {
    flex: 3, // Adjust this to ensure proper alignment
    textAlign: 'center', // Text alignment for better readability
    paddingLeft: 15, // Padding for labels
  },
  column1: {
    flex: 3, // Adjust this to ensure proper alignment
    textAlign: 'left', // Text alignment for better readability
    paddingLeft: 15, // Padding for labels
  },
  column2: {
    flex: 2, // Adjust this as needed
  },
  column3: {
    flex: 2, // Adjust this as needed
  },
});

export default BloodTestSpecific;
