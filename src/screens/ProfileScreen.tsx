import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, SafeAreaView, TextInput } from 'react-native';
import { useTheme } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import { useAuth } from "../contexts/auth";
import { MaterialIcons } from '@expo/vector-icons';

export const ProfileScreen = () => {
  const theme = useTheme();
  const styles = makeStyles(theme);
  const { signOut, user } = useAuth();
  const [image, setImage] = useState<string | null>(user?.photo_uri || null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({ ...user }); 

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        console.error('Permission to access media library was denied');
      }
    })();
  }, []);

  const selectImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        setImage(result.assets[0].uri);
        setEditedUser((prevUser) => ({ ...prevUser, photo: result.assets[0].uri }));
      }
    } catch (error) {
      console.error('Erro ao selecionar imagem:', error);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    // Mock da requisição de atualização do usuário
    //updateUser(editedUser); // Atualiza o contexto do usuário
  };

  const handleSignOut = async () => {
    signOut();
  };

  const formatarData = (data: string) => {
    const dataFormatada = new Date(data);
    return `${dataFormatada.getDate()}/${dataFormatada.getMonth() + 1}/${dataFormatada.getFullYear()}`;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profileContainer}>
        {image ? (
          <View>
            <Image source={{ uri: image }} style={styles.profileImage} />
            <TouchableOpacity style={styles.selectImageButton} onPress={selectImage}>
              <MaterialIcons name="photo-camera" size={40} color="#fff" />
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.placeholder}>
            <MaterialIcons name="person" size={100} color="#fff" />
            <TouchableOpacity style={styles.selectImageButton} onPress={selectImage}>
              <MaterialIcons name="photo-camera" size={40} color="#fff" />
            </TouchableOpacity>
          </View>
        )}
      </View>

      <View style={styles.infoContainer}>
      {[
        { label: 'Nome', value: user?.name, key: 'name' },
        { label: 'Email', value: user?.email, key: 'email' },
        { label: 'CPF', value: user?.cpf, key: 'cpf' },
        { label: 'Data de nascimento', value: formatarData(user?.data_de_nascimento!), key: 'data_de_nascimento' },
      ].map(({ label, value, key }, index) => (
        <View style={styles.infoItem} key={index}>
          <Text style={styles.infoLabel}>{label}:</Text>
          {isEditing ? (
            <TextInput
              style={styles.editableInfoValue}
              value={editedUser[key] || ''}
              onChangeText={(text) =>
                setEditedUser((prevUser) => ({ ...prevUser, [key]: text }))
              }
            />
          ) : (
            <Text style={styles.infoValue}>{value}</Text>
          )}
        </View>
      ))}

      <View style={styles.buttonContainer}>
        {isEditing ? (
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.buttonText}>Salvar</Text>
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
      backgroundColor: '#c3bef7',
      padding: 20,
    },
    profileContainer: {
      alignItems: 'center',
      marginBottom: 20,
      position: 'relative',
      marginTop: 50,
    },
    profileImage: {
      width: 200,
      height: 200,
      resizeMode: 'cover',
      borderRadius: 100,
    },
    placeholder: {
      width: 200,
      height: 200,
      borderRadius: 100,
      backgroundColor: '#777',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
    },
    selectImageButton: {
      position: 'absolute',
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
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 10,
    },
    buttonText: {
      fontFamily: 'sans-serif',
      color: '#fff',
      marginRight: 10,
    },
    infoContainer: {
      marginTop: 15,
      marginBottom: 150,
    },
    infoItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 15,
    },
    infoLabel: {
      color: "#000000",
      marginRight: 10,
      fontWeight: 'bold',
    },
    infoValue: {
      color: "#FFFF",
      backgroundColor: theme.colors.primary,
      padding: 7,
      paddingHorizontal: 15,
      borderRadius: 50,
      flexShrink: 1,
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 200,
    },
    editableInfoValue: {
      color: "#FFFF",
      backgroundColor: theme.colors.primary,
      padding: 7,
      paddingHorizontal: 15,
      borderRadius: 50,
      flexShrink: 1,
    },
    saveButton: {
      backgroundColor: theme.colors.primary,
      borderRadius: 50,
      padding: 10,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 10,
    },
  });

