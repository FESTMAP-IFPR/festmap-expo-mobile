import * as React from 'react';
import { Modal, Portal, Text, Button, TextInput } from 'react-native-paper';
import { View, StyleSheet, Alert, ScrollView } from "react-native";
import { validate } from 'gerador-validador-cpf'
// @ts-ignore
import { API_URL } from '@env';
import { forgot } from '../services/forgot';
import { NewPassword } from '../components/NewPassword';
import * as Clipboard from 'expo-clipboard';

export const ForgotPassword = ({ visible, hideModal }: any) => {
    const containerStyle = { backgroundColor: '#E5ECF4', padding: 20, marginTop: 0, marginBottom: 0, margin: 10, borderRadius: 10 };
    const [cpf, setCpf] = React.useState('');
    const [email, setEmail] = React.useState('');


    const copiar_senha = async (senha: any) => {
        await Clipboard.setStringAsync(senha);
        hideModal();
    }

    const formatCpf = (text: any) => {
        const cleanedText = text.replace(/[^\d]/g, '');
        const firstGroup = cleanedText.slice(0, 3);
        const secondGroup = cleanedText.slice(3, 6);
        const thirdGroup = cleanedText.slice(6, 9);
        const formattedCpf = `${firstGroup}.${secondGroup}.${thirdGroup}-${cleanedText.slice(9, 11)}`;
        setCpf(formattedCpf);
    };

    const handleReset = async () => {
        if (!cpf || !email) {
            Alert.alert('Atenção', 'Preencha todos os campos');
            return;
        }

        const verificarCPF = validate(cpf);
        if (!verificarCPF) {
            Alert.alert('Atenção', 'CPF inválido');
            return;
        }

        const response = await forgot(cpf, email);
        console.log(response);
        if (response.status === 200 || response.status === 201 && response.data !== "Email não cadastrado") {
            const mensagem = "Senha resetada com sucesso. \n" + "Sua nova senha: " + response.data
            Alert.alert('Sucesso', mensagem, [
                {
                    text: 'Ok',
                    onPress: () => {
                        hideModal();
                    }
                },
                {
                    text: 'Copiar senha',
                    onPress: () => {
                        hideModal();
                        copiar_senha(response.data);
                    }
                }
            ]);
        } else {
            Alert.alert('Erro', 'Erro ao resetar senha');
        }
        hideModal();
    }

    return (
        <Portal>
            <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    <View style={{ marginBottom: 20 }}>
                        <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 10 }}>Esqueci minha senha</Text>
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
                        <TextInput
                            label="E-mail"
                            placeholder='Digite seu E-mail'
                            value={email}
                            onChangeText={text => setEmail(text)}
                            style={styles.input}
                        />
                    </View>
                    <Button mode="contained" onPress={handleReset}>Resetar senha</Button>
                    <Button mode="outlined" onPress={hideModal} style={{ marginTop: 10 }}>Cancelar</Button>
                </ScrollView>
            </Modal>
        </Portal>
    );
};

const styles = StyleSheet.create({
    input: {
        marginBottom: 10,
        backgroundColor: '#E5ECF4',
    },
    label: {
        marginRight: 10,
        fontWeight: 'bold',
        fontSize: 16,
    },
});