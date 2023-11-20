import {
  Dimensions,
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import Carousel from "react-native-reanimated-carousel";
import { AirbnbRating } from "react-native-ratings";
import useCartStore from "../utils/cartStore";
import useFavStore from "../utils/favouriteStore";

const Product = ({ navigation, route }) => {
  const { item } = route.params; //  get the the props
  const width = Dimensions.get("window").width; // get the width of the mobile screen
  const { addProduct, items } = useCartStore(); // cart state magnaer
  const { addFavProduct, fav_products, removeFavProduct } = useFavStore(); // favourite products state manager
  const isFav = fav_products?.filter((p) => p.isFav); // checking that the given item is added to the favourite list or not

  return (
    <SafeAreaView className="w-full bg-white h-full">
      <StatusBar backgroundColor={"#fff"} />
      <View className="p-5 flex items-center justify-between flex-row gap-5">
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          className="bg-gray-100 p-2 rounded-full w-[45px] flex items-center justify-center h-[45px]"
        >
          <Ionicons name="chevron-back-outline" size={25} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Cart");
          }}
          className="relative"
        >
          <MaterialCommunityIcons
            name="shopping-outline"
            size={30}
            color="black"
          />
          <Text
            style={{ fontFamily: "Manrope_400Regular" }}
            className="absolute top-0 bg-[#ffc800] text-base w-6 rounded-full -right-2 text-center h-6"
          >
            {items}
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView>
        <View className="p-5">
          <Text
            className="text-2xl capitalize"
            style={{ fontFamily: "Manrope_300Light" }}
          >
            {item?.brand}
            <Text
              style={{ fontFamily: "Manrope_400Regular" }}
              className="text-xl text-[#2A4BA0]"
            >
              ({item?.category})
            </Text>
          </Text>
          <Text
            className="text-4xl pt-2 capitalize"
            style={{ fontFamily: "Manrope_700Bold" }}
          >
            {item?.title}
          </Text>
          <View
            className="
          r
          elative w-full mb-10 bottom-12"
          >
            <AirbnbRating
              // count={item?.rating}
              defaultRating={item?.rating}
              size={18}
              unSelectedColor={"#000"}
              ratingContainerStyle={{
                padding: 0,
                margin: 0,
                position: "absolute",
              }}
              reviews={[]}
            />
          </View>
        </View>
        <View className="relative bottom-7">
          <TouchableOpacity
            onPress={() => {
              if (!isFav?.find((p) => p?.id === item?.id)) {
                addFavProduct(item);
              } else {
                removeFavProduct(item);
              }
            }}
            className="absolute z-[999] bg-[#000000d8] w-[40px] h-[40px] rounded-full flex right-5 items-center justify-center"
          >
            <AntDesign
              name="heart"
              size={20}
              color={isFav?.find((p) => p?.id === item?.id) ? "red" : "white"}
            />
          </TouchableOpacity>
          <Carousel
            loop
            width={width}
            height={width / 2}
            autoPlay={true}
            data={item?.images}
            scrollAnimationDuration={1000}
            renderItem={({ item, index }) => {
              return (
                <View className="w-full p-3">
                  <View className="shadow-md w-full h-[150px] shadow-gray-500 bg-white border border-gray-100 rounded-md overflow-hidden flex items-center justify-center">
                    <Image
                      width={width}
                      height={width / 2}
                      source={{ uri: item }}
                    />
                  </View>
                </View>
              );
            }}
          />
        </View>
        <View className="relative flex flex-row gap-3 items-center bottom-7 px-5">
          <Text
            style={{ fontFamily: "Manrope_700Bold" }}
            className="text-3xl text-[#2A4BA0]"
          >
            ${item?.price}
          </Text>
          <Text
            style={{ fontFamily: "Manrope_400Regular" }}
            className="text-base bg-[#2A4BA0] rounded-full px-3 py-1 text-white"
          >
            ${item?.discountPercentage}%
          </Text>
        </View>
        <View className="relative flex flex-row gap-3 items-center bottom-7 py-5 px-5">
          <TouchableOpacity
            onPress={() => {
              addProduct(item);
            }}
            className="w-[48%] rounded-2xl border  border-[#2A4BA0] p-3"
          >
            <Text
              style={{ fontFamily: "Manrope_400Regular" }}
              className="text-center text-[#2A4BA0] text-xl"
            >
              Add To Cart
            </Text>
          </TouchableOpacity>
          <TouchableOpacity className="w-[48%] rounded-2xl border border-[#2A4BA0] bg-[#2A4BA0] p-3">
            <Text
              style={{ fontFamily: "Manrope_400Regular" }}
              className="text-center text-[#fff] text-xl"
            >
              Buy Now
            </Text>
          </TouchableOpacity>
        </View>
        <Text
          className="px-5 relative bottom-7 text-xl"
          style={{ fontFamily: "Manrope_500Medium" }}
        >
          Details
        </Text>
        <Text
          className="px-5 relative bottom-7 text-base text-gray-500"
          style={{ fontFamily: "Manrope_400Regular" }}
        >
          {item?.description}
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Product;
