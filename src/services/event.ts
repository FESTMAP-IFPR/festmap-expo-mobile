import { EventData } from "../interfaces/interfaces";

export const getEventList = (): Promise<EventData[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          name: `Event 1`,
          description:
            "Evento,Evento,Evento,Evento,Evento,Evento,EventoEvento,Evento,Evento,Evento,Evento,Evento,EventoEvento,Evento,Evento,Evento,Evento,Evento,EventoEvento,Evento,Evento,Evento,Evento,Evento,EventoEvento,Evento,Evento,Evento,Evento,Evento,Evento",
          image: "",
        },
        {
          name: `Event 2`,
          description:
            "Evento,Evento,Evento,Evento,Evento,Evento,EventoEvento,Evento,Evento,Evento,Evento,Evento,EventoEvento,Evento,Evento,Evento,Evento,Evento,EventoEvento,Evento,Evento,Evento,Evento,Evento,EventoEvento,Evento,Evento,Evento,Evento,Evento,Evento",
          image: "",
        },
        {
          name: `Event 3`,
          description:
            "Evento,Evento,Evento,Evento,Evento,Evento,EventoEvento,Evento,Evento,Evento,Evento,Evento,EventoEvento,Evento,Evento,Evento,Evento,Evento,EventoEvento,Evento,Evento,Evento,Evento,Evento,EventoEvento,Evento,Evento,Evento,Evento,Evento,Evento",
          image: "",
        },
        {
          name: `Event 4`,
          description:
            "Evento,Evento,Evento,Evento,Evento,Evento,EventoEvento,Evento,Evento,Evento,Evento,Evento,EventoEvento,Evento,Evento,Evento,Evento,Evento,EventoEvento,Evento,Evento,Evento,Evento,Evento,EventoEvento,Evento,Evento,Evento,Evento,Evento,Evento",
          image: "",
        },
        {
          name: `Event 5`,
          description:
            "Evento,Evento,Evento,Evento,Evento,Evento,EventoEvento,Evento,Evento,Evento,Evento,Evento,EventoEvento,Evento,Evento,Evento,Evento,Evento,EventoEvento,Evento,Evento,Evento,Evento,Evento,EventoEvento,Evento,Evento,Evento,Evento,Evento,Evento",
          image: "",
        },
        {
          name: `Event 6`,
          description:
            "Evento,Evento,Evento,Evento,Evento,Evento,EventoEvento,Evento,Evento,Evento,Evento,Evento,EventoEvento,Evento,Evento,Evento,Evento,Evento,EventoEvento,Evento,Evento,Evento,Evento,Evento,EventoEvento,Evento,Evento,Evento,Evento,Evento,Evento",
          image: "",
        },
      ]);
    }, 2000);
  });
};
