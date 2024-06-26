import { MobileButton, MobileInputText } from '@ducen/ui-native';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Back } from '../../../modules/shared/components/Back';
import { useUserContext } from '../../../modules/user/UserContext';

export function RecoveryPassword() {
  const { recoveryPassword } = useUserContext();
  const [email, setEmail] = useState('');
  const navigation = useNavigation();
  const submitEmail = async () => {
    //await recoveryPassword(email);
    navigation.navigate('verify-code' as never);
  };
  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            gap: 10,
            paddingHorizontal: '5%',
          }}
        >
          <Back />
          <Text style={styles.title}>Ducen</Text>
        </View>
        <View style={{ width: '100%', alignItems: 'flex-start', marginBottom: 10, paddingHorizontal: '5%' }}>
          <Text style={styles.subtitle}>Indica el email de tu cuenta</Text>
        </View>
        <View style={{ width: '100%', gap: 30 }}>
          <MobileInputText placeholder={'Email'} onChange={(value: string) => setEmail(value)} value={email} />
          <MobileButton text="Send email" onPress={submitEmail}></MobileButton>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#fff',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  title: {
    color: '#000',
    fontSize: 35,
    fontFamily: 'Nunito_700Bold',
  },
  subtitle: {
    color: '#000',
    fontSize: 18,
    fontFamily: 'Nunito_700Bold',
  },
  form: {
    width: '100%',
    height: '90%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 40,
  },
});
