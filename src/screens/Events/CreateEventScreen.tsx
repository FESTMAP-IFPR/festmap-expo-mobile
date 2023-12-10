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
import { useFocusEffect, useNavigation } from "@react-navigation/core";
import { createEvent } from "../../services/event";
import { Dropdown } from "react-native-element-dropdown";
import { useTheme } from "react-native-paper";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { EventsStackParamList } from "../../navigation/EventsStackNavigator";
import { convertAddressText } from "../../utils/convertAddressText";
import { MaterialIcons } from "@expo/vector-icons";
import * as FileSystem from "expo-file-system";
import * as ImagePicker from "expo-image-picker";
import { Image } from "react-native";
import { useAuth } from "../../contexts/auth";
import { ScrollView } from "react-native-gesture-handler";

interface Props
  extends NativeStackScreenProps<EventsStackParamList, "CreateEventScreen"> {}

export default function CreateEventScreen(props: Props) {
  const { route, navigation } = props;
  const theme = useTheme();
  const [image, setImage] = useState<string | null>(null);

  const [eventData, setEventData] = useState<EventData>({
    nome: "",
    contato: "",
    descricao: "",
    data_hora_inicio: new Date(),
    data_hora_fim: new Date(),
    categoria: "",
    classificacao: "",
    localizacao: {},
    endereco: {},
  });
  const [openDatePicker, setOpenDatePicker] = useState(false);

  const { user } = useAuth();
  console.log(user);
  useFocusEffect(
    React.useCallback(() => {
      if (route.params) {
        const { endereco, localizacao } = route.params;
        updateEventDataByRouteParams(endereco, localizacao);
      }
    }, [route.params])
  );

  useEffect(() => {
    if (user && user?._id != null && user?._id != undefined) {
      setEventData((prevEventData) => ({
        ...prevEventData,
        usuario_id: user._id,
      }));
    }
  }, [user]);

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
    if (eventData.contato == "") {
      alert("Contato do evento não pode ser vazio");
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
    if (eventData.data_hora_fim == null) {
      alert("Data de fim do evento não pode ser vazio");
      return false;
    }
    if (eventData.localizacao == null) {
      alert("Localização do evento não pode ser vazio");
      return false;
    }
    if (eventData.endereco == null) {
      alert("Endereço do evento não pode ser vazio");
      return false;
    }
    if (
      eventData.localizacao.coordinates == null ||
      !eventData.localizacao.type ||
      eventData.localizacao.coordinates[0] == null ||
      eventData.localizacao.coordinates[1] == null
    ) {
      alert("Pontos de localização do evento não pode ser vazios");
      return false;
    }
    if (eventData.imagem == null) {
      alert("Imagem do evento não pode ser vazio");
      return false;
    }
    return true;
  };

  const formateDate = (date: Date) => {
    if (!date) return "";
    const date_string = date.toString();
    return date_string;
  };

  const selectImage = async () => {
    var image_base64 = "";
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (result.assets && result.assets.length > 0) {
        image_base64 = await FileSystem.readAsStringAsync(
          result.assets[0].uri,
          { encoding: "base64" }
        );
      }
      if (!result.canceled) {
        setImage(result.assets[0].uri);
        setEventData({ ...eventData, imagem: image_base64 });
      }
    } catch (error) {
      console.error("Erro ao selecionar imagem:", error);
    }
  };

  return (
    <SafeAreaView className="h-full flex ">
      <View className="h-min-screen flex flex-1">
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="flex">
          <View className="mt-10 flex flex-col gap-2 px-2 bg-gray-100 justify-start h-[600px]">
            <View>
              {image ? (
                <View className="flex flex-row justify-around">
                  <TouchableOpacity
                    onPress={selectImage}
                    className="flex justify-center items-center"
                  >
                    <MaterialIcons name="photo-camera" size={40} color="#fff" />
                  </TouchableOpacity>
                  <Image source={{ uri: image }} className="w-32 h-20" />
                </View>
              ) : (
                <View>
                  <TouchableOpacity onPress={selectImage}>
                    <MaterialIcons name="photo-camera" size={40} color="#fff" />
                  </TouchableOpacity>
                </View>
              )}
            </View>
            <TextInput
              mode="outlined"
              label={"Nome"}
              placeholderTextColor={"#E5ECF4"}
              // ...rest of the code
              value={eventData.nome}
              onChangeText={(text) =>
                setEventData({ ...eventData, nome: text })
              }
            />
            <TextInput
              mode="outlined"
              label={"Contato"}
              placeholderTextColor={"#E5ECF4"}
              // ...rest of the code
              value={eventData.contato}
              onChangeText={(text) =>
                setEventData({ ...eventData, contato: text })
              }
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
                  { value: "cultural", label: "Cultural" },
                  { value: "esportivo", label: "Esportivo" },
                  { value: "educacional", label: "Educacional" },
                  { value: "entretenimento", label: "Entretenimento" },
                  { value: "gastronomia", label: "Gastronomia" },
                  { value: "tecnologico", label: "Tecnológico" },
                  { value: "moda", label: "Moda" },
                  { value: "outros", label: "Outros" },
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
            <View className="flex flex-row bg-white items-center justify-between rounded-md border">
              <Text className="text-base">
                {eventData.data_hora_inicio &&
                  formateDate(eventData.data_hora_inicio)}
                {eventData.data_hora_fim &&
                  " - " + formateDate(eventData.data_hora_fim)}
              </Text>
              <View className=" border-0 border-l-2 pl-2 border-l-gray-300 ">
                <TouchableOpacity
                  onPress={() => setOpenDatePicker(true)}
                  className="p-3 bg-gray-300 rounded-full"
                >
                  <Icon.Calendar height={20} width={20} stroke={"gray"} />
                </TouchableOpacity>
              </View>
            </View>
            <Button
              mode="contained"
              className="rounded border-purple-500 "
              onPress={() => {
                navigation.navigate("SelectLocationScreen");
              }}
            >
              <MaterialIcons name="map" size={24} color="black" />
            </Button>
            <View className="flex flex-row items-stretch justify-between">
              <View className="flex flex-grow flex-row justify-start items-center border border-purple-400 py-2 px-1 rounded bg-white">
                <MaterialIcons name="my-location" size={24} color="black" />
                <View className="flex flex-col justify-start px-3">
                  <Text className="flex flex-wrap flex-shrink">
                    {convertAddressText(eventData?.endereco)}
                  </Text>
                </View>
              </View>
            </View>
            {/* // create a button to go other page to select location */}
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
      </View>
      <View
        style={{
          position: "absolute",
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
        }}
        className="self-end relative p-2 bottom-0 flex justify-end w-full bg-white -mt-12 pt-6"
      >
        <View className="px-2 flex justify-between flex-row gap-2">
          <Button
            mode="outlined"
            className="rounded border-purple-500 "
            onPress={() => {
              navigation.goBack();
            }}
          >
            Cancelar
          </Button>
          <Button
            mode="contained"
            className="rounded border-purple-500 "
            onPress={handleSubmit}
          >
            Criar
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
}
