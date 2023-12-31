import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet, Image, Alert } from "react-native";
import WelcomeImage from "../../assets/icon.png";
import { Text, TextInput } from "react-native-paper";
import { useNavigation } from '@react-navigation/native';
import { useAuth } from "../contexts/auth";
import { SignUpScreen } from "./SignUpScreen";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { ForgotPassword } from "./ForgotPassword";

const LoginScreen = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { signed, signIn } = useAuth();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isModalVisibleForgotPassword, setIsModalVisibleForgotPassword] = useState(false);

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert("Atenção", "Preencha todos os campos");
            return;
        }
        signIn(email, password);
    };

    const handleRegister = () => {
        setIsModalVisible(true);
    };

    const hideModal = () => {
        setIsModalVisible(false);
    };

    const hideModalPassword = () => {
        setIsModalVisibleForgotPassword(false);
    }

    const forgotPassword = () => {
        setIsModalVisibleForgotPassword(true);
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

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.tercButton} onPress={forgotPassword}>
                    <Text style={styles.buttonText}>Esqueci minha senha</Text>
                </TouchableOpacity>

                {/* Botão para abrir o modal */}
                <TouchableOpacity style={styles.secondaryButton} onPress={handleRegister}>
                    <Text style={styles.buttonText}>Criar uma conta</Text>
                </TouchableOpacity>
            </View>

            {/* Modal de cadastro */}
            <SignUpScreen visible={isModalVisible} hideModal={hideModal} />

            {/* Modal de esqueci minha senha */}
            <ForgotPassword visible={isModalVisibleForgotPassword} hideModal={hideModalPassword} />
        </KeyboardAwareScrollView>
    );
};

const styles = StyleSheet.create({
    buttonContainer: {
        paddingTop: 10,
        alignItems: 'center', // Alinha os botões verticalmente
        flexDirection: 'row',
        justifyContent: 'space-between', // Adiciona espaço entre os botões
        paddingHorizontal: 16,
        paddingBottom: 16,
    },
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center", // Alinha todos os elementos no centro
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
        marginBottom: 10,
        backgroundColor: "#fff",
    },
    button: {
        borderWidth: 1,
        borderColor: "#fff",
        padding: 10,
        borderRadius: 15,
        width: "100%", // Define uma largura fixa para o botão
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
        width: "45%", // Define uma largura fixa para o botão
        marginLeft: 30,
    },
    tercButton: {
        borderWidth: 1,
        borderColor: "#fff",
        padding: 10,
        borderRadius: 15,
        width: "55%", // Define uma largura fixa para o botão
        // marginBottom: 0, // Aumenta o espaço entre os botões
    },
    forgotPasswordLink: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
        textDecorationLine: "underline",
    },
});


export default LoginScreen;
