import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  SafeAreaView,
  TextInput,
} from "react-native";
import { Button, useTheme } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import { useAuth } from "../contexts/auth";
import { update } from "../services/user";
import { MaterialIcons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { UserData } from "../interfaces/interfaces";
import { User } from "../models/User";
import { format } from "date-fns";
import * as FileSystem from "expo-file-system";

export const ProfileScreen = () => {
  const theme = useTheme();
  const styles = makeStyles(theme);
  const { signOut, user } = useAuth();
  const [image, setImage] = useState<string | null>(
    convertBase64ToImage(user?.photo_uri!) || null
  );
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({ ...user });
  const [date, setDate] = useState(user?.data_de_nascimento || "");
  const [showDatePicker, setShowDatePicker] = useState(false);

  function convertBase64ToImage(base64: string) {
    return `data:image/png;base64,${base64}`;
  }

  useEffect(() => {
    (async () => {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        console.error("Permissão para acessar a galeria negada!");
      }
    })();
  }, []);

  const formatarData = (data: string) => {
    const dataFormatada = new Date(data);
    return format(dataFormatada, "dd/MM/yyyy");
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
      // console.log(result.assets[0].uri);
      if (result.assets && result.assets.length > 0) {
        image_base64 = await FileSystem.readAsStringAsync(
          result.assets[0].uri,
          { encoding: "base64" }
        );
      }
      if (!result.canceled) {
        setImage(result.assets[0].uri);
        setEditedUser((prevUser) => ({ ...prevUser, photo_uri: image_base64 }));
      }
    } catch (error) {
      console.error("Erro ao selecionar imagem:", error);
    }
    // console.log('Imagem selecionada base64:', image_base64);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    // Mock da requisição de atualização do usuário
    // console.log('Atualizando usuário:', editedUser.senha);
    const sanitizedUser: UserData = {
      _id: editedUser._id || "",
      name: editedUser.name || "", // Se name for undefined, use uma string vazia
      email: editedUser.email || "", // Se email for undefined, use uma string vazia
      cpf: editedUser.cpf || "", // Se cpf for undefined, use uma string vazia
      data_de_nascimento: editedUser.data_de_nascimento || "", // Se data_de_nascimento for undefined, use uma nova data
      sexo: editedUser.sexo || "", // Se sexo for undefined, use uma string vazia
      photo_uri: editedUser.photo_uri || "", // Se photo_uri for undefined, use uma string vazia
      isAdmin: editedUser.isAdmin || false, // Se isAdmin for undefined, use false
      senha: editedUser.senha || "", // Se senha for undefined, use uma string vazia
    };
    // console.log(sanitizedUser.photo_uri)
    // atualizar a const user
    user && (user.name = sanitizedUser.name);
    user && (user.email = sanitizedUser.email);
    user && (user.cpf = sanitizedUser.cpf);
    user && (user.data_de_nascimento = sanitizedUser.data_de_nascimento);

    // console.log(sanitizedUser);

    update(sanitizedUser); // Atualiza o contexto do usuário
  };

  const handleSignOut = async () => {
    signOut();
  };

  const showDatePickerModal = () => {
    setShowDatePicker(true);
  };

  const onChange = (event: any, selectedDate: any) => {
    setShowDatePicker(false);

    if (event.type === "set" && selectedDate) {
      const stringDate = selectedDate.toISOString();

      setEditedUser((prevUser) => ({
        ...prevUser,
        data_de_nascimento: stringDate,
      }));

      setDate(stringDate);

      // console.log(editedUser)
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profileContainer}>
        {editedUser?.photo_uri != '' ? (
          <View>
            {image != null ? (
              <Image source={{ uri: image }} style={styles.profileImage} />

            ) : ('') }
            {isEditing && (
              <TouchableOpacity
                style={styles.selectImageButton}
                onPress={selectImage}
              >
                <MaterialIcons name="photo-camera" size={40} color="#fff" />
              </TouchableOpacity>
            )}
          </View>
        ) : (
          <View style={styles.placeholder}>
            <MaterialIcons name="person" size={100} color="#fff" />
            <TouchableOpacity
              style={styles.selectImageButton}
              onPress={selectImage}
            >
              <MaterialIcons name="photo-camera" size={40} color="#fff" />
            </TouchableOpacity>
          </View>
        )}
      </View>

      <View style={styles.infoContainer}>
        {[
          { label: "Nome", value: user?.name, key: "name" },
          { label: "Email", value: user?.email, key: "email" },
          { label: "CPF", value: user?.cpf, key: "cpf" },
          {
            label: "Data de nascimento",
            value: date,
            key: "data_de_nascimento",
          },
          { label: "Senha", value: "********", key: "senha" },
        ].map(({ label, value, key }, index) => (
          <View style={styles.infoItem} key={index}>
            <Text style={styles.infoLabel}>{label}:</Text>
            {isEditing ? (
              key === "data_de_nascimento" ? (
                <Button
                  mode="contained"
                  onPress={showDatePickerModal}
                  style={{
                    backgroundColor: theme.colors.primary,
                    borderRadius: 50,
                    justifyContent: "space-between",
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: 10,
                  }}
                >
                  <Text style={{}}>
                    {" "}
                    {date ? formatarData(date) + "  " : date}
                  </Text>
                  <MaterialIcons name="date-range" size={15} color="#fff" />
                </Button>
              ) : (
                <TextInput
                  style={styles.editableInfoValue}
                  value={editedUser[key] || ""}
                  onChangeText={(text) => {
                    // console.log(`Changing ${key} to: ${text}`);
                    setEditedUser((prevUser) => ({
                      ...prevUser,
                      [key]: text,
                    }));
                  }}
                />
              )
            ) : (
              <Text style={styles.infoValue}>
                {key === "data_de_nascimento"
                  ? formatarData(value || "")
                  : value || ""}
              </Text>
            )}
          </View>
        ))}

        {showDatePicker && isEditing && (
          <DateTimePicker
            locale="pt-BR"
            value={new Date(date)}
            mode="date"
            onChange={onChange}
          />
        )}

        <View style={styles.buttonContainer}>
          {isEditing ? (
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Text style={styles.buttonText}>Salvar</Text>
              <MaterialIcons name="check" size={20} color="#fff" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.uploadButton} onPress={handleEdit}>
              <Text style={styles.buttonText}>Editar meus dados</Text>
              <MaterialIcons name="edit" size={20} color="#fff" />
            </TouchableOpacity>
          )}
          <TouchableOpacity style={styles.uploadButton} onPress={handleSignOut}>
            <Text style={styles.buttonText}>Sair</Text>
            <MaterialIcons name="exit-to-app" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const makeStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#c3bef7",
      padding: 20,
    },
    profileContainer: {
      alignItems: "center",
      marginBottom: 20,
      position: "relative",
      marginTop: 50,
    },
    profileImage: {
      width: 200,
      height: 200,
      resizeMode: "cover",
      borderRadius: 100,
    },
    placeholder: {
      width: 200,
      height: 200,
      borderRadius: 100,
      backgroundColor: "#777",
      justifyContent: "center",
      alignItems: "center",
      position: "relative",
    },
    selectImageButton: {
      position: "absolute",
      bottom: 0,
      right: 0,
      backgroundColor: theme.colors.primary,
      borderRadius: 50,
      padding: 10,
      zIndex: 2,
    },
    uploadButton: {
      backgroundColor: theme.colors.primary,
      borderRadius: 50,
      padding: 10,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 10,
    },
    buttonText: {
      fontFamily: "sans-serif",
      color: "#fff",
      marginRight: 10,
    },
    infoContainer: {
      marginTop: 15,
    },
    infoItem: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 15,
    },
    infoLabel: {
      color: "#000000",
      marginRight: 10,
      fontWeight: "bold",
    },
    infoValue: {
      color: "#FFFF",
      backgroundColor: theme.colors.primary,
      padding: 8,
      paddingHorizontal: 15,
      borderRadius: 50,
      flexShrink: 1,
    },
    buttonContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: "20%",
    },
    editableInfoValue: {
      color: "#FFFF",
      backgroundColor: theme.colors.primary,
      padding: 4,
      paddingHorizontal: 15,
      borderRadius: 50,
      flexShrink: 1,
    },
    saveButton: {
      backgroundColor: theme.colors.primary,
      borderRadius: 50,
      padding: 10,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 10,
    },
  });
