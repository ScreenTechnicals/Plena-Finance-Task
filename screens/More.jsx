import { View, Text, SafeAreaView } from "react-native";
import React from "react";

const More = () => {
  return (
    <SafeAreaView className="w-full bg-white h-full pt-7">
      <View className="flex items-center justify-center w-full h-full">
        <Text className="text-black text-xl uppercase text-center  font-[600]">
          More
        </Text>
        <Text className="text-black text-sm uppercase text-centerfont-[600]">
          Coming Soon
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default More;
