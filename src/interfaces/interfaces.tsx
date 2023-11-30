import * as Location from "expo-location";

export interface AuthContextData {
  signed: boolean;
  user: UserData | null;
  loading: boolean;
  signIn(email: any, password: any): void;
  signOut(): void;
}

export interface UserData {
  _id: string | null | undefined;
  nome: string;
  email: string;
  cpf: string;
  data_de_nascimento: string;
  sexo: string;
  photo_uri: string;
  isAdmin: boolean;
  senha?: string;
}
export interface AddressData {
  pais?: string;
  estado?: string;
  cidade?: string;
  bairro?: string;
  rua?: string;
  numero?: number;
  cep?: string;
}

export interface LocationData {
  type?: string;
  coordinates?: number[];
}

export interface EventData {
  _id?: string;
  usuario_id?: string | null | undefined;
  criador?: UserData;
  nome?: string;
  descricao?: string;
  data_hora_inicio?: Date;
  data_hora_fim?: Date;
  contato?: string;
  categoria?: string;
  classificacao?: string;
  imagem?: string;
  localizacao?: LocationData;
  endereco?: AddressData;
}
