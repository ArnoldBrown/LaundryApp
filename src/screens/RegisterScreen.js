import {
  StyleSheet,
  Text,
  View,
  Pressable,
  TextInput,
  SafeAreaView,
  KeyboardAvoidingView,
  Alert
} from "react-native";
// import { Feather } from '@expo/vector-icons';
// import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
// import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const navigation = useNavigation();

  const validateEmail = (email) => {
    if (!email) return { valid: false, message: 'Email is required' };

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const isValid = emailPattern.test(email);

    return isValid ? { valid: true, message: '' } : { valid: false, message: 'Invalid email address' };
  };

  const validateMobile = (mobile) => {
    if (!mobile) return { valid: false, message: 'Mobile number is required' };
  
    const mobilePattern = /^\+?[1-9]\d{1,14}$/;
    const isValid = mobilePattern.test(mobile);
  
    return isValid ? { valid: true, message: '' } : { valid: false, message: 'Invalid mobile number' };
  };

  const register = () => {

    if (email === "" || password === "" || phone === "") {
      Alert.alert(
        "Invalid Details",
        "Please fill all the details",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ],
        { cancelable: false }
      );
    }
    if (email !== "" && password !== "" && phone !== "") {
      const emailValidation = validateEmail(email);
      if (!emailValidation.valid) {
        Alert.alert('Validation Error', emailValidation.message);
        return;
      }
    }

    if (email !== "" && password !== "" && phone !== "") {
      const mobileValidation = validateMobile(mobile);
      if (!mobileValidation.valid) {
        Alert.alert('Validation Error', mobileValidation.message);
        return;
      }
    }

    createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
      console.log("user credential", userCredential);
      const user = userCredential._tokenResponse.email;
      const myUserUid = auth.currentUser.uid;

      setDoc(doc(db, "users", `${myUserUid}`), {
        email: user,
        phone: phone
      })
    })
  }
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "white",
        alignItems: "center",
        padding: 10,
      }}
    >
      <KeyboardAvoidingView>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: 100,
          }}
        >
          <Text style={{ fontSize: 20, color: "#662d91", fontWeight: "bold" }}>
            Register
          </Text>

          <Text style={{ fontSize: 18, marginTop: 8, fontWeight: "600" }}>
            Create a new Account
          </Text>
        </View>

        <View style={{ marginTop: 50 }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            {/* <MaterialCommunityIcons
              name="email-outline"
              size={24}
              color="black"
            /> */}
             <MaterialIcons name="email" size={24} color="black" />
            <TextInput
              placeholder="Email"
              value={email}
              onChangeText={(text) => setEmail(text)}
              placeholderTextColor="black"
              style={{
                fontSize: email ? 18 : 18,
                borderBottomWidth: 1,
                borderBottomColor: "gray",
                marginLeft: 13,
                width: 300,
                marginVertical: 10,
                color: '#000'
              }}
            />
          </View>

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            {/* <Ionicons name="key-outline" size={24} color="black" /> */}
            <MaterialIcons name="vpn-key" size={24} color="black" />
            <TextInput
              value={password}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry={true}
              placeholder="Password"
              placeholderTextColor="black"
              style={{
                fontSize: password ? 18 : 18,
                borderBottomWidth: 1,
                borderBottomColor: "gray",
                marginLeft: 13,
                width: 300,
                marginVertical: 20,
                color: '#000'
              }}
            />
          </View>

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            {/* <Feather name="phone" size={24} color="black" /> */}
            <MaterialIcons name="phone-iphone" size={24} color="black" />
            <TextInput
              value={phone}
              onChangeText={(text) => setPhone(text)}
              placeholder="Phone No"
              placeholderTextColor="black"
              style={{
                fontSize: password ? 18 : 18,
                borderBottomWidth: 1,
                borderBottomColor: "gray",
                marginLeft: 13,
                width: 300,
                marginVertical: 10,
                color: '#000'
              }}
            />
          </View>

          <Pressable
            onPress={register}
            style={{
              width: 200,
              backgroundColor: "#318CE7",
              padding: 15,
              borderRadius: 7,
              marginTop: 50,
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <Text style={{ fontSize: 18, textAlign: "center", color: "white" }}>
              Register
            </Text>
          </Pressable>

          <Pressable onPress={() => navigation.goBack()} style={{ marginTop: 20 }}>
            <Text
              style={{
                textAlign: "center",
                fontSize: 17,
                color: "gray",
                fontWeight: "500",
              }}
            >
              Already have a account? Sign in
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({});
