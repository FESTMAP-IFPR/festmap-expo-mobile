import React, { useRef, useState } from "react";
import { View, StyleSheet } from "react-native";
import { Text, TextInput, useTheme } from "react-native-paper";

import Animated from "react-native-reanimated";
import { EventData } from "../interfaces/interfaces";
import { FAB } from "react-native-paper";
import { ScrollView } from "react-native-gesture-handler";
import { TouchableWithoutFeedback, Keyboard } from 'react-native';
import ViewPager from '@react-native-community/viewpager';


export const AddEventScreen = () => {
  const [event, setEvent] = useState<EventData>({});

  const theme = useTheme();

  const styles = makeStyles(theme);
  const [index, setIndex] = useState(1);

  const pagerRef = useRef(null);
  // const handlePageChange = pageNumber => {
  //   pagerRef.current.setPage(pageNumber);
  // };

  const handleRegisterEvent = () => {
    console.log(event);
  }

  return (
    <View style={styles.container} >
          <Text style={{ color: '#fff' }}> page 1 </Text>
          <TextInput
            style={styles.nameInput}
            textColor="#E5ECF4"
            placeholderTextColor={"#E5ECF4"}
            mode="flat"
            placeholder="Name"
            onChangeText={(text) =>
              setEvent((prevState) => ({
                ...prevState,
                name: text,
              }))
            }
            value={event.name}
          />
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={{ width: "100%", height: 100 }}
              contentContainerStyle={{ width: "100%", height: 200 }}
            >
              <TextInput
                multiline={true}
                numberOfLines={2}
                style={styles.descriptionInput}
                textColor="#E5ECF4"
                placeholderTextColor={"#E5ECF4"}
                mode="flat"
                dense={true}
                placeholder="Description"
                onChangeText={(text) =>
                  setEvent((prevState) => ({
                    ...prevState,
                    description: text,
                  }))
                }
                value={event.description}
                keyboardType="default"
              />
            </ScrollView>
          </TouchableWithoutFeedback>
          <Text style={{ color: '#fff' }}>Page 2 - Localization</Text>
          <Text style={{ color: '#fff' }}>Page 3 - Midia</Text>
          <FAB
            style={styles.fab}
            color={theme.colors.secondary}
            mode={"elevated"}
            size={"medium"}
            icon="check"
            animated={true}
            theme={{
              colors: {
                primaryContainer: theme.colors.surface,
              },
            }}
            onPress={handleRegisterEvent}
          />
    </View>
  );
};

const makeStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "flex-start",
      alignItems: "center",
      padding: 20,
      backgroundColor: theme.blackCustom,
    },
    input: {
      width: "100%",
      height: 50,
      borderColor: "#ccc",
      borderRadius: 15,
      paddingHorizontal: 10,
      marginBottom: 10,
      backgroundColor: theme.blackCustom,
    },
    nameInput: {
      color: "#E5ECF4",
      width: "100%",
      height: 50,
      fontSize: 22,
      borderRadius: 15,
      marginTop: 10,
      paddingHorizontal: 10,
      marginBottom: 10,
      padding: 0,
      backgroundColor: theme.colors.blackCustom,
    },
    descriptionInput: {
      textAlignVertical: "top",
      color: "#E5ECF4",
      width: "100%",
      fontSize: 20,
      borderColor: "#ccc",
      borderRadius: 15,
      marginTop: 10,
      paddingHorizontal: 10,
      marginBottom: 10,
      backgroundColor: theme.colors.blackCustom,
    },
    fab: {
      backgroundColor: theme.colors.primary,
      borderRadius: 50,
      position: "absolute",
      margin: 16,
      right: 0,
      bottom: 0,
    },
    viewPager: {
      width: "100%",
      height: "100%",
    },
  });
