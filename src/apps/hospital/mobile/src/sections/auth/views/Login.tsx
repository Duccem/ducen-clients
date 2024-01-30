import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from '../../shared/components/Button';
import { InputText } from '../../shared/components/InputText';
import { SocialButton } from '../../shared/components/SocialButton';
import { useAuthContext } from '../state/AuthContext';
export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuthContext();
  const navigation = useNavigation();
  const makeLogin = async () => {
    if(email && password) {
      console.log('logging in')
      await login(email, password);
      navigation.navigate('home' as never);
    }
  }
  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.title}>Ducen</Text>
        <View style={{ width: '100%', alignItems: 'flex-start', paddingLeft: '5%', marginBottom: 40 }}>
          <Text style={styles.subtitle}>Welcome to Ducen. Medical assistance everywhere</Text>
        </View>
        <View style={{ width: '100%', justifyContent: 'center', gap: 30 }}>
          <InputText placeholder={'Email'} onChange={(value: string) => setEmail(value) }/>
          <InputText placeholder={'Password'} secureTextEntry onChange={(value: string) => setPassword(value)}/>
          <Button text='Iniciar Sesión' onPress={makeLogin}></Button>
          <View style={{
            width: '100%',
            paddingHorizontal: '5%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
            <Text>¿Olvidaste tu contraseña?</Text>
            <Text style={styles.signLink} onPress={() => navigation.navigate('select-type' as never)}>SignUp for Free</Text>
          </View>
        </View>
        <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'center', gap: 10, marginTop: 50 }}>
          <SocialButton icon='google'></SocialButton>
          <SocialButton icon='facebook'></SocialButton>
          <SocialButton icon='x'></SocialButton>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    color: '#000',
    fontSize: 35,
    fontFamily: 'Nunito_700Bold',
    marginBottom: 40,
  },
  subtitle: {
    color: '#000',
    fontSize: 25,
    fontFamily: 'Nunito_700Bold',
  },
  container: {
    height: '100%',
    backgroundColor: '#fff',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 20,
  },
  form: {
    width: '100%',
    height: '90%',
    alignItems: 'center',
    justifyContent: 'space-around',
    gap: 0,
  },
  signLink: {
    color: '#000',
    fontFamily: 'Nunito_700Bold',
    fontSize: 16,
  }
});
