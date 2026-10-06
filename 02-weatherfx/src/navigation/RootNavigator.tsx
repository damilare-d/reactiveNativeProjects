import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import ForexScreen from '../screens/ForexScreen';
import WeatherScreen from '../screens/WeatherScreen';
import { TabParamList } from '../types';

const Tab = createBottomTabNavigator<TabParamList>();

export default function RootNavigator() {
  return (
    <Tab.Navigator screenOptions={{ headerTitleAlign: 'center' }}>
      <Tab.Screen name="Weather" component={WeatherScreen} />
      <Tab.Screen name="Forex" component={ForexScreen} />
    </Tab.Navigator>
  );
}
