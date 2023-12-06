import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  SafeAreaView,
  TextInput,
  KeyboardAvoidingView,
  Platform
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
      if (!result.canceled && image_base64 != '') {
        setImage(result.assets[0].uri);
        setEditedUser((prevUser) => ({ ...prevUser, photo_uri: image_base64 }));
        editedUser.photo_uri = image_base64;
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
      nome: editedUser.nome || "", // Se name for undefined, use uma string vazia
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
    user && (user.nome = sanitizedUser.nome);
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

  const ocultarSenha = () => {
    return "********";
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

  const formatCpf = (value: string) => {
    // Remove caracteres não numéricos
    const numericValue = value.replace(/\D/g, '');
  
    // Adiciona os pontos e o traço na formatação do CPF
    if (numericValue.length >= 3) {
      return (
        numericValue.slice(0, 3) +
        '.' +
        numericValue.slice(3, 6) +
        '.' +
        numericValue.slice(6, 9) +
        '-' +
        numericValue.slice(9, 11)
      );
    } else {
      return numericValue;
    }
  };

  const handleCancel = () => {
    // Resetar o estado editedUser para o estado original do usuário
    setEditedUser({ ...user });
    setIsEditing(false);
    // Também é possível resetar a imagem se ela foi alterada durante a edição
    setImage(convertBase64ToImage(user?.photo_uri!) || null);
  };

  const splitName = (name: string | undefined) => {
    if (!name) {
      return { firstName: "", lastName: "" };
    }

    const parts = name.split(" ");
    const firstName = parts[0];
    const lastName = parts.slice(1).join(" ");

    return { firstName, lastName };
  };

  const { firstName, lastName } = splitName(editedUser.nome);

  return (

    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidingView}
      >
        <View style={styles.darkBackground}>

          {/* profile pic */}
          <View style={styles.profileContainer}>
            {editedUser?.photo_uri != '' ? (
              <View>
                {image != null ? (
                  <Image source={{ uri: image }} style={styles.profileImage} />

                ) : ('')}
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

          {/* Nome */}
          {isEditing ? (
            <View style={styles.username}>
              <Text style={styles.infoLabel}>Nome:</Text>
              <TextInput
                style={styles.editableInfoValue}
                value={editedUser.nome || ""}
                onChangeText={(text) => {
                  setEditedUser((prevUser) => ({
                    ...prevUser,
                    nome: text,
                  }));
                }}
              />
            </View>
          ) : (
            <View style={{ flexDirection: "row", alignSelf: 'center', marginBottom: 10 }}>
              <Text style={{ fontSize: 30, color: 'white' }}>{firstName}</Text>
              <Text style={{ fontSize: 30, fontWeight: "bold", color: 'white' }}>{" " + lastName}</Text>
            </View>
          )}

          {/* email */}
          {isEditing ? (
            <View style={styles.email}>
              <Text style={styles.infoLabel}>Email:</Text>
              <TextInput
                style={styles.editableInfoValue}
                value={editedUser.email || ""}
                onChangeText={(text) => {
                  setEditedUser((prevUser) => ({
                    ...prevUser,
                    email: text,
                  }));
                }}
              />
              
            </View>
          ) : (
            <View style={styles.information}>
              <Text style={{ fontSize: 13, color: 'white', textAlign: 'center' }}>{user?.email} | {formatarData(user?.data_de_nascimento || "")}</Text>
              <Text style={{ fontSize: 13, color: 'white', marginTop: 10, textAlign: 'center' }}>CPF: {user?.cpf}</Text>
              <Text style={{ fontSize: 13, color: 'white', marginTop: 10, textAlign: 'center' }}>Sexo: {user?.sexo}</Text>
            </View>

          )}
           {/* Password */}
           {isEditing ? (
            <View style={styles.password}>
              <Text style={styles.infoLabel}>Senha:</Text>
              <TextInput
                style={styles.editableInfoValue}
                placeholder={'Insira uma nova senha'}
                onChangeText={(text) => {
                  setEditedUser((prevUser) => ({
                    ...prevUser,
                    senha: text,
                  }));
                }}
              />
            </View>
          )
            : ('')
          }
          {/* cpf */}
          {isEditing ? (
            <View style={styles.cpf}>
              <Text style={styles.cpfInfoLabel}>CPF:</Text>
              <TextInput
                style={styles.editableInfoValue}
                value={formatCpf(editedUser.cpf || "")}
                onChangeText={(text) => {
                  setEditedUser((prevUser) => ({
                    ...prevUser,
                    cpf: text,
                  }));
                }}
              />
            </View>
          ) : (
            ''
          )}

         

          {/* Data de Nascimento  */}
          {isEditing ? (
            <View style={styles.birthdate}>
              <Text style={styles.infoLabel}>Data de nascimento:</Text>
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
            </View>
          ) : (
            ''
          )}
          {showDatePicker && isEditing && (
            <DateTimePicker
              locale="pt-BR"
              value={new Date(date)}
              mode="date"
              onChange={onChange}
            />
          )}
        </View>
        <View style={styles.buttonContainer}>
          {isEditing ? (
             <>
             <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
               <Text style={styles.buttonText}>Salvar</Text>
               <MaterialIcons name="check" size={20} color="#fff" />
             </TouchableOpacity>
             <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
               <Text style={styles.buttonText}>Cancelar</Text>
               <MaterialIcons name="cancel" size={20} color="#fff" />
             </TouchableOpacity>
           </>
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

      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const makeStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#c3bef7",
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
    information: {
      marginBottom: 150,
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
    cancelButton: {
      backgroundColor: "red",  // Cor de fundo do botão de cancelar
      borderRadius: 50,
      padding: 10,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 10,
    },
    cpfInfoLabel: {
      marginRight: 25,
    },
    cpf: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 15,
    },
    password: {
      flexDirection: 'row',
      alignItems: "center",
    },
    darkBackground: {
      borderBottomLeftRadius: 25,
      borderBottomRightRadius: 25,
      padding: 10,
      backgroundColor: "black",  // Ajuste as cores conforme necessário
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
    username: {
      alignItems: "center",
      flexDirection: 'row'
    },
    email: {
      flexDirection: "row",
      alignItems: "center",

    },
    birthdate: {
      flexDirection: "row",
      marginBottom: 30,
      marginTop: 30,
      alignItems: 'baseline'
    },
    infoItem: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 15,
    },
    infoLabel: {
      color: "white",
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
      marginHorizontal: "5%",
      marginBottom: "10%",
      marginTop: "20%",
    },
    editableInfoValue: {
      color: "#FFFF",
      backgroundColor: theme.colors.primary,
      marginTop: 5,
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
    keyboardAvoidingView: {
      flex: 1,
    },
  });
