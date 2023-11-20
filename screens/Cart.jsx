import { View, Text, TouchableOpacity, FlatList, Image } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { AntDesign } from "@expo/vector-icons";
import useCartStore from "../utils/cartStore";

const Cart = ({ navigation }) => {
  const { addProduct, items, reduceProduct, products, subtotal, clearCart } =
    useCartStore(); // cart state magnaer

  let x = 1; // used for index in flat list

  return (
    <SafeAreaView className="w-full bg-white h-full">
      <StatusBar backgroundColor={"#fff"} />
      <View className="p-5 flex items-center flex-row gap-5">
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          className="bg-gray-100 p-2 rounded-full w-[45px] flex items-center justify-center h-[45px]"
        >
          <Ionicons name="chevron-back-outline" size={25} color="black" />
        </TouchableOpacity>
        <Text className="text-xl" style={{ fontFamily: "Manrope_400Regular" }}>
          Shopping Cart({items})
        </Text>
      </View>
      {products?.length > 0 ? (
        <View className="px-5 max-h-[45vh]">
          <FlatList
            data={products}
            renderItem={({ item }) => {
              return (
                <View className="w-full flex flex-row items-center justify-between border-b border-gray-200 py-4 px-2">
                  <View>
                    <Image
                      className="mx-auto w-[70px] h-[35px]"
                      source={{ uri: item?.thumbnail }}
                    />
                  </View>
                  <View className="w-1/3">
                    <Text style={{ fontFamily: "Manrope_400Regular" }}>
                      ${item?.title}
                    </Text>
                    <Text style={{ fontFamily: "Manrope_400Regular" }}>
                      ${item?.price}
                    </Text>
                  </View>
                  <View className="flex items-center flex-row gap-3">
                    <TouchableOpacity
                      onPress={() => {
                        addProduct(item);
                      }}
                      className="w-[40px] h-[40px] flex items-center justify-center bg-gray-100 rounded-full"
                    >
                      <AntDesign name="plus" size={20} color="black" />
                    </TouchableOpacity>
                    <Text style={{ fontFamily: "Manrope_400Regular" }}>
                      {item?.quantity}
                    </Text>
                    <TouchableOpacity
                      onPress={() => {
                        reduceProduct(item);
                      }}
                      className="w-[40px] h-[40px] flex items-center justify-center bg-gray-100 rounded-full"
                    >
                      <AntDesign name="minus" size={20} color="black" />
                    </TouchableOpacity>
                  </View>
                </View>
              );
            }}
            keyExtractor={(item) => x++}
          />
        </View>
      ) : (
        <View className="w-full h-[40vh] flex items-center justify-center">
          <Image
            source={require("../assets/gifs/emptycart.gif")}
            className="w-[300px] h-[300px] mx-auto"
          />
        </View>
      )}

      {products?.length > 0 && (
        <View className="flex flex-row justify-end items-center px-5">
          <TouchableOpacity
            onPress={() => {
              clearCart();
            }}
            className="w-max"
          >
            <Text
              style={{ fontFamily: "Manrope_400Regular" }}
              className="text-base text-[#2A4BA0]"
            >
              Clear Cart
            </Text>
          </TouchableOpacity>
        </View>
      )}
      <View className="w-full p-2 absolute  -bottom-16">
        <View className="p-5 w-full bg-[#F8F9FB] rounded-t-3xl h-[40vh]">
          <View className="flex px-5 pb-5 w-full flex-row justify-between items-center">
            <Text
              style={{ fontFamily: "Manrope_500Medium" }}
              className="text-xl text-gray-600"
            >
              Subtotal
            </Text>
            <Text className="text-xl ">${subtotal}</Text>
          </View>
          <View className="flex px-5 pb-5  w-full flex-row justify-between items-center">
            <Text
              style={{ fontFamily: "Manrope_500Medium" }}
              className="text-xl text-gray-600"
            >
              Delivery
            </Text>
            <Text className="text-xl ">${items > 0 ? 2 : 0}</Text>
          </View>
          <View className="flex px-5 pb-5  w-full flex-row justify-between items-center">
            <Text
              style={{ fontFamily: "Manrope_500Medium" }}
              className="text-xl text-gray-600"
            >
              Total
            </Text>
            <Text className="text-xl ">${items > 0 ? subtotal + 2 : 0}</Text>
          </View>
          <View>
            <TouchableOpacity className="w-full rounded-3xl bg-[#2A4BA0] p-5">
              <Text className="text-center text-white text-base">
                Proceed To checkout
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Cart;
