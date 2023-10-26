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
  name?: string;
  description?: string;
  date?: Date;
  image?: string;
}