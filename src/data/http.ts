import axios from "axios";
import { IRoomResponse } from "data/api";
import * as process from "process";

const baseUrl = process.env.REACT_APP_SERVER;

export const createRoom = () =>
  axios.post<IRoomResponse>(`${baseUrl}/rooms`, {
    headers: {
      Accept: "application/json",
    },
  });

export const retrieveRoom = (room: string) =>
  axios.get<IRoomResponse>(`${baseUrl}/rooms?code=${room}`, {
    headers: {
      Accept: "application/json",
    },
  });
