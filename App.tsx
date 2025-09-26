import React from 'react';
import { useColorScheme } from 'react-native';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './src/screens/HomeScreen';
import PublicarScreen from './src/screens/PublicarScreen';
import GerenciarScreen from './src/screens/GerenciarScreen';
import PerfilScreen from './src/screens/PerfilScreen';
import CadastroScreen from './src/screens/CadastroScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function MainTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Publicar" component={PublicarScreen} />
      <Tab.Screen name="Gerenciar" component={GerenciarScreen} />
      <Tab.Screen name="Perfil" component={PerfilScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  const scheme = useColorScheme();
  return (
    <NavigationContainer theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Main" component={MainTabs} />
        <Stack.Screen
          name="Cadastro"
          component={CadastroScreen}
          options={{ headerShown: true, title: 'Cadastro' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
