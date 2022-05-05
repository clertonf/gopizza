import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { SignIn } from "../screens/SignIn";
import { ForgotPassword } from "../screens/ForgotPassword";
import { Home } from "../screens/Home";
import { Product } from "../screens/Product";
import { Order } from "../screens/Order";
import { Orders } from "../screens/Orders";

const { Navigator, Screen } = createNativeStackNavigator();

export function StackRoutes() {
  return (
    <Navigator
      initialRouteName="orders"
      screenOptions={{
        headerShown: false
      }}
    >
      {/* <Screen name="signin" component={SignIn} />
      <Screen name="forgotPassword" component={ForgotPassword} /> */}
      <Screen name="home" component={Home} />
      <Screen name="product" component={Product} />
      <Screen name="order" component={Order} />
      <Screen name="orders" component={Orders} />
    </Navigator>
  );
}
