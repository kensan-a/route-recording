export interface Coordinates {
  longitude: number;
  latitude: number;
  accuracy: number;
  altitude: number;
  altitudeAccuracy: number;
  heading: number;
  speed: number;
}

export interface Position {
  coords: Coordinates;
  timestamp: number;
}

export type WatchPositionCallback = (position: Position) => void;
export type WatchPositionErrorCallback = (error: any) => void;
