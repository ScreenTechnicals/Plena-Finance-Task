import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  StyleSheet,
  Image,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { MotiView } from "moti";
import { Skeleton } from "moti/skeleton";
import Address from "../components/DropDowns/Address";
import { Picker } from "@react-native-picker/picker";
import useCartStore from "../utils/cartStore";
import useFavStore from "../utils/favouriteStore";
import { StatusBar } from "expo-status-bar";

const Home = ({ navigation }) => {
  const [loading, setLoading] = useState(true);

  const user = {
    email: "rahul@gmail.com",
    uid: "p-90uoi*iu98y7t6re586r97tug",
    token: "89trfl&*Tgiup9y60*TIUFT*TUgjb)",
    name: "Rahul",
    image: "",
  };

  const [products, setProducts] = useState(null);

  const getProducts = async () => {
    setLoading(true);
    await fetch("https://dummyjson.com/products", {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("🚨 ERROR: ", err?.message);
        return {
          success: false,
          data: [],
        };
      });
  };
  const pickerRef = useRef();
  useEffect(() => {
    if (loading) {
      if (products === null) {
        getProducts();
      }
    }
  });

  const colorMode = "light";
  function open() {
    pickerRef.current.focus();
  }

  const [toggleAddress, setToggleAddress] = useState(false);

  const [selectedTime, setSelectedTime] = useState("1 hour");

  const { addProduct, items } = useCartStore();
  const { addFavProduct, fav_products, removeFavProduct } = useFavStore();

  const [searchTerm, setSearchTerm] = useState("");

  const [address, setAddress] = useState("Add Address");
  return (
    <SafeAreaView className="w-full bg-white h-full">
      <StatusBar backgroundColor={"#2A4BA0"} style={"light"} />
      <View className="w-full rounded-b-md py-5 bg-[#2A4BA0] ">
        <View className="flex my-5 flex-row px-5 justify-between items-center">
          <Text
            className="text-2xl text-white font-[500]"
            style={{ fontFamily: "Manrope_600SemiBold" }}
          >
            Hey, Rahul
          </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Cart", {
                user: user,
                products: products,
              });
            }}
            className="relative"
          >
            <MaterialCommunityIcons
              name="shopping-outline"
              size={30}
              color="white"
            />
            <Text
              style={{ fontFamily: "Manrope_400Regular" }}
              className="absolute top-0 bg-[#ffc800] text-base w-6 rounded-full -right-2 text-center h-6"
            >
              {items}
            </Text>
          </TouchableOpacity>
        </View>
        <View className="mt-2 mx-4 rounded-full relative flex items-center justify-start flex-row">
          <View className="absolute z-[99] top-[35%] left-7">
            <AntDesign name="search1" size={20} color="#fff" />
          </View>
          <TextInput
            className="w-full bg-[#153075] text-white py-4 text-lg pl-14 pr-6 rounded-full"
            placeholder="Search Products Or Store"
            placeholderTextColor={"#8891A5"}
            style={{ fontFamily: "Manrope_400Regular" }}
            value={searchTerm}
            onChangeText={setSearchTerm}
          />
        </View>
        <View className="px-5 pt-5 flex flex-row justify-between items-center">
          <View className="">
            <Text
              style={{ fontFamily: "Manrope_600SemiBold" }}
              className="text-gray-300 uppercase text-xs"
            >
              Delivery to
            </Text>
            <TouchableOpacity
              onPress={() => {
                setToggleAddress(true);
              }}
              className="flex flex-row items-center gap-2"
            >
              <Text
                style={{ fontFamily: "Manrope_400Regular" }}
                className="text-white text-base"
              >
                {address?.split(";")?.[0]}
              </Text>
              <FontAwesome name="angle-down" size={24} color="#f1f1f1" />
            </TouchableOpacity>
          </View>
          <View className="">
            <Text
              style={{ fontFamily: "Manrope_600SemiBold" }}
              className="text-gray-300 uppercase relative top-4 text-xs"
            >
              Within
            </Text>
            <TouchableOpacity
              onPress={open}
              className="flex flex-row items-center gap-2"
            >
              <Text
                style={{ fontFamily: "Manrope_400Regular" }}
                className="text-white text-base uppercase"
              >
                {selectedTime}
              </Text>

              <View className="relative left-7">
                <Picker
                  ref={pickerRef}
                  selectedValue={selectedTime}
                  onValueChange={(itemValue, itemIndex) =>
                    setSelectedTime(itemValue)
                  }
                  dropdownIconColor={"white"}
                >
                  <Picker.Item label={"1 HOUR"} value={"1 HOUR"} />
                  <Picker.Item label={"6 HOUR"} value={"6 HOUR"} />
                  <Picker.Item label={"12 HOUR"} value={"12 HOUR"} />
                  <Picker.Item label={"24 HOUR"} value={"24HOUR"} />
                </Picker>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View className="w-full relative h-[70vh] pb-20">
        <ScrollView>
          {loading ? (
            <ScrollView horizontal={true}>
              <MotiView
                transition={{
                  type: "timing",
                }}
                className="w-[230px] m-4 h-[110px] p-5 bg-[#F9B023] rounded-md shadow-sm shadow-[#000]"
                animate={{ backgroundColor: "#f1f1F1" }}
              >
                <Skeleton colorMode={colorMode} width={"100%"} />
                <Spacer height={5} />
                <Skeleton colorMode={colorMode} width={"100%"} />
              </MotiView>
              <MotiView
                transition={{
                  type: "timing",
                }}
                className="w-[230px] m-4 h-[110px] p-5 bg-[#F9B023] rounded-md shadow-sm shadow-[#000]"
                animate={{ backgroundColor: "#f1f1F1" }}
              >
                <Skeleton colorMode={colorMode} width={"100%"} />
                <Spacer height={5} />
                <Skeleton colorMode={colorMode} width={"100%"} />
              </MotiView>
              <MotiView
                transition={{
                  type: "timing",
                }}
                className="w-[230px] m-4 h-[110px] p-5 bg-[#F9B023] rounded-md shadow-sm shadow-[#000]"
                animate={{ backgroundColor: "#f1f1F1" }}
              >
                <Skeleton colorMode={colorMode} width={"100%"} />
                <Spacer height={5} />
                <Skeleton colorMode={colorMode} width={"100%"} />
              </MotiView>
            </ScrollView>
          ) : (
            <ScrollView horizontal={true}>
              {products?.products?.slice(3, 9)?.map((item, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      navigation.navigate("Product", {
                        item: item,
                        user: user,
                        products: products,
                      });
                    }}
                    className="w-[230px] m-4 h-[110px] bg-[#F9B023] rounded-md shadow-sm shadow-[#000]"
                  >
                    <View>
                      <Image
                        className="mx-auto w-full h-full rounded-md"
                        source={{ uri: item?.thumbnail }}
                      />
                    </View>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          )}

          <Text
            style={{ fontFamily: "Manrope_400Regular" }}
            className="text-black text-3xl px-5"
          >
            {searchTerm?.length > 0
              ? "Results For: " + searchTerm
              : "Recommended"}
          </Text>
          <View className="w-[100px] p-1 bg-[#2A4BA0] rounded-sm mx-5 mb-5"></View>
          {loading ? (
            <View className="flex flex-row flex-wrap justify-between px-5 gap-3 pb-28">
              <MotiView
                transition={{
                  type: "timing",
                }}
                className="w-[45%] bg-gray-300 p-3 flex items-center justify-center rounded-xl h-[170px]"
                animate={{ backgroundColor: "#f1f1F1" }}
              >
                <Skeleton colorMode={colorMode} width={"100%"} height={100} />
                <Spacer height={3} />
                <Skeleton colorMode={colorMode} width={"100%"} />
              </MotiView>
              <MotiView
                transition={{
                  type: "timing",
                }}
                className="w-[45%] bg-gray-300 p-3 flex items-center justify-center rounded-xl h-[170px]"
                animate={{ backgroundColor: "#f1f1F1" }}
              >
                <Skeleton colorMode={colorMode} width={"100%"} height={100} />
                <Spacer height={3} />
                <Skeleton colorMode={colorMode} width={"100%"} />
              </MotiView>
              <MotiView
                transition={{
                  type: "timing",
                }}
                className="w-[45%] bg-gray-300 p-3 flex items-center justify-center rounded-xl h-[170px]"
                animate={{ backgroundColor: "#f1f1F1" }}
              >
                <Skeleton colorMode={colorMode} width={"100%"} height={100} />
                <Spacer height={3} />
                <Skeleton colorMode={colorMode} width={"100%"} />
              </MotiView>
              <MotiView
                transition={{
                  type: "timing",
                }}
                className="w-[45%] bg-gray-300 p-3 flex items-center justify-center rounded-xl h-[170px]"
                animate={{ backgroundColor: "#f1f1F1" }}
              >
                <Skeleton colorMode={colorMode} width={"100%"} height={100} />
                <Spacer height={3} />
                <Skeleton colorMode={colorMode} width={"100%"} />
              </MotiView>
            </View>
          ) : (
            <View className="flex flex-row flex-wrap justify-between px-5 gap-3 pb-28">
              {products?.products?.length > 0 &&
                products?.products?.map((item, index) => {
                  const isFav = fav_products?.filter((p) => p.isFav);
                  if (
                    item?.title
                      ?.toLowerCase()
                      ?.includes(searchTerm?.toLowerCase())
                  ) {
                    return (
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate("Product", {
                            item: item,
                            user: user,
                            products: products,
                          });
                        }}
                        key={index}
                        className="w-[45%] shadow-md border border-gray-100  bg-[#fff] p-3 rounded-xl shadow-gray-400 "
                      >
                        <View className="w-full relative">
                          <TouchableOpacity
                            onPress={() => {
                              if (!isFav?.find((p) => p?.id === item?.id)) {
                                addFavProduct(item);
                              } else {
                                removeFavProduct(item);
                              }
                            }}
                            className="absolute z-[999] bg-[#000000d8] w-[40px] h-[40px] rounded-full -top-5 -left-5 flex items-center justify-center"
                          >
                            <AntDesign
                              name="heart"
                              size={20}
                              color={
                                isFav?.find((p) => p?.id === item?.id)
                                  ? "red"
                                  : "white"
                              }
                            />
                          </TouchableOpacity>
                          <Image
                            className="mx-auto w-full h-[70px] rounded-md"
                            source={{ uri: item?.thumbnail }}
                          />
                          <View className="flex items-center justify-between flex-row my-3">
                            <Text
                              className="text-base"
                              style={{ fontFamily: "Manrope_600SemiBold" }}
                            >
                              ${item?.price}
                            </Text>
                            <TouchableOpacity
                              onPress={() => {
                                addProduct(item);
                              }}
                              className="w-[30px] h-[30px] flex items-center justify-center bg-[#2A4BA0] rounded-full"
                            >
                              <AntDesign name="plus" size={20} color="white" />
                            </TouchableOpacity>
                          </View>
                          <Text
                            className="text-sm"
                            style={{ fontFamily: "Manrope_400Regular" }}
                          >
                            {item?.title}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    );
                  }
                })}
            </View>
          )}
        </ScrollView>
      </View>
      {toggleAddress && (
        <Address
          toggleAddress={toggleAddress}
          setToggleAddress={setToggleAddress}
          address={address}
          setAddress={setAddress}
        />
      )}
    </SafeAreaView>
  );
};

export default Home;
const Spacer = ({ height = 16 }) => <View style={{ height }} />;

const styles = StyleSheet.create({
  shape: {
    justifyContent: "center",
    height: 250,
    width: 250,
    borderRadius: 25,
    marginRight: 10,
    backgroundColor: "white",
  },
  container: {
    flex: 1,
    justifyContent: "center",
  },
  padded: {
    padding: 16,
  },
  row: {
    flexDirection: "row",
    padding: 10,
    flexWrap: "wrap",
  },
  rowIndented: {
    marginLeft: 30,
  },
  right: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  textName: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#222222",
  },
  textUsername: {
    fontSize: 15,
    marginLeft: 5,
    color: "#4f5153",
  },
  textPost: {
    fontSize: 15,
    color: "#4f5153",
  },
  actions: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 20,
  },
  heart: {
    width: 20,
    height: 20,
    tintColor: "#6e7f8d",
  },
  heartFilled: {
    tintColor: "#df245e",
  },
  heartLottie: {
    width: 50,
    height: 50,
    marginLeft: -5,
  },
  textDate: {
    color: "#6e7f8d",
    fontSize: 14,
  },
});
