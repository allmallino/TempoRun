import { Image } from 'expo-image';
import {View, StyleSheet} from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.mainContainer}>
      <Image source={require('@/assets/images/temporun-logo.png')} style={styles.logo} />
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    gap: 8,
    paddingHorizontal:16,
    paddingTop:52
  },
  logo:{
    height:80,
    width:323
  },
});
