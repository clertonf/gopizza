import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { SignIn } from "../screens/SignIn";
import { ForgotPassword } from "../screens/ForgotPassword";
import { Home } from "../screens/Home";
import { Product } from "../screens/Product";

const { Navigator, Screen } = createNativeStackNavigator();

export function StackRoutes() {
  return (
    <Navigator
      initialRouteName="SignIn"
      screenOptions={{
        headerShown: false
      }}
    >
      {/* <Screen name="signin" component={SignIn} />
      <Screen name="forgotPassword" component={ForgotPassword} /> */}
      <Screen name="home" component={Home} />
      <Screen name="product" component={Product} />
    </Navigator>
  );
}
