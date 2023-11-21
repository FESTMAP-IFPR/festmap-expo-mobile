import React, { useEffect, useState } from "react";
import { Alert } from "react-native";
import { findAll, deleteByEmail } from "../../services/user";
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
  const [userToRemove, setUserToRemove] = useState(String);
  const theme = useTheme();
  const styles = makeStyles(theme);
  const [users, setUsers] = useState([] as any[]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersResponse = await findAll();
        const usersArray = usersResponse.data.map((user: { nome: any; email: any; cpf: any; data_de_nascimento: any; }, index: any) => ({
          id: index,
          nome: user.nome,
          email: user.email,
          cpf: user.cpf,
          data_de_nascimento: user.data_de_nascimento,
        }));
        setUsers(usersArray);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const [searchValue, setSearchValue] = useState(""); // State for search value

  // Function to remove a user
  const removeUser = (userEmail: string) => {
    setUserToRemove(userEmail);
    Alert.alert(
      'Confirmação',
      `Tem certeza que deseja remover o usuário com o email ${userEmail}?`,
      [
        {
          text: 'Cancelar',
          style: 'cancel',
          onPress: () => setUserToRemove(""),
        },
        {
          text: 'Remover',
          onPress: () => [deleteByEmail(userEmail), setUsers(prevUsers => prevUsers.filter(user => user.email !== userEmail))],
        },
      ],
      { cancelable: false }
    );

  };

  function formataData(data: string) {
    const dataFormatada = data.split('T')[0].split('-');
    return dataFormatada[2] + '/' + dataFormatada[1] + '/' + dataFormatada[0];
  }

  // Filter users based on searchValue
  const filteredUsers = users.filter((user) =>
    user.nome.toLowerCase().includes(searchValue.toLowerCase())
  );
  const [expandedCardId, setExpandedCardId] = useState(null);
  const toggleCardExpansion = (id: null) => {
    setExpandedCardId((prevId) => (prevId === id ? null : id));
  };

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
          <TouchableOpacity onPress={() => toggleCardExpansion(item.id)}>
            <View style={styles.userItem}>
              <Text >{item.nome}</Text>
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => removeUser(item.email)}
              >
                <Text style={styles.buttonText}>Remover</Text>
              </TouchableOpacity>
            </View>
            {expandedCardId === item.id && (
              <View style={styles.userItem}>
                <View>
                  <Text>Email:<Text> {item.email}</Text></Text>
                  <Text>CPF:<Text> {item.cpf}</Text></Text>
                  <Text>Data de Nascimento:<Text> {formataData(item.data_de_nascimento)}</Text></Text>
                </View>
              </View>
            )}
          </TouchableOpacity>
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
