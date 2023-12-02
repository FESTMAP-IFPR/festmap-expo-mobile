import { createContext, useContext, useEffect, useState } from "react";
import * as auth from "../services/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContextData, UserData } from "../interfaces/interfaces";
import { login } from "../services/login";
import { Alert } from "react-native";

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStorageData() {
      const storagedUser = await AsyncStorage.getItem("@RNAuth:user");
      const storagedToken = await AsyncStorage.getItem("@RNAuth:token");

      if (storagedUser && storagedToken) {
        setUser(JSON.parse(storagedUser));
      }
      setLoading(false);
    }
    loadStorageData();
  }, []);

  const signIn = async (email: string, password: string) => {
    const fazer_login = await login(email, password);

    const response = {
      token: "123",
      user: {
        _id: fazer_login.data._id,
        nome: fazer_login.data.nome,
        email: fazer_login.data.email,
        cpf: fazer_login.data.cpf,
        data_de_nascimento: fazer_login.data.data_de_nascimento,
        sexo: fazer_login.data.sexo,
        photo_uri: fazer_login.data.photo_uri,
        isAdmin: fazer_login.data.administrador,
      },
    };

    const { token, user } = response;
    if (user.cpf === undefined) {
      Alert.alert("Atenção", "Usuário não encontrado");
      return;
    }
    setUser(user);
    await AsyncStorage.setItem("@RNAuth:user", JSON.stringify(response.user));
    await AsyncStorage.setItem("@RNAuth:token", response.token);
  };

  async function signOut() {
    await AsyncStorage.clear();
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{ signed: !!user, user, loading, signIn, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};
