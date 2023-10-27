import React, { useRef, useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { Divider, Text, TextInput, useTheme } from "react-native-paper";

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

  const isValidEvent = () => {
     return event.nome && event.descricao;
  }

  const pagerRef = useRef(null);
  // const handlePageChange = pageNumber => {
  //   pagerRef.current.setPage(pageNumber);
  // };

  const handleRegisterEvent = () => {
    if(!isValidEvent())
      {
        Alert.alert('alguns campos não estao preenchidos');
        return;
      }
    console.log(event);
  }

  return (
    <View style={styles.container} >
          <Text style={{ color: '#fff' }}> page 1 </Text>
          <TextInput
            style={styles.nameInput}
            label={"Nome"}
            placeholderTextColor={"#E5ECF4"}
            mode="outlined"
            placeholder="Name"
            onChangeText={(text) =>
              setEvent((prevState) => ({
                ...prevState,
                nome: text,
              }))
            }
            value={event.nome}
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
                label={"Descrição"}
                style={styles.descriptionInput}
                placeholderTextColor={"#E5ECF4"}
                mode="outlined"
                dense={true}
                placeholder="Description"
                onChangeText={(text) =>
                  setEvent((prevState) => ({
                    ...prevState,
                    descricao: text,
                  }))
                }
                value={event.descricao}
                keyboardType="default"
              />
            </ScrollView>
          </TouchableWithoutFeedback>
          <Divider />
          <Text >Page 2 - Localization</Text>
          
          <Divider  theme={{ colors: { primary: 'green' } }}/>
          <Text >Page 3 - Midia</Text>
          <FAB
            style={styles[ isValidEvent()  ?  "fab" : "fab-disable"]}
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
    "fab-disable": {
      backgroundColor: theme.colors.primary, // Change to your disabled color
      borderRadius: 50,
      position: "absolute",
      margin: 16,
      right: 0,
      bottom: 0,
      opacity: 0.5, // Reduce opacity to indicate disabled state
      pointerEvents: "none", // Disable click events
    },
    viewPager: {
      width: "100%",
      height: "100%",
    },
  });
