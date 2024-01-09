import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Header } from "./components/header";
import { Day } from "./views/Day";
import { Month } from "./views/Month";
import { Week } from "./views/Week";
const Stack = createNativeStackNavigator();
export function DreamNavigator() {
  return (
    <>
      <Stack.Navigator initialRouteName="day" screenOptions={{ header: (props) => <Header {...props}/>, animation: 'none' }}>
        <Stack.Screen name="day" component={Day} />
        <Stack.Screen name="week" component={Week} />
        <Stack.Screen name="month" component={Month} />
      </Stack.Navigator>
    </>
  );
}
