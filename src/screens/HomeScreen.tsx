import React, { useState, useEffect } from "react";
import * as Location from "expo-location";
import { getEventListByFilter } from "../services/event";
import { EventData } from "../interfaces/interfaces";
import Map from "../components/Map";

const HomeScreen = () => {
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [events, setEvents] = useState<EventData[]>([]);

  const fetchEvents = async () => {
    try {
      const data = await getEventListByFilter(null, null, null);
      setEvents(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const requestLocationPermission = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Location permission denied.");
        return;
      }

      const initialLocation = await Location.getCurrentPositionAsync({});
      setLocation(initialLocation);

      const locationSubscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 10000,
          distanceInterval: 100,
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
    };

    requestLocationPermission();
    fetchEvents();
  }, []);

  return <Map location={location} events={events} />;
};

export default HomeScreen;
