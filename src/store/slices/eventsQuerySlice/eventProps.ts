export type Event = {
  name: string;
  text: string;
  date: string;
  time: string;
};

export type EventWithId = Event & { id: string };
