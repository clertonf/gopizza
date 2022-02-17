import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { SignIn } from "../screens/SignIn";
import { ForgotPassword } from "../screens/ForgotPassword";

const { Navigator, Screen } = createNativeStackNavigator();

export function StackRoutes() {
  return (
    <Navigator
      initialRouteName="SignIn"
      screenOptions={{
        headerShown: false
      }}
    >
      <Screen name="signIn" component={SignIn} />
      <Screen name="forgotPassword" component={ForgotPassword} />
    </Navigator>
  );
}
