import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack'; // Import Stack Navigator
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeScreen from '../screens/homeScreen.jsx';
import CalendarScreen from '../screens/calendarScreen.jsx';
import MapScreen from '../screens/mapScreen.jsx';
import TicketScreen from '../screens/ticketScreen.jsx';
import EchoScreen from '../screens/echoScreen.jsx';
import ArtistScreen from '../screens/artistScreen.jsx';
import SettingsScreen from '../screens/settingsScreen.jsx';
import SecurityScreen from '../screens/securityScreen.jsx';
import UserDatasScreen from '../screens/userDatasScreen.jsx';
import PrivacyPolicyScreen from '../screens/privacyPolicyScreen.jsx';
import NotificationScreen from '../screens/notificationScreen.jsx';
import FavouriteArtistScreen from '../screens/favouriteArtistScreen.jsx';
import LostPropertyScreen from '../screens/lostPropertyScreen.jsx';
import ShopScreen from '../screens/shopScreen.jsx';
import BasketScreen from '../screens/basketScreen.jsx';
import ProductScreen from '../screens/productScreen.jsx';
import HelpScreen from '../screens/helpScreen.jsx';
import NfcScreen from '../screens/nfcScreen.jsx';

const homeName = 'Home';
const calendarName = 'Calendar';
const mapName = 'Map';
const ticketName = 'Ticket';
const echoName = 'Echo';
const artistName = 'Artist';
const settingsName = 'Settings';
const securityName = 'Security';
const userDatasName = 'User Datas';
const privacyPolicyName = 'Privacy Policy';
const notificationName = 'Notifications';
const favouriteArtistName = 'Favourite Artist';
const lostPropertyName = 'Lost Property';
const shopName = 'Shop';
const basketName = 'Basket';
const productName = 'Product';
const helpName = 'Help';
const nfcName = 'NFC';

 // Define a name for the artist screen

const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator(); // Create a stack for the Home
const TicketStack = createStackNavigator();
const EchoStack = createStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen 
        name={homeName} 
        component={HomeScreen} 
        options={{ headerShown: false }} // Enable header for HomeScreen
      />
      <HomeStack.Screen 
        name={artistName} 
        component={ArtistScreen} 
        options={{ headerShown: false }} // Hide header for ArtistScreen
      />
    </HomeStack.Navigator>
  );
}
function TicketStackScreen() {
  return (
    <TicketStack.Navigator>
      <TicketStack.Screen 
        name={ticketName} 
        component={TicketScreen} 
        options={{ headerShown: false }}
      />
      <TicketStack.Screen 
        name={settingsName} // Using the defined settingsName variable
        component={SettingsScreen} 
        options={{ headerShown: false }}
      />
      <TicketStack.Screen name={securityName} component={SecurityScreen} options={{ headerShown: false }}/>
      <TicketStack.Screen name={userDatasName} component={UserDatasScreen} options={{ headerShown: false }}/>
      <TicketStack.Screen name={privacyPolicyName} component={PrivacyPolicyScreen} options={{ headerShown: false }}/>
      <TicketStack.Screen name={notificationName} component={NotificationScreen} options={{ headerShown: false }}/>
      <TicketStack.Screen name={favouriteArtistName} component={FavouriteArtistScreen} options={{ headerShown: false }}/>
      <TicketStack.Screen name={lostPropertyName} component={LostPropertyScreen} options={{ headerShown: false }}/>
      <TicketStack.Screen name={nfcName} component={NfcScreen} options={{ headerShown: false }}/>
    </TicketStack.Navigator>
  );
}
function EchoStackScreen() {
  return (
    <EchoStack.Navigator>
      <EchoStack.Screen name={echoName} component={EchoScreen} options={{ headerShown: false }}/>
      <EchoStack.Screen name={shopName} component={ShopScreen} options={{ headerShown: false }}/>
      <EchoStack.Screen name={basketName} component={BasketScreen} options={{ headerShown: false }}/>
      <EchoStack.Screen name={productName} component={ProductScreen} options={{ headerShown: false }}/>
      <EchoStack.Screen name={helpName} component={HelpScreen} options={{ headerShown: false }}/>

      </EchoStack.Navigator>
      );
}



export default function NavBar() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === homeName || route.name === artistName) {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === calendarName) {
              iconName = focused ? 'calendar' : 'calendar-outline';
            } else if (route.name === mapName) {
              iconName = focused ? 'map' : 'map-outline';
            } else if (route.name === ticketName || route.name === settingsName) {
              iconName = focused ? 'ticket' : 'ticket-outline';
            } else if (route.name === echoName) {
              iconName = focused ? 'water' : 'water-outline';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#F72585',
          tabBarInactiveTintColor: '#FFFFFF',
          tabBarStyle: { paddingVertical: 5, backgroundColor: '#121212' },
          headerShown: false,
        })}
      >
        <Tab.Screen name={homeName} component={HomeStackScreen} />
        <Tab.Screen name={calendarName} component={CalendarScreen} />
        <Tab.Screen name={mapName} component={MapScreen} />
        <Tab.Screen name={ticketName} component={TicketStackScreen} />
        <Tab.Screen name={echoName} component={EchoStackScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
