import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import ServiceScreen from '../screens/ServiceScreen';
import ServiceDetail from '../screens/ServiceDetail';
import EditScreen from '../screens/EditScreen';
import TransactionScreen from '../screens/TransactionScreen';
import CustomerScreen from '../screens/CustomerScreen';
import SettingScreen from '../screens/SettingScreen';
import TransactionDetail from '../screens/TransactionDetail';
import AddCustomerScreen from '../screens/AddCustomerScreen';
import CustomerDetail from '../screens/CustomerDetail';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import EditCustomer from '../screens/EditCustomer';
import AddTransaction from '../screens/AddTransaction';
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator screenOptions={{
      headerShown: false, tabBarActiveTintColor: '#FF4D6D', tabBarInactiveTintColor: 'gray',
    }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Transaction"
        component={TransactionScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="cash" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Customer"
        component={CustomerScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Setting"
        component={SettingScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="cog" color={color} size={size} />
          ),
        }}
      />  
    </Tab.Navigator>
  );
}

export default function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="MainTabs" component={MainTabs} />
        <Stack.Screen name="Service" component={ServiceScreen} />
        <Stack.Screen name="ServiceDetail" component={ServiceDetail} />
        <Stack.Screen name="Edit" component={EditScreen} />
        <Stack.Screen name="TransactionDetail" component={TransactionDetail} />
        <Stack.Screen name="AddCustomer" component={AddCustomerScreen} />
        <Stack.Screen name="CustomerDetail" component={CustomerDetail} />
        <Stack.Screen name="EditCustomer" component={EditCustomer} />
        <Stack.Screen name="AddTransaction" component={AddTransaction} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
