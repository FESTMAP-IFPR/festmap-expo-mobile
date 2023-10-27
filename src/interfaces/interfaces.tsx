import { ImageSourcePropType } from "react-native";

export interface AuthContextData {
  signed: boolean;
  user: UserData | null;
  loading: boolean;
  signIn(email: any, password: any): void;
  signOut(): void;
}

export interface UserData {
    name: string;
    email: string;
    isAdmin: boolean;
}
export interface EventData {
  nome?: string;
  descricao?: string;
  data_hora_inicio?: Date;
  data_hora_fim?: Date;
  contato?: string;
  categoria?: string;
  classificacao?: string;
  image?: string;
  localizacao?: {};
}