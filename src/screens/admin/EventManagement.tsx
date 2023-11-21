import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Button,
  Alert,
} from "react-native";
import { MD3Theme, useTheme } from "react-native-paper";
import { deleteEvent, getEventList } from "../../services/event";

export const ManageEventsScreen = () => {
  const [eventToRemove, setEventToRemove] = useState(String);
  const theme = useTheme();
  const styles = makeStyles(theme);
  const [events, setEvents] = useState([] as any[]);
  const [searchValue, setSearchValue] = useState(""); // State for search value

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const eventsResponse = await getEventList();
        const eventsArray = eventsResponse.map((event: any, index: any) => ({
          _id: event._id,
          nome: event.nome,
          categoria: event.categoria,
          classificacao: event.classificacao,
          data_hora_inicio: event.data_hora_inicio,
          data_hora_fim: event.data_hora_fim,
          descricao: event.descricao,
          contato: event.contato,

        }));
        setEvents(eventsArray);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  // Mocked-up event data for demonstration purposes
  // const [events, setEvents] = useState([
  //   { id: 1, name: "Evento 1", date: "2023-11-15" },
  //   { id: 2, name: "Evento 2", date: "2023-12-05" },
  //   { id: 3, name: "Evento 3", date: "2023-12-20" },
  // ]);

  function formataDataHora(data: string) {
    var dataFormatada = new Date(data);
    var dia = dataFormatada.getDate();
    var mes = dataFormatada.getMonth() + 1;
    var ano = dataFormatada.getFullYear();
    var hora = dataFormatada.getHours();
    var minuto = dataFormatada.getMinutes();
    var segundo = dataFormatada.getSeconds();
    var horaImprimivel = dia + "/" + mes + "/" + ano + " " + hora + ":" + minuto + ":" + segundo;
    return horaImprimivel;
  }

  const [expandedCardId, setExpandedCardId] = useState(null);
  const toggleCardExpansion = (id: null) => {
    setExpandedCardId((prevId) => (prevId === id ? null : id));
  };
  const filteredEvents = events.filter((event) =>
    event.nome.toLowerCase().includes(searchValue.toLowerCase())
  );
  // Function to remove an event
  const removeEvent = (eventId: any) => {
    setEventToRemove(eventId);
    Alert.alert(
      'Confirmação',
      `Tem certeza que deseja remover o evento com o id ${eventId}?`,
      [
        {
          text: 'Cancelar',
          style: 'cancel',
          onPress: () => setEventToRemove(""),
        },
        {
          text: 'Remover',
          onPress: () => [deleteEvent(eventId), setEvents(prevEvents => prevEvents.filter(event => event._id !== eventId))],
        },
      ],
      { cancelable: false }
    );

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

      {/* List of events */}
      <FlatList
        data={filteredEvents}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => toggleCardExpansion(item._id)}>
            <View style={styles.eventItem}>
              <Text style={styles.eventInfo}>
                {item.nome}
              </Text>
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => removeEvent(item._id)}
              >
                <Text style={styles.buttonText}>Remover</Text>
              </TouchableOpacity>
            </View>
            {expandedCardId === item._id && (
              <View style={styles.eventItem}>
                <View>
                  <Text>Categoria: <Text>{item.categoria}</Text></Text>
                  <Text>Classificação: <Text>{item.classificacao}</Text></Text>
                  <Text>Data e Hora de Início: <Text>{formataDataHora(item.data_hora_inicio)}</Text></Text>
                  <Text>Data e Hora de Fim: <Text>{formataDataHora(item.data_hora_fim)}</Text></Text>
                  <Text>Descrição: <Text>{item.descricao}</Text></Text>
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
      backgroundColor: "#c3bef7",
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 20,
      // color: theme.colors.primary,
      textAlign: "center",
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
    addButton: {
      // backgroundColor: theme.colors.primary,
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