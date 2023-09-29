import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet, Image, Alert } from "react-native";
import WelcomeImage from "../../assets/icon.png";
import { Text, TextInput } from "react-native-paper";
import { signIn } from "../services/auth";
import { useNavigation } from '@react-navigation/native';
import { useAuth } from "../contexts/auth";
import { SignUpScreen } from "./SignUpScreen";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const LoginScreen = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { signed, signIn } = useAuth();
    const [isModalVisible, setIsModalVisible] = useState(false);

    // console.log(signed);

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert("Atenção", "Preencha todos os campos");
            return;
        }
        signIn();
    };

    const handleRegister = () => {
        setIsModalVisible(true); // Supondo que a rota para a tela de cadastro é chamada 'SignUpScreen'
    };
    const hideModal = () => {
        setIsModalVisible(false);
    };

    const handleForgotPassword = () => {
        console.log("Navegar para a tela de recuperação de senha");
    };


    return (
        <KeyboardAwareScrollView contentContainerStyle={styles.container} resetScrollToCoords={{ x: 0, y: 0 }}>
            <Image source={WelcomeImage} style={styles.welcomeImage} />

            <Text style={styles.title}>Seja Bem-Vindo!</Text>

            <TextInput
                label="E-mail"
                style={styles.input}
                onChangeText={(text) => setEmail(text)}
                value={email}
            />

            <TextInput
                label={'Senha'}
                style={styles.input}
                secureTextEntry={true}
                onChangeText={(text) => setPassword(text)}
                value={password}
            />

            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Entrar</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleForgotPassword} activeOpacity={0.6}>
                <Text style={styles.forgotPasswordLink}>
                    Esqueceu sua senha? Clique aqui
                </Text>
            </TouchableOpacity>

            <View style={{ height: 100 }} />

            {/* Botão para abrir o modal */}
            <TouchableOpacity style={styles.secondaryButton} onPress={handleRegister}>
                <Text style={styles.secondaryButtonText}>Criar uma conta</Text>
            </TouchableOpacity>

            {/* Modal de cadastro */}
            <SignUpScreen visible={isModalVisible} hideModal={hideModal} />

        </KeyboardAwareScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        backgroundColor: "#8A44FF",
    },
    welcomeImage: {
        width: 150,
        height: 150,
        marginBottom: 50,
        alignSelf: "center",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
        color: "#fff",
    },
    input: {
        width: "100%",
        height: 50,
        borderColor: "#ccc",
        borderRadius: 15,
        paddingHorizontal: 10,
        marginBottom: 10,
        backgroundColor: "#fff",
    },
    button: {
        borderWidth: 1,
        borderColor: "#fff",
        padding: 10,
        borderRadius: 15,
        width: "100%",
        marginBottom: 5,
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
    },
    secondaryButton: {
        borderWidth: 1,
        borderColor: "#fff",
        padding: 10,
        borderRadius: 15,
        width: "100%",
        marginBottom: 10,
        position: "absolute",
        bottom: 0,
    },
    secondaryButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
    },
    forgotPasswordLink: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
        textDecorationLine: "underline",
    },
});

export default LoginScreen;
