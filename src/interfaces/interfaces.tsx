
export interface AuthContextData {
  signed: boolean;
  user: UserData | null;
  loading: boolean;
  signIn(email: any, password: any): void;
  signOut(): void;
}

export interface UserData {
    _id: string | null | undefined;
    name: string;
    email: string;
    cpf: string;
    data_de_nascimento: string;
    sexo: string;
    photo_uri: string;
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