import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Image,
  } from "react-native";
  
  export const UpComingEventsScreen = () => {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Upcoming Events Screen</Text>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: "#9400d3",
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 20,
      color: "#fff",
    },
  });
  