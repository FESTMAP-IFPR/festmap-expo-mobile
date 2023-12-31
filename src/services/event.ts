import { EventData } from "../interfaces/interfaces";
import axios from "axios";
import { api } from "./api";
import { Alert } from "react-native";

export const createEvent = async (event: EventData) => {
  try {
    const requestBody = event;
    console.log(event);
    const response = api
      .post<any>("/events", requestBody)
      .then((response) => {
        console.log(response.data);
        return response.data;
      })
      .catch((error) => {
        console.log(error);
        console.log(error.response.data);
        alert(error.response.data.message);
        throw error;
      });
    return response;
  } catch (error: any) {
    console.error("Error:", error.message);
    throw error;
  }
};

export const getEventList = (): Promise<EventData[]> => {
  return new Promise((resolve) => {
    api
      .get<EventData[]>("/events")
      .then((response) => {
        console.log(response.data);
        resolve(response.data);
      })
      .catch((error) => {
        Alert.alert(error);
        throw error;
      });
  });
};

export const getEventListByFilter = (
  event_name: string | undefined | null,
  address_name: string | undefined | null,
  user_id: string | undefined | null
): Promise<EventData[]> => {
  return new Promise((resolve) => {
    console.log("Entro aqui");
    api
      .get<EventData[]>("/events-find-by", {
        params: {
          event_name: event_name,
          address_name: address_name,
          user_id: user_id,
        },
      })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        Alert.alert(error);
        throw error;
      });
  });
};

export const deleteEvent = async (id: string) => {
  const response = await api.delete("/events/" + id).catch(function (error) {
    return {
      status: error.response.status,
      data: error.response.data,
      todos: error.response,
    };
  });
  return response;
};
