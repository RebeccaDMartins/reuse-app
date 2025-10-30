// App.tsx
import React, { useEffect, useState } from "react";
import { useColorScheme } from "react-native";
import { NavigationContainer, DefaultTheme, DarkTheme } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "./src/screens/HomeScreen";
import PublicarScreen from "./src/screens/PublicarScreen";
import GerenciarScreen from "./src/screens/GerenciarScreen";
import PerfilScreen from "./src/screens/PerfilScreen";
import CadastroScreen from "./src/screens/CadastroScreen";
import LoginScreen from "./src/screens/LoginScreen";

import { AuthContext, AUTH_USER_KEY, type AuthUser } from "./src/lib/auth";
import { save, load, remove } from "./src/lib/storage";

import ProductsScreen from "./src/screens/ProductsScreen";


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

function AuthStackScreens() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} options={{ title: "ReUse!" }} />
      <Stack.Screen name="Cadastro" component={CadastroScreen} options={{ title: "Cadastro" }} />
      <Stack.Screen name="Products" component={ProductsScreen} />
    </Stack.Navigator>
  );
}

export default function App() {
  const scheme = useColorScheme();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [booted, setBooted] = useState(false);

  useEffect(() => {
    (async () => {
      const u = await load<AuthUser>(AUTH_USER_KEY);
      setUser(u ?? null);
      setBooted(true);
    })();
  }, []);

  const login = async (u: AuthUser) => {
    await save(AUTH_USER_KEY, u);
    setUser(u);
  };

  const logout = async () => {
    await remove(AUTH_USER_KEY);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, booted }}>
      <NavigationContainer theme={scheme === "dark" ? DarkTheme : DefaultTheme}>
        {!booted ? null : user ? <MainTabs /> : <AuthStackScreens />}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
