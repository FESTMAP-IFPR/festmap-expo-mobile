export interface AuthContextData {
  signed: boolean;
  user: UserData;
  loading: boolean;
  signIn(): Promise<void>;
  signOut(): void;
}

export interface UserData {
    name: string;
    email: string;
}