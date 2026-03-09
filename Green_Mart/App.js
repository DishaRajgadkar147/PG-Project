import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider } from "react-redux";

import Toast from "react-native-toast-message";

import AuthStack from "./src/Navigation/AuthStack";
import BottomTabs from "./src/Navigation/BottomTabs";

import ProductsList from "./src/Screens/ProductsList";
import CategoryProducts from "./src/Screens/CategoryProducts";
import Details from "./src/Screens/Details";
import Cart from "./src/Screens/Cart";
import Checkout from "./src/Screens/Checkout";
import OrderSuccess from "./src/Screens/OrderSuccess";
import OrderDetails from "./src/Screens/OrderDetails";
import ShippingAddress from "./src/Screens/ShippingAddress";
import EditProfile from "./src/Screens/EditProfile";
import PrivacyPolicy from "./src/Screens/PrivacyPolicy";
import Settings from "./src/Screens/Settings";

import { store } from "./src/Redux/store";

import AdminAuth from "./src/Screens/AdminAuth";
import AdminHome from "./src/Admin/AdminHome";
import AdminOrders from "./src/Screens/AdminOrders";
import AdminOrderDetails from "./src/Screens/AdminOrderDetails";
import AdminProducts from "./src/Screens/AdminProducts";
import AdminProductForm from "./src/Screens/AdminProductForm";
import AdminUsers from "./src/Screens/AdminUsers";
import AdminUserDetails from "./src/Screens/AdminUserDetails";


import DeliveryAuth from "./src/Screens/DeliveryAuth";
import DeliveryHome from "./src/Screens/DeliveryPartner/DeliveryHome";
import DeliveryProfile from "./src/Screens/DeliveryPartner/DeliveryProfile";
import EditDeliveryProfile from "./src/Screens/DeliveryPartner/EditDeliveryProfile";
import DeliveryOrders from "./src/Screens/DeliveryPartner/DeliveryOrders";
import DeliveryOrderDetails from "./src/Screens/DeliveryPartner/DeliveryOrderDetails";
import DeliveryEarnings from "./src/Screens/DeliveryPartner/DeliveryEarnings";
import DeliveryHistory from "./src/Screens/DeliveryPartner/DeliveryHistory";
import DeliveryCurrentOrder from "./src/Screens/DeliveryPartner/DeliveryCurrentOrder";



const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="DeliveryHome"> */}

          {/* AUTH FLOW */}
          <Stack.Screen name="Auth" component={AuthStack} />

          {/* MAIN APP */}
          <Stack.Screen name="Main" component={BottomTabs} />

          {/* GLOBAL SCREENS */}
          <Stack.Screen name="ProductsList" component={ProductsList} />
          <Stack.Screen name="CategoryProducts" component={CategoryProducts} />
          <Stack.Screen name="Details" component={Details} />
          <Stack.Screen name="Cart" component={Cart} />

          {/* ORDER SCREENS */}
          <Stack.Screen name="Checkout" component={Checkout} />
          <Stack.Screen name="OrderSuccess" component={OrderSuccess} />
          <Stack.Screen name="OrderDetails" component={OrderDetails} />

          {/* PROFILE SCREENS */}
          <Stack.Screen name="ShippingAddress" component={ShippingAddress} />
          <Stack.Screen name="EditProfile" component={EditProfile} />
          <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
          <Stack.Screen name="Settings" component={Settings} />

          {/* Admin SCREENS */}
          <Stack.Screen name="AdminAuth" component={AdminAuth} />
          <Stack.Screen name="AdminHome" component={AdminHome} />
          <Stack.Screen name="AdminOrders" component={AdminOrders} />
          <Stack.Screen name="AdminOrderDetails" component={AdminOrderDetails} />
          <Stack.Screen name="AdminProducts" component={AdminProducts} />
          <Stack.Screen name="AdminProductForm" component={AdminProductForm} />
          <Stack.Screen name="AdminUsers" component={AdminUsers} />
          <Stack.Screen name="AdminUserDetails" component={AdminUserDetails} />


          {/* Delivery SCREENS */}
          <Stack.Screen name="DeliveryAuth" component={DeliveryAuth} />
          <Stack.Screen name="DeliveryHome" component={DeliveryHome} />
          <Stack.Screen name="DeliveryProfile" component={DeliveryProfile} />
          <Stack.Screen name="EditDeliveryProfile" component={EditDeliveryProfile} />
          <Stack.Screen name="DeliveryOrders" component={DeliveryOrders} />
          <Stack.Screen name="DeliveryOrderDetails" component={DeliveryOrderDetails} />
          <Stack.Screen name="DeliveryEarnings" component={DeliveryEarnings} />
          <Stack.Screen name="DeliveryHistory" component={DeliveryHistory} />
          <Stack.Screen name="DeliveryCurrentOrder" component={DeliveryCurrentOrder} />


        </Stack.Navigator>

        {/* Toast should be OUTSIDE navigator */}
        <Toast />
      </NavigationContainer>
    </Provider>
  );
}
