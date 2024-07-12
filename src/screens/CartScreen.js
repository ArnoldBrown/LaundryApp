import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Pressable,
} from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  cleanCart,
  decrementQuantity,
  incrementQuantity,
} from "../redux/CartReducer";
import { decrementQty, incrementQty } from "../redux/ProductReducer";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { COLOR } from "../theme/typography";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const CartScreen = () => {
  const cart = useSelector((state) => state.cart.cart);
  const route = useRoute();
  const total = cart
    .map((item) => item.quantity * item.price)
    .reduce((curr, prev) => curr + prev, 0);
  const navigation = useNavigation();
  const userUid = auth.currentUser.uid;
  const dispatch = useDispatch();
  const placeOrder = async () => {
    navigation.navigate("Order");
    dispatch(cleanCart());
    await setDoc(
      doc(db, "users", `${userUid}`),
      {
        orders: { ...cart },
        pickUpDetails: route.params,
      },
      {
        merge: true,
      }
    );
  };
  return (
    <>
      <ScrollView style={{ marginTop: 50 }}>
        {total === 0 ? (
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Text style={{ marginTop: 40, color:'#000'  }}>Your cart is empty</Text>
          </View>
        ) : (
          <>
            <View
              style={{
                padding: 10,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <MaterialIcons onPress={() => navigation.goBack()} name="arrow-back" size={24} color="black" />
              <Text style={{color:'#000' }}>Your Bucket</Text>
            </View>

            <Pressable
              style={{
                backgroundColor: "white",
                borderRadius: 12,
                marginLeft: 10,
                marginRight: 10,
                padding: 14,
              }}
            >
              {cart.map((item, index) => (
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginVertical: 12,
                  }}
                  key={index}
                >
                  <Text style={{ width: 100, fontSize: 16, fontWeight: "500", color:'#000'  }}>
                    {item.name}
                  </Text>

                  {/* - + button */}
                  <Pressable
                    style={{
                      flexDirection: "row",
                      paddingHorizontal: 10,
                      paddingVertical: 5,
                      alignItems: "center",
                      borderColor: "#BEBEBE",
                      borderWidth: 0.5,
                      borderRadius: 10,
                    }}
                  >
                    <Pressable
                      onPress={() => {
                        dispatch(decrementQuantity(item)); // cart
                        dispatch(decrementQty(item)); // product
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 20,
                          color: COLOR.PRIMARY,
                          paddingHorizontal: 6,
                          fontWeight: "600",
                        }}
                      >
                        -
                      </Text>
                    </Pressable>

                    <Pressable>
                      <Text
                        style={{
                          fontSize: 19,
                          color: COLOR.PRIMARY,
                          paddingHorizontal: 8,
                          fontWeight: "600",
                        }}
                      >
                        {item.quantity}
                      </Text>
                    </Pressable>

                    <Pressable
                      onPress={() => {
                        dispatch(incrementQuantity(item)); // cart
                        dispatch(incrementQty(item)); //product
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 20,
                          color: COLOR.PRIMARY,
                          paddingHorizontal: 6,
                          fontWeight: "600",
                        }}
                      >
                        +
                      </Text>
                    </Pressable>
                  </Pressable>

                  <Text style={{ fontSize: 16, fontWeight: "500", color:'#000'  }}>
                    ${item.price * item.quantity}
                  </Text>
                </View>
              ))}
            </Pressable>

            <View style={{ marginHorizontal: 10 }}>
              <Text style={{ fontSize: 16, fontWeight: "bold", marginTop: 30, color:'#000'  }}>
                Billing Details
              </Text>
              <View
                style={{
                  backgroundColor: "white",
                  borderRadius: 7,
                  padding: 10,
                  marginTop: 15,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Text
                    style={{ fontSize: 18, fontWeight: "400", color: "gray" }}
                  >
                    Item Total
                  </Text>
                  <Text style={{ fontSize: 18, fontWeight: "400", color:'#000'  }}>
                    ₹{total}
                  </Text>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginVertical: 8,
                  }}
                >
                  <Text
                    style={{ fontSize: 18, fontWeight: "400", color: "gray" }}
                  >
                    Delivery Fee | 1.2KM
                  </Text>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: "400",
                      color: COLOR.PRIMARY,
                    }}
                  >
                    FREE
                  </Text>
                </View>

                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text
                    style={{ fontSize: 18, fontWeight: "500", color: "gray" }}
                  >
                    Free Delivery on Your order
                  </Text>
                </View>

                <View
                  style={{
                    borderColor: "gray",
                    height: 1,
                    borderWidth: 0.5,
                    marginTop: 10,
                  }}
                />

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginVertical: 10,
                  }}
                >
                  <Text
                    style={{ fontSize: 18, fontWeight: "500", color: "gray" }}
                  >
                    Selected Date
                  </Text>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: "400",
                      color: COLOR.PRIMARY,
                    }}
                  >
                    {/* {route.params.pickUpDate} */}
                  </Text>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Text
                    style={{ fontSize: 18, fontWeight: "500", color: "gray" }}
                  >
                    No Of Days
                  </Text>

                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: "400",
                      color: COLOR.PRIMARY,
                    }}
                  >
                    {route.params.no_Of_days}
                  </Text>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginVertical: 10,
                  }}
                >
                  <Text
                    style={{ fontSize: 18, fontWeight: "500", color: "gray" }}
                  >
                    Selected Pick Up Time
                  </Text>

                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: "400",
                      color: COLOR.PRIMARY,
                    }}
                  >
                    {route.params.selectedTime}
                  </Text>
                </View>
                <View
                  style={{
                    borderColor: "gray",
                    height: 1,
                    borderWidth: 0.5,
                    marginTop: 10,
                  }}
                />

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginVertical: 8,
                  }}
                >
                  <Text style={{ fontSize: 18, fontWeight: "bold",color:'#000'  }}>
                    To Pay
                  </Text>
                  <Text style={{ fontSize: 18, fontWeight: "bold",color:'#000'  }}>
                    {total + 95}
                  </Text>
                </View>
              </View>
            </View>
          </>
        )}
      </ScrollView>

      {total === 0 ? null : (
        <Pressable
          style={{
            backgroundColor: COLOR.PRIMARY,
            marginTop: "auto",
            padding: 10,
            marginBottom: 40,
            margin: 15,
            borderRadius: 7,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View>
            <Text style={{ fontSize: 17, fontWeight: "600", color: "white" }}>
              {cart.length} items | $ {total}
            </Text>
            <Text
              style={{
                fontSize: 15,
                fontWeight: "400",
                color: "white",
                marginVertical: 6,
              }}
            >
              extra charges might apply
            </Text>
          </View>

          <Pressable onPress={placeOrder}>
            <Text style={{ fontSize: 17, fontWeight: "600", color: "white" }}>
              Place Order
            </Text>
          </Pressable>
        </Pressable>
      )}
    </>
  );
};

export default CartScreen;

const styles = StyleSheet.create({});
