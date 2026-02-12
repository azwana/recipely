import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as SecureStore from "expo-secure-store";
import Intro from "../pages/intro";
import Welcome from "../pages/welcome";

const Stack = createNativeStackNavigator();

export type AuthStackParamList = {
  Intro: undefined;
  Welcome: undefined;
};

const PreAuthStack = () => {
  const [skipIntro, setSkipIntro] = useState<string | null>(null);

  useEffect(() => {
    getFirstTimeUser();
  }, []);

  const getFirstTimeUser = async () => {
    let skipIntroStorage = await SecureStore.getItemAsync("SKIP_INTRO");
    setSkipIntro(skipIntroStorage);
  };

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {skipIntro ? (
        <>
          <Stack.Screen name={"Welcome"} component={Welcome} />
        </>
      ) : (
        <>
          <Stack.Screen name={"Intro"} component={Intro} />
          <Stack.Screen name={"Welcome"} component={Welcome} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default function NavStack() {
  return (
    <NavigationContainer>
      <PreAuthStack />
    </NavigationContainer>
  );
}
