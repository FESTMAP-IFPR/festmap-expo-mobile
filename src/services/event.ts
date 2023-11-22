import { EventData } from "../interfaces/interfaces";
import axios from "axios";
import { api } from "./api";
import { Alert } from "react-native";

export const createEvent = async (event: EventData) => {
  try {
    const requestBody = event;
    console.log("Entro aqui");
    const response = api
      .post<any>("/event/create", requestBody)
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
      .get<EventData[]>("/event/find-all")
      .then((response) => {
        console.log(response.data);
        resolve(response.data);
      })
      .catch((error) => {
        console.log(error);
        console.log(error.response.data);
        Alert.alert(error.response.data.message);
        throw error;
      });
  });
};

export const deleteEvent = async (id: string) => {
  const response = await api.post("event/delete", { id: id }, {
    headers: {
      "Content-Type": "application/json",
    }
  }).catch(function (error) {
    return {
      status: error.response.status,
      data: error.response.data,
      todos: error.response,
    };
  });
  return response;
}