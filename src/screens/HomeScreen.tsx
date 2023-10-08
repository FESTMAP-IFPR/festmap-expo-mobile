import { StyleSheet, View, Modal} from "react-native";
import React, { useState, useEffect } from "react";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { MaterialIcons } from "@expo/vector-icons";
import { Title } from "react-native-paper";


export const HomeScreen = () => {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);

  
  const [events, setEvents] = useState([
    { 
      id: 1, 
      localizacao: {
        latitude: -25.4781, 
        longitude: -54.5792
      },
      title: "Evento 1",
      data_hora_inicio: "2021-10-10 10:00:00",
      data_hora_fim: "2021-10-10 12:00:00",
      categoria: "Festa",
      contato: "999999999",
      descricao: "Festa de aniversário",
      classificacao: "Livre",
      endereco: {
        pais: "Brasil",
        estado: "Paraná",
        cidade: "Foz do Iguaçu",
        bairro: "Centro",
        rua: "Av. Brasil",
        numero: 123
      }
    }
  ]);

  type MapScreenProps = {
    location: Location.LocationObject | null;
  };

  const MapScreen = ({ location }: MapScreenProps) => {
    const renderEventMarkers = () => {
      return events.map((event) => (
        <Marker
          key={event.id}
          coordinate={{
            latitude: event.localizacao?.latitude || 0,
            longitude: event.localizacao?.longitude || 0,
          }}
          tracksViewChanges={false}
        >
          <Title
            style={{
              color: "black",
              backgroundColor: "#c3bef7",
              padding: 5,
              borderRadius: 5,
              fontSize: 13,
              margin: 0,
            }}
          >{event.title}</Title>
          <CustomMarker title={event.title}/>
        </Marker>
      ));
    };

    return (
      
      <View style={styles.container}>
        {location ? (
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
              latitudeDelta: 0.1,
              longitudeDelta: 0.1,
            }}
          >
            {renderEventMarkers()}
            {/* Adicione um marcador para a sua localização em tempo real */}
            <Marker
              coordinate={{
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
              }}
              title="Sua Localização"
              pinColor="#8A44FF" // Define a cor roxa para o marcador da sua localização
            />
            
          </MapView>
        ) : (
          <MapView style={styles.map} />
        )}
        
      </View>
    );
  };

  const CustomMarker = ({ title }: { title: string }) => (
    <MaterialIcons name="event-available" size={30} color="black" />
  );

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
          timeInterval: 10000, // 10 segundos
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

  return <MapScreen location={location} />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
  },
});

const customMarkerStyles = StyleSheet.create({
  container: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  innerCircle: {
    width: 20,
    height: 20,
    borderRadius: 20,
    backgroundColor: "rgba(0, 0, 255, 0.5)",
  },
  outerCircle: {
    width: 30,
    height: 30,
    borderRadius: 30,
    borderColor: "blue",
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
  },
});
