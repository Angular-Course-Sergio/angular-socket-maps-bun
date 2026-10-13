import { Client, LatLng } from "../../types";

export type ClientMessage =
  |
  {
    type: 'CLIENT_REGISTER',
    payload: { name: string; color: string; coords: LatLng; }
  }
  |
  {
    type: 'CLIENT_MOVE',
    payload: { coords: LatLng; }
  }
  |
  {
    type: 'GET_CLIENTS',
    payload?: any
  }

export type ServerMessage =
  |
  {
    type: 'ERROR',
    payload: { error: string; }
  }
  |
  {
    type: 'WELCOME',
    payload: { clientId: string; }
  }
  |
  {
    type: 'CLIENT_STATE',
    payload: Client[];
  }
  |
  {
    type: 'CLIENT_JOIN',
    payload: Client;
  }
  |
  {
    type: 'CLIENT_MOVED',
    payload: { clientId: string; coords: LatLng; updatedAt: number }
  }
  |
  {
    type: 'CLIENT_LEFT',
    payload: { clientId: string; }
  }
