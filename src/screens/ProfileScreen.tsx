import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Button,
} from "react-native";
import { useTheme } from "react-native-paper";
import { useAuth } from "../contexts/auth";

export const ProfileScreen = () => {
  const theme = useTheme();

  const styles = makeStyles(theme);
  const { signOut, user } = useAuth();

  const handleSignUp = async () => {
    signOut();
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <Text style={styles.info}>{user?.email}</Text>
      <Text style={styles.info}>{user?.name}</Text>
      <Button onPress={handleSignUp} title="Sign Out" />
    </View>
  );
};

const makeStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: "#151515",
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 20,
      color: theme.colors.primary,
      textAlign: "center",
    },
    info: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
        color: "#fff",
        textAlign: "left",
      },
  });
