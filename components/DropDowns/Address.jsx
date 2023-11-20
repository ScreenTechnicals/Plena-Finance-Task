import { View, Text, TouchableOpacity, TextInput, Alert } from "react-native";
import React, { useState } from "react";

const Address = ({ toggleAddress, setToggleAddress, address, setAddress }) => {
  const [currentAddress, setCurrentAddress] = useState("");
  const [Country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");

  return (
    <View className="w-[95%]  bg-[#ffffff] absolute top-[20%] left-[2.5%] p-5 rounded-md shadow-md shadow-[#000] border border-gray-200">
      <View className="flex items-center justify-center flex-row">
        <Text className="text-2xl text-center font-[600]">
          Enter Your Address
        </Text>
      </View>
      <View>
        <View className="relative mt-4">
          <Text className="bg-white absolute -top-[10.5px] left-3 z-[999]">
            Your Current Address
          </Text>
          <TextInput
            onChangeText={setCurrentAddress}
            value={currentAddress}
            className="w-full border border-gray-200 focus:border-gray-400 p-2 rounded-md"
          />
        </View>
        <View className="relative mt-4">
          <Text className="bg-white absolute -top-[10.5px] left-3 z-[999]">
            Country
          </Text>
          <TextInput
            onChangeText={setCountry}
            value={Country}
            className="w-full border border-gray-200 focus:border-gray-400 p-2 rounded-md"
          />
        </View>
        <View className="relative mt-4">
          <Text className="bg-white absolute -top-[10.5px] left-3 z-[999]">
            State
          </Text>
          <TextInput
            onChangeText={setState}
            value={state}
            className="w-full border border-gray-200 focus:border-gray-400 p-2 rounded-md"
          />
        </View>
        <View className="relative mt-4">
          <Text className="bg-white absolute -top-[10.5px] left-3 z-[999]">
            Zip Code
          </Text>
          <TextInput
            onChangeText={setZip}
            value={zip}
            keyboardType="numeric"
            className="w-full border border-gray-200 focus:border-gray-400 p-2 rounded-md"
          />
        </View>
        <View className="flex flex-row items-center justify-between">
          <TouchableOpacity
            onPress={() => {
              setToggleAddress(false);
            }}
            className="w-[45%]"
          >
            <Text className="text-md text-center rounded-md mt-4 p-3 text-white bg-[#a04b2a] w-full ">
              Cancel
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              if (currentAddress && Country && state && zip) {
                setAddress([currentAddress, Country, state, zip].join(";"));
                setToggleAddress(false);
              } else {
                Alert.alert("🚨 Attention", "All fields must be filled!");
              }
            }}
            className="w-[45%]"
          >
            <Text className="text-md text-center rounded-md mt-4 p-3 text-white bg-[#2A4BA0] w-full ">
              Save
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Address;
