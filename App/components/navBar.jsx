import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from '../screens/homeScreen.jsx';
import EventApp from '../screens/calendarScreen.jsx';
import MapScreen from '../screens/mapScreen.jsx';
import TicketScreen from '../screens/ticketScreen.jsx';
import EchoScreen from '../screens/echoScreen.jsx';

const homeName = 'Home';
const calendarName = 'Calendar';
const mapName = 'Map';
const ticketName = 'Ticket';
const echoName = 'Echo';

const Tab = createBottomTabNavigator();

export default function NavBar() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === homeName) {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === calendarName) {
              iconName = focused ? 'calendar' : 'calendar-outline';
            } else if (route.name === mapName) {
              iconName = focused ? 'map' : 'map-outline';
            } else if (route.name === ticketName) {
              iconName = focused ? 'ticket' : 'ticket-outline';
            } else if (route.name === echoName) {
              iconName = focused ? 'water' : 'water-outline'; // 'water' et 'water-outline' sont les noms d'icônes pour Ionicons
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#F72585',
          tabBarInactiveTintColor: '#FFFFFF',
          tabBarStyle: {
            paddingVertical: 5,
            backgroundColor: '#121212', // Set nav bar color
          },
          headerShown: false, // Disable the header
        })}
      >
        <Tab.Screen name={homeName} component={HomeScreen} />
        <Tab.Screen name={calendarName} component={EventApp} />
        <Tab.Screen name={mapName} component={MapScreen} />
        <Tab.Screen name={ticketName} component={TicketScreen} />
        <Tab.Screen name={echoName} component={EchoScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
