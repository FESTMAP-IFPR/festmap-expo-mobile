import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";

import React, { useState, useEffect } from "react";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

export const HomeScreen = () => {
  const [location, setLocation] = useState(null);
  useEffect(() => {
    // Solicitar permissão de localização ao usuário
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permissão de localização negada.");
        return;
      }

      // Obter a localização atual do usuário uma vez
      let initialLocation = await Location.getCurrentPositionAsync({});
      setLocation(initialLocation);

      // Atualizar a localização do usuário em tempo real
      let locationSubscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 5000, // 5 segundos
          distanceInterval: 10, // 10 metros
        },
        (newLocation) => {
          setLocation(newLocation);
        }
      );

      return () => {
        if (locationSubscription) {
          locationSubscription.remove();
        }
      };
    })();
  }, []);
  return (
    <View style={styles.container}>
    {location ? (
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker
          coordinate={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          }}
          title="Welcome FestMap!"
          description="Sua localização atual."
        />
      </MapView>
    ) : (
      <MapView style={styles.map} />
    )}
  </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    map: {
      width: '100%',
      height: '100%',
    },
  });

