import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Button,
} from "react-native";
import { MD3Theme, useTheme } from "react-native-paper";

export const ManageEventsScreen = () => {
  const theme = useTheme();
  const styles = makeStyles(theme);

  // Mocked-up event data for demonstration purposes
  const [events, setEvents] = useState([
    { id: 1, name: "Evento 1", date: "2023-11-15" },
    { id: 2, name: "Evento 2", date: "2023-12-05" },
    { id: 3, name: "Evento 3", date: "2023-12-20" },
  ]);

  const [newEvent, setNewEvent] = useState({ name: "", date: "" });

  // Function to add a new event
  const addEvent = () => {
    if (newEvent.name.trim() !== "" && newEvent.date.trim() !== "") {
      setEvents([...events, { id: events.length + 1, ...newEvent }]);
      setNewEvent({ name: "", date: "" });
    }
  };

  // Function to remove an event
  const removeEvent = (eventId: number) => {
    const updatedEvents = events.filter((event) => event.id !== eventId);
    setEvents(updatedEvents);
  };

  return (
    <View style={styles.container}>

      {/* Add a new event */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nome do Evento"
          value={newEvent.name}
          onChangeText={(text) => setNewEvent({ ...newEvent, name: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Data do Evento (YYYY-MM-DD)"
          value={newEvent.date}
          onChangeText={(text) => setNewEvent({ ...newEvent, date: text })}
        />
        <TouchableOpacity style={styles.addButton} onPress={addEvent}>
          <Text style={styles.buttonText}>Criar Evento</Text>
        </TouchableOpacity>
      </View>

      {/* List of events */}
      <FlatList
        data={events}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.eventItem}>
            <Text style={styles.eventInfo}>
              {item.name} (Data: {item.date})
            </Text>
            <TouchableOpacity
              style={styles.removeButton}
              onPress={() => removeEvent(item.id)}
            >
              <Text style={styles.buttonText}>Remover</Text>
            </TouchableOpacity>
          </View>
        )}
      />

    </View>
  );
};

const makeStyles = (theme: MD3Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: "#151515",
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 20,
      color: theme.colors.primary,
      textAlign: "center",
    },
    inputContainer: {
      marginBottom: 10,
    },
    input: {
      height: 40,
      backgroundColor: "#fff",
      paddingHorizontal: 10,
      borderRadius: 5,
      marginBottom: 10,
    },
    addButton: {
      backgroundColor: theme.colors.primary,
      padding: 10,
      borderRadius: 5,
    },
    buttonText: {
      color: "#fff",
      fontWeight: "bold",
      textAlign: "center",
    },
    eventItem: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: "#fff",
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: 5,
      marginBottom: 10,
    },
    eventInfo: {
      flex: 1,
    },
    removeButton: {
      backgroundColor: "red",
      padding: 10,
      borderRadius: 5,
    },
  });