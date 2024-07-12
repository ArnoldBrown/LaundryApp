import { StyleSheet, Text, Pressable, SafeAreaView } from "react-native";
import React from "react";
import LottieView from "lottie-react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

const OrderScreen = () => {
  const navigation = useNavigation();

  const naviHome = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Home' }],
    })
    // navigation.replace("Home")
  }

  return (
    <SafeAreaView>
      <LottieView
        source={require("../../assets/thumbs.json")}
        style={{
          height: 360,
          width: 300,
          alignSelf: "center",
          marginTop: 40,
          justifyContent: "center",
        }}
        autoPlay
        loop={false}
        speed={0.7}
      />



      <Text
        style={{
          marginTop: 40,
          fontSize: 19,
          fontWeight: "600",
          textAlign: "center",
          color: '#000'
        }}
      >
        Your order has been placed
      </Text>

      <Pressable onPress={() => naviHome()} style={{
        width: '90%',
        backgroundColor: "white",
        borderRadius: 12,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 50,
        padding: 14,
        alignSelf: 'center'
      }}>
        <Text style={{ textAlign: 'center', fontSize: 16, fontWeight: "500", color: '#000' }}>
          Home
        </Text>
      </Pressable>

      <LottieView
        source={require("../../assets/sparkle.json")}
        style={{
          height: 300,
          position: "absolute",
          top: 100,
          width: 300,
          alignSelf: "center",
        }}
        autoPlay
        loop={false}
        speed={0.7}
      />
    </SafeAreaView>
  );
};

export default OrderScreen;

const styles = StyleSheet.create({});
