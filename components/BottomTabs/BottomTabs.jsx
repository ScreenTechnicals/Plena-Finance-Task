import { View, Text } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../../screens/Home";
import Categories from "../../screens/Categories";
import Favourites from "../../screens/Favourites";
import More from "../../screens/More";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      backBehavior={"initialRoute"}
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: "absolute",
          bottom: 15,
          width: "95%",
          left: 10,
          borderRadius: 20,
          //   paddingTop: 35,
          height: 60,
          //   paddingBottom: 35,
          backgroundColor: "#fff",
          shadowColor: "black",
        },
      }}
    >
      <Tab.Group>
        <Tab.Screen
          options={{
            tabBarLabel: "Home",
            tabBarIcon: ({ focused }) => {
              return (
                <View
                  className={
                    focused
                      ? "bg-[#000] shadow-md shadow-[#000] p-4 rounded-full absolute bottom-5"
                      : "p-3 rounded-full "
                  }
                >
                  <Entypo
                    name="home"
                    size={focused ? 25 : 30}
                    color={focused ? "#f0c537" : "black"}
                  />
                </View>
              );
            },
          }}
          name="Home"
          component={Home}
        />
        <Tab.Screen
          options={{
            tabBarLabel: "Categories",
            tabBarIcon: ({ focused }) => {
              return (
                <View
                  className={
                    focused
                      ? "bg-[#000] shadow-md shadow-[#000] p-4 rounded-full absolute bottom-5"
                      : "p-3 rounded-full "
                  }
                >
                  <MaterialIcons
                    name="category"
                    size={focused ? 25 : 30}
                    color={focused ? "#f0c537" : "black"}
                  />
                </View>
              );
            },
          }}
          name="Categories"
          component={Categories}
        />
        <Tab.Screen
          options={{
            tabBarLabel: "Favourites",
            tabBarIcon: ({ focused }) => {
              return (
                <View
                  className={
                    focused
                      ? "bg-[#000] shadow-md shadow-[#000] p-4 rounded-full absolute bottom-5"
                      : "p-3 rounded-full "
                  }
                >
                  <AntDesign
                    name="heart"
                    size={focused ? 25 : 30}
                    color={focused ? "#f0c537" : "black"}
                  />
                </View>
              );
            },
          }}
          name="Favourites"
          component={Favourites}
        />
        <Tab.Screen
          options={{
            tabBarLabel: "More",
            tabBarIcon: ({ focused }) => {
              return (
                <View
                  className={
                    focused
                      ? "bg-[#000] shadow-md shadow-[#000] p-4 rounded-full absolute bottom-5"
                      : "p-3 rounded-full "
                  }
                >
                  <Entypo
                    name="dots-three-vertical"
                    size={focused ? 25 : 30}
                    color={focused ? "#f0c537" : "black"}
                  />
                </View>
              );
            },
          }}
          name="More"
          component={More}
        />
      </Tab.Group>
    </Tab.Navigator>
  );
};

export default BottomTabs;
// <AntDesign name="hearto" size={24} color={focused ? "#f0c537" : "black"} />
