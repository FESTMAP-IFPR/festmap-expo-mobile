import { useTheme } from "@react-navigation/native";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { DrawerLayout } from "react-native-gesture-handler";
import { Appbar, Button } from "react-native-paper";
import { Animated } from "react-native";

const av = new Animated.Value(0);
av.addListener(() => {return});



export const EventsScreen = (props: any) => {
  const theme = useTheme();

  const { navigation   } = props;

  const styles = makeStyles(theme);
  const handleOpenNewEvent = () => {
    navigation.navigate('AddEventScreen');
  };

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
    <View style={styles.container}>
      {title()}
      <Text style={styles.title}>Upcoming Events Screen</Text>
    </View>
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
      color: "#fff",
    },
  });
