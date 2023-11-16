import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Button } from 'react-native';
import { MD3Theme, useTheme } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import { useAuth } from "../contexts/auth";
import { MaterialIcons } from '@expo/vector-icons'; // Importe MaterialIcons

export const ProfileScreen = () => {
  const theme = useTheme();
  const styles = makeStyles(theme);
  const { signOut, user } = useAuth();
  const [image, setImage] = useState<string | null>(null);

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
      }
    } catch (error) {
      console.error('Erro ao selecionar imagem:', error);
    }
  };

  const handleUpload = async () => {
    // Implemente lógica de upload aqui
    console.log('Implemente a lógica de upload');
  };

  const handleSignOut = async () => {
    // Adicione a lógica de signOut aqui
    signOut();
  };

  const formatarData = (data: string) => {
    const dataFormatada = new Date(data);
    return `${dataFormatada.getDate()}/${dataFormatada.getMonth() + 1}/${dataFormatada.getFullYear()}`;
  }

  return (
    <View style={styles.container}>
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
        <Text style={styles.info}>Nome: {user?.name}</Text>
        <Text style={styles.info}>Email: {user?.email}</Text>
        <Text style={styles.info}>CPF: {user?.cpf}</Text>
        <Text style={styles.info}>Data de nascimento: {formatarData(user?.data_de_nascimento!)}</Text>
        
        <Button onPress={handleUpload} title="Editar meus dados" />
        
        <Button onPress={handleSignOut} title="Sair" />
      </View>
      
    </View>
  );
};

const makeStyles = (theme: any) =>
  StyleSheet.create({
    sair:{
      marginTop: 100
    },
    container: {
      flex: 1,
      // backgroundColor: theme.blackCustom,
      backgroundColor: '#c3bef7',
      padding: 20,
      // marginTop: 50,
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
      backgroundColor: '#777', // Cor do placeholder
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
      zIndex: 2, // Ajuste o índice de ordem para garantir que esteja acima do placeholder
    },
    uploadButton: {
      backgroundColor: theme.colors.primary,
      borderRadius: 50,
      padding: 10,
    },
    placeholderText: {
      color: '#fff',
      fontSize: 16,
    },
    infoContainer: {
      marginTop: 15,
      marginBottom: 100
    },
    info: {
      fontSize: 20,
      // fontFamily: 'sans-serif',
      fontWeight: 'bold',
      marginBottom: 20,
      color: 'black',
      textAlign: 'left',
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
  });
