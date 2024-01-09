import { faChartSimple, faMoon, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { DreamNavigator } from '../Dream/dream-navigator';
import { FloatingButton } from './components/FloatingButton';
import { Header } from './components/Header';


const Tab = createBottomTabNavigator();
export function GlobalNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName='sleep' screenOptions={{
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: '#110f14',
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: '#6C63FF',
          height: 60,
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          elevation: 0,
          shadowOpacity: 0,
          borderTopWidth: 0,
        },
        tabBarItemStyle: {
          backgroundColor: '#6C63FF',
        },
        header: (props) => <Header {...props} />,
        headerStyle: {
          backgroundColor: '#110f14',
        }
      }}>
          <Tab.Screen name='stats' component={DreamNavigator} options={{
            tabBarLabel: 'Stats',
            tabBarIcon: ({ color, size }) => (
              <FontAwesomeIcon icon={faChartSimple} color={color} size={size}/>
            ),
          }}/>
          <Tab.Screen name='sleep' component={DreamNavigator} options={{
            tabBarLabel: 'Sleep',
            tabBarIcon: ({ size  }) => (
              <FontAwesomeIcon icon={faMoon} color={'#6C63FF'} size={size}/>
            ),
            tabBarButton: (props) => (
              <FloatingButton {...props} />
            ),
            
          }}/>
          <Tab.Screen name='me' component={DreamNavigator} options={{
            tabBarLabel: 'Me',
            tabBarIcon: ({ color, size }) => (
              <FontAwesomeIcon icon={faUser} color={color} size={size}/>
            ),
          }}/>
      </Tab.Navigator>
    </NavigationContainer>
  )
}
