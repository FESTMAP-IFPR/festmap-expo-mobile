import { useTheme } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList
} from "react-native";
import { DrawerLayout, ScrollView } from "react-native-gesture-handler";
import { Appbar, Button } from "react-native-paper";
import { Animated } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import * as Icon from "react-native-feather";
import Categories from "../components/Categories";
import { getEventList } from "../services/event";
import { EventItem } from "../components/EventItem";

const av = new Animated.Value(0);
av.addListener(() => {return});

export const EventsScreen = (props: any) => {
  const theme = useTheme();

  const { navigation } = props;
  const [events, setEvents] = useState<any>([]);
  const styles = makeStyles(theme);
  const handleOpenNewEvent = () => {
    navigation.navigate('AddEventScreen');
  };

  useEffect(() => {
    getEventList().then((data) => setEvents(data))
  },[]);

  const title = () => {
    return (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View style={styles.containerButtons}>
          <Text style={{ color: "#fff" }}>Next</Text>
        </View>
        <View style={styles.containerButtons}>
          <Text style={{ color: theme.colors.primary }}>Events</Text>
        </View>
        <Animated.View style={styles.containerButtons}>
          <Button
            icon="plus"
            dark={true}
            mode="contained"
            textColor="#fff"
            onPress={handleOpenNewEvent}
            contentStyle={{ flexDirection: "row-reverse" }}
          >
            Add
          </Button>
        </Animated.View>
      </View>
    );
  };

  return (
    <SafeAreaView className="bg-white">

        {/* search Bar */}
        <View className="flex-row items-center space-x-2 px-4 pb-2">
          <View className="flex-row flex-1 items-center p-3 rounded-full border border-gray-300 ">
              <Icon.Search height="25" width="25" stroke="gray"/>
              <TextInput placeholder="Eventos" className="ml-2 flex-1" />
              <View className="flex-row items-center space-x-1 border-0 border-l-2 pl-2 border-l-gray-300">
                <Icon.MapPin height={20} width={20} stroke={"gray"} />
                <Text className="text-gray-600">Foz Do Iguaçu, PR</Text>
              </View> 
          </View>
          <View className="p-3 bg-gray-300 rounded-full">
              <Icon.Sliders height={20} width={20} strokeWidth={2.5}  stroke={"white"}/>
          </View>
        </View>
        {/* main */}
        <ScrollView  showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom:20
        }}>
          {/* categories */}
          <Categories/>
          
          {/* featured */}
          <View className="mt-5">
              {
              }
          </View> 
          {/* events */}
        </ScrollView>
        <View className=" mt-4 ">
          <FlatList
            keyExtractor={(item) => item.name}
            data={events}
            contentContainerStyle={{paddingBottom: 20}}
            renderItem={({ item }) => {
              return (<EventItem {...item} /> 
              )
            }}
          ></FlatList>
        </View>
    </SafeAreaView>
  );
};

const makeStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: theme.colors.primaryContainer,
    },
    containerButtons: {
      flexGrow: 1,
      alignItems: "center",
      width: "30%",
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 20,
      color: "#000",
    },
  });
