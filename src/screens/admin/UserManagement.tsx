import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import { MD3Theme, useTheme } from "react-native-paper";

export const UserManagementScreen = () => {
  const theme = useTheme();
  const styles = makeStyles(theme);

  // Mocked-up user data for demonstration purposes
  const [users, setUsers] = useState([
    { id: 1, name: "User 1", email: "user1@example.com" },
    { id: 2, name: "User 2", email: "user2@example.com" },
    { id: 3, name: "User 3", email: "user3@example.com" },
  ]);

  const [searchValue, setSearchValue] = useState(""); // State for search value

  // Function to remove a user
  const removeUser = (userId: number) => {
    const updatedUsers = users.filter((user) => user.id !== userId);
    setUsers(updatedUsers);
  };

  // Filter users based on searchValue
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Buscar Nome"
          value={searchValue}
          onChangeText={(text) => setSearchValue(text)}
        />
      </View>

      {/* List of filtered users */}
      <FlatList
        data={filteredUsers}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.userItem}>
            <Text style={styles.userInfo}>
              {item.name} ({item.email})
            </Text>
            <TouchableOpacity
              style={styles.removeButton}
              onPress={() => removeUser(item.id)}
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
      backgroundColor: '#c3bef7',
    },
    inputContainer: {
      alignContent: "center",
      justifyContent: "center",
      marginTop: '10%',
      marginBottom: '10%',
    },
    input: {
      height: 40,
      backgroundColor: "#fff",
      paddingHorizontal: 10,
      borderRadius: 5,
      marginBottom: 10,
    },
    userItem: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: "#fff",
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: 5,
      marginBottom: 10,
    },
    userInfo: {
      flex: 1,
    },
    removeButton: {
      backgroundColor: "red",
      padding: 10,
      borderRadius: 5,
    },
    buttonText: {
      color: "#fff",
      fontWeight: "bold",
      textAlign: "center",
    },
  });
