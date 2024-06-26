import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { UserProvider } from '../../modules/user/UserContext';
import { Login } from './views/Login';
import { NewPassword } from './views/NewPassword';
import { RecoveryPassword } from './views/RecoveryPassword';
import { Register } from './views/Register';
import { RegisterContact } from './views/RegisterContact';
import { RegisterCredentials } from './views/RegisterCredentials';
import { SelectRegisterType } from './views/SelectRegisterType';
import { VerifyCode } from './views/VerifyCode';

const Stack = createNativeStackNavigator();
export function AuthNavigator() {
  return (
    <>
      <UserProvider>
        <Stack.Navigator initialRouteName="login" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="login" component={Login} />
          <Stack.Screen name="select-type" component={SelectRegisterType} />
          <Stack.Screen name="register" component={Register} />
          <Stack.Screen name="register-contact" component={RegisterContact} />
          <Stack.Screen name="register-credentials" component={RegisterCredentials} />
          <Stack.Screen name="recovery-password" component={RecoveryPassword}/>
          <Stack.Screen name="new-password" component={NewPassword}/>
          <Stack.Screen name="verify-code" component={VerifyCode}/>
        </Stack.Navigator>
      </UserProvider>
    </>
  );
}
