import * as Location from "expo-location";
import CustomMarker from "../components/CustomMarker";
import MapView, { Marker } from "react-native-maps";
import { StyleSheet, View } from "react-native";
import { EventData } from "../interfaces/interfaces";
import { useEffect } from "react";

type MapScreenProps = {
  location: Location.LocationObject | null;
  events: EventData[];
};

const Map = (props: MapScreenProps) => {
  const { location, events } = props;

  useEffect(() => {}, [location, events]);

  const getInitialRegion = () => {
    if (!location) {
      return {
        latitude: -25.51812597890316,
        longitude: -54.575251056744946,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
      };
    }
    return {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.1,
      longitudeDelta: 0.1,
    };
  };

  return (
    <View style={styles.container}>
      <MapView style={styles.map} initialRegion={getInitialRegion()}>
        {events
          .filter((event) => {
            return event.localizacao && event.localizacao.coordinates;
          })
          .map((event, index) => (
            <CustomMarker key={index} evento={event} />
          ))}
        {/* Adicione um marcador para a sua localização em tempo real */}
        {location && (
          <Marker
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
            title="Sua Localização"
            pinColor="#8A44FF" // Define a cor roxa para o marcador da sua localização
          />
        )}
      </MapView>
    </View>
  );
};

export default Map;

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
    marginTop: 20,
  },
});
