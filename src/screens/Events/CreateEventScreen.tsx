import React, { useState, useEffect } from "react";
import { SafeAreaView, View, Text, TouchableOpacity } from "react-native";
import {
  AddressData,
  EventData,
  LocationData,
} from "../../interfaces/interfaces";
import { Button, TextInput } from "react-native-paper";
import { DatePickerInput, DatePickerModal, ro } from "react-native-paper-dates";
import * as Icon from "react-native-feather";
import { Picker } from "@react-native-picker/picker";
import { ScrollView } from "react-native-gesture-handler";
import { useFocusEffect, useNavigation } from "@react-navigation/core";
import { createEvent } from "../../services/event";
import { Dropdown } from "react-native-element-dropdown";
import { useTheme } from "react-native-paper";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AndressLocationData } from "./SelectLocationScreen";
import { EventsStackParamList } from "../../navigation/EventsStackNavigator";
import { convertAddressText } from "../../utils/convertAddressText";
import { MaterialIcons } from "@expo/vector-icons";

interface Props
  extends NativeStackScreenProps<EventsStackParamList, "CreateEventScreen"> {}

export default function CreateEventScreen(props: Props) {
  const { route, navigation } = props;
  const theme = useTheme();

  const [eventData, setEventData] = useState<EventData>({
    nome: "",
    descricao: "",
    data_hora_inicio: new Date(),
    data_hora_fim: new Date(),
    categoria: "",
    classificacao: "",
    localizacao: {},
    endereco: {},
  });
  const [openDatePicker, setOpenDatePicker] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      if (route.params) {
        const { endereco, localizacao } = route.params;
        updateEventDataByRouteParams(endereco, localizacao);
      }
    }, [route.params])
  );

  useEffect(() => {
    console.log(eventData);
  }, [eventData]);

  const updateEventDataByRouteParams = (
    endereco: AddressData | undefined,
    localizacao: LocationData | undefined
  ) => {
    setEventData((prevEventData) => ({
      ...prevEventData,
      endereco,
      localizacao,
    }));
  };

  const onDismissDate = () => {
    setOpenDatePicker(false);
  };

  const onConfirmDate = (event: any) => {
    setEventData({
      ...eventData,
      data_hora_inicio: event.startDate,
      data_hora_fim: event.endDate,
    });
    setOpenDatePicker(false);
  };

  const backToEventsScreen = (): void => {
    navigation.navigate("EventsScreen");
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    if (!isValidEventData()) return;
    createEvent(eventData);
    backToEventsScreen();
  };

  const isValidEventData = () => {
    if (eventData.nome == "") {
      alert("Nome do evento não pode ser vazio");
      return false;
    }
    if (eventData.descricao == "") {
      alert("Descrição do evento não pode ser vazio");
      return false;
    }
    if (eventData.categoria == "") {
      alert("Categoria do evento não pode ser vazio");
      return false;
    }
    if (eventData.classificacao == "") {
      alert("Classificação do evento não pode ser vazio");
      return false;
    }
    if (eventData.data_hora_inicio == null) {
      alert("Data de inicio do evento não pode ser vazio");
      return false;
    }
    return true;
  };

  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={{ flex: 1 }} className="h-full">
        <View className="mt-10 flex flex-col gap-2 px-2 bg-gray-100 justify-start ">
          <Text> New event </Text>
          <TextInput
            mode="outlined"
            label={"Nome"}
            placeholderTextColor={"#E5ECF4"}
            // ...rest of the code
            value={eventData.nome}
            onChangeText={(text) => setEventData({ ...eventData, nome: text })}
          />
          <TextInput
            multiline={true}
            numberOfLines={4}
            label={"Descrição"}
            // style={styles.descriptionInput}
            placeholderTextColor={"#E5ECF4"}
            mode="outlined"
            dense={true}
            placeholder="Description"
            value={eventData.descricao}
            onChangeText={(text) =>
              setEventData({ ...eventData, descricao: text })
            }
          />
          <View className="bg-white rounded-md border ">
            <Dropdown
              value={eventData.categoria}
              placeholder="Selecione categoria"
              data={[
                { value: "musica", label: "Musica" },
                { value: "esporte", label: "Esporte" },
                { value: "comida", label: "Comida" },
              ]}
              valueField={"value"}
              labelField={"label"}
              onChange={(value: any) => {
                setEventData({ ...eventData, categoria: value.value });
              }}
            />
          </View>
          <View className="bg-white rounded-md border ">
            <Dropdown
              value={eventData.classificacao}
              placeholder="Selecione classificação"
              data={[
                { value: "livre", label: "Livre" },
                { value: "10", label: "10" },
                { value: "12", label: "12" },
                { value: "14", label: "14" },
                { value: "16", label: "16" },
                { value: "18", label: "18" },
              ]}
              valueField={"value"}
              labelField={"label"}
              onChange={(value: any) => {
                setEventData({ ...eventData, classificacao: value.value });
              }}
            />
          </View>
          <View className="flex flex-row bg-white p-2 items-center justify-between rounded-md border">
            <Text className="text-lg">
              {eventData.data_hora_inicio?.toLocaleDateString()}-
              {eventData.data_hora_fim?.toLocaleDateString()}
            </Text>
            <View className=" space-x-1 border-0 border-l-2 pl-2 border-l-gray-300">
              <TouchableOpacity
                onPress={() => setOpenDatePicker(true)}
                className="p-3 bg-gray-300 rounded-full"
              >
                <Icon.Calendar height={25} width={25} stroke={"gray"} />
              </TouchableOpacity>
            </View>
          </View>
          <Text className="text-lg">Localização</Text>
          <View className="flex flex-row justify-start space-x-5 items-center border border-purple-400 m-2 p-4 rounded bg-white">
            <MaterialIcons name="my-location" size={24} color="black" />
            <View className="flex flex-col justify-start px-3">
              <Text className="flex flex-wrap flex-shrink">
                {convertAddressText(eventData?.endereco)}
              </Text>
            </View>
          </View>
          {/* // create a button to go other page to select location */}
          <Button
            mode="contained"
            className="rounded border-purple-500 "
            onPress={() => {
              navigation.navigate("SelectLocationScreen");
            }}
          >
            Selecionar localização
          </Button>
        </View>
        <View
          style={{
            position: "absolute",
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
          }}
          className="self-end relative p-2 bottom-0 flex justify-end w-full bg-white -mt-12 pt-6"
        >
          <View className="px-5">
            <TouchableOpacity
              onPress={handleSubmit}
              className="justify-center items-center p-2 shadow bg-purple-400 border rounded-md  border-purple-500 "
            >
              <Text>Criar</Text>
            </TouchableOpacity>
          </View>
        </View>
        <DatePickerModal
          locale="pt-br"
          mode="range"
          visible={openDatePicker}
          onDismiss={onDismissDate}
          startDate={eventData.data_hora_inicio}
          endDate={eventData.data_hora_fim}
          onConfirm={onConfirmDate}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
