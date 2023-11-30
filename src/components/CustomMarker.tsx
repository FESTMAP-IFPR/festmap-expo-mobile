import React from "react";
import { Marker } from "react-native-maps";
import { EventData } from "../interfaces/interfaces";
import { useNavigation } from "@react-navigation/core";
import { MaterialIcons } from "@expo/vector-icons";

interface CustomMarkerProps {
  evento: EventData;
}

const CustomMarker = (props: CustomMarkerProps) => {
  const { evento } = props;
  if (!evento || !evento.localizacao?.coordinates) {
    return null;
  }

  const navigation = useNavigation<any>();

  const onPressMarker = () => {
    navigation.navigate("EventDetailsScreen", { ...evento });
  };

  return (
    <Marker
      coordinate={{
        latitude: evento.localizacao?.coordinates[1] ?? 0,
        longitude: evento.localizacao?.coordinates[0] ?? 0,
      }}
      onPress={() => onPressMarker()}
    >
      <MaterialIcons name="location-pin" size={32} color="#8B5CF6" />
    </Marker>
  );
};

export default CustomMarker;
