import * as React from 'react';
import { Modal, Portal, Text, Button, TextInput } from 'react-native-paper';
import { View, StyleSheet, Alert, Image, ScrollView } from "react-native";
// @ts-ignore
import { API_URL } from '@env';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import {register} from '../services/register';
import { User} from '../models/User';

export const SignUpScreen = ({ visible, hideModal } : any) => {
  const today = new Date();
  const eighteenYearsAgo = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
  const containerStyle = { backgroundColor: '#E5ECF4', padding: 20, marginTop: 0, marginBottom: 0, margin: 10, borderRadius: 10 };
  const [name, setName] = React.useState('');
  const [sexo, setSexo] = React.useState();
  const [cpf, setCpf] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [date, setDate] = React.useState(new Date(eighteenYearsAgo));
  const [image, setImage] = React.useState('');
  const [show, setShow] = React.useState(false);

  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };

  const showMode = () => {
    setShow(true);
  };

  const formatCpf = (text: any) => {
    const cleanedText = text.replace(/[^\d]/g, '');
    const firstGroup = cleanedText.slice(0, 3);
    const secondGroup = cleanedText.slice(3, 6);
    const thirdGroup = cleanedText.slice(6, 9);
    const formattedCpf = `${firstGroup}.${secondGroup}.${thirdGroup}-${cleanedText.slice(9, 11)}`;
    setCpf(formattedCpf);
  };

  const handleRegister = async () => {
    if (!name || !cpf || !sexo || !email || !password || !date || !image) {
      Alert.alert('Atenção', 'Preencha todos os campos');
      return;
    }
    const base64Image = await FileSystem.readAsStringAsync(image, {
      encoding: FileSystem.EncodingType.Base64,
    });
    let user: User = {
      name: name,
      cpf: cpf,
      sexo: sexo,
      email: email,
      password: password,
      dataNascimento: date.toLocaleDateString(),
      foto: base64Image,
      administrador: false,
    };
    register(user);
    hideModal();
  };


  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <Portal>
      <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={{ marginBottom: 20 }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 10 }}>Cadastro de Usuário</Text>
            <TextInput
              label="Nome"
              mode='flat'
              placeholder='Digite seu nome'
              value={name}
              onChangeText={text => setName(text)}
              style={styles.input}
            />
            <TextInput
              label={'CPF'}
              mode='flat'
              placeholder='Digite seu CPF'
              value={cpf}
              onChangeText={formatCpf}
              keyboardType="number-pad"
              maxLength={14}
              style={styles.input}
            />
            <View style={styles.pickerContainer}>
              {/* <Text style={styles.label}>Sexo:</Text> */}
              {/* <Picker.Item label="Select Gender" value={""}/> */}
              <Picker
                selectedValue={sexo}
                onValueChange={(itemValue, itemIndex) =>
                  setSexo(itemValue)
                }
                style={styles.picker}
                itemStyle={styles.pickerItem}
              >
                <Picker.Item label="Selecione seu sexo" value="" />
                <Picker.Item label="Feminino" value="feminino" />
                <Picker.Item label="Masculino" value="masculino" />
                <Picker.Item label="Outro" value="outro" />
              </Picker>
            </View>
            <TextInput
              label="E-mail"
              placeholder='Digite seu E-mail'
              value={email}
              onChangeText={text => setEmail(text)}
              style={styles.input}
            />
            <TextInput
              label="Senha"
              placeholder='Digite sua senha'
              value={password}
              onChangeText={text => setPassword(text)}
              secureTextEntry
              style={styles.input}

            />
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <TextInput
                label="Data de Nascimento"
                value={date.toLocaleDateString()}
                style={[styles.input, { flex: 1 }]}
                editable={false}
              />
              <Button mode="outlined" onPress={showMode} style={{ marginLeft: 10 }}>
                Selecionar Data
              </Button>
              {show && (
                <DateTimePicker
                  value={date}
                  mode='date'
                  onChange={onChange}
                  maximumDate={eighteenYearsAgo}
                />
              )}
            </View>
            <Button
              mode="outlined"
              onPress={pickImage}
            >
              Selecionar Foto
            </Button>
            {image && (
              <View style={{ alignItems: 'center', marginTop: 10 }}>
                <Image source={{ uri: image }} style={{ width: 100, height: 100 }} />
              </View>
            )}

          </View>
          <Button mode="contained" onPress={handleRegister}>Cadastrar</Button>
          <Button mode="outlined" onPress={hideModal} style={{ marginTop: 10 }}>Cancelar</Button>
        </ScrollView>
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  input: {
    marginBottom: 10,
  },
  pickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  label: {
    marginRight: 10,
    fontWeight: 'bold',
    fontSize: 16,
  },
  picker: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#EFEFEF', // Add background color
    marginTop: 5, // Add margin if needed
  },
  pickerItem: {
    fontSize: 16, // Customize font size
    color: 'black', // Customize text color
  }
});