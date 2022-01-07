import * as React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  Image,
} from 'react-native';
import {Button} from 'react-native-paper';
import {PrimaryButton} from '../../components/Button';
import {CONTENT} from '../../constants/content';
import {GOOGLE, WELCOME, WELCOME_1} from '../../constants/iconConstants';
import {SCREENS} from '../../constants/navigationConstants';
import {Colors} from '../../styles';
import {styles} from './styles';

const Welcome = ({navigation}: any) => {
  return (
    <SafeAreaView style={styles.mainContainer}>
      <TouchableOpacity
        onPress={() => navigation.navigate(SCREENS.LOGIN)}
        style={{
          alignItems: 'center',
          flex: 1,
          paddingHorizontal: '10%',
          justifyContent: 'center',
          marginTop: 30,
        }}>
        <View
          style={{
            marginTop: 100,
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <View style={{width: '15%', height: 100}}>
            <Image style={styles.image} source={WELCOME_1} />
          </View>
          <View style={{width: '60%', marginTop: 10, height: 100}}>
            <Image style={styles.image} source={WELCOME} />
          </View>
        </View>
      </TouchableOpacity>
      <View
        style={{
          flex: 1,
          paddingHorizontal: '10%',
          marginTop: 30,
          justifyContent: 'center',
        }}>
        <Button
          style={{
            borderColor: Colors.BLACK,
            borderBottomColor: Colors.BLACK,
            borderWidth: 1,
            borderRadius: 10,
            paddingVertical: 3,
            width: '100%',
          }}
          labelStyle={styles.lableText}
          uppercase={false}
          icon={({size, color, direction}: any) => (
            <Image
              source={GOOGLE}
              style={[
                {
                  transform: [{scaleX: direction === 'rtl' ? -1 : 1}],
                },
                {
                  width: size,
                  height: size,
                  tintColor: color,
                },
              ]}
            />
          )}>
          Continue with Google
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default Welcome;
