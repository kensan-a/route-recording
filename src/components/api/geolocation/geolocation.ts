import dayjs from "dayjs";
import type { Position, WatchPositionCallback, WatchPositionErrorCallback } from "./types";

const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};

export const getCurrentPosition = (): Promise<Position> => new Promise((resolve, reject) => {
  navigator.geolocation.getCurrentPosition(resolve, reject, options);
});

let watchPositionId = null;

export const startWatchPosition = (callback: WatchPositionCallback) => {
  const error: WatchPositionErrorCallback = (err) => {
    throw err;
  };

  watchPositionId = navigator.geolocation.watchPosition(
    callback,
    error,
    options
  );
};

export const stopWatchPosition = () => {
  if (typeof watchPositionId === "number") {
    navigator.geolocation.clearWatch(watchPositionId);
  }
};

export const printPosition = (pos: Position) => {
  const { coords, timestamp } = pos;
  const {
    longitude,
    latitude,
    accuracy,
    altitude,
    altitudeAccuracy,
    heading,
    speed
  } = coords;
  const timestampText = dayjs(timestamp).format("YYYY/MM/DD HH:mm:ss");

  console.log(`Timestamp: ${timestampText}`);
  console.log(
    `Longitude: ${longitude} Latitude : ${latitude} Accuracy: ${accuracy} meters.`
  );

  if (altitude)
    console.log(
      `Altitude: ${altitude} meters. Accuracy: ${altitudeAccuracy} meters.`
    );
  if (heading) console.log(`Heading: ${heading} degrees.`);
  if (speed) console.log(`Speed: ${speed} meters/second.`);
};

export const printPositionShort = (pos: Position) => {
  const { coords, timestamp } = pos;
  const {
    longitude,
    latitude,
    accuracy,
    altitude,
    altitudeAccuracy,
    heading,
    speed
  } = coords;
  const timestampText = dayjs(timestamp).format("YYYY/MM/DD HH:mm:ss");

  console.log(`${timestampText}:[${longitude}, ${latitude}](+-${accuracy}m)`);
};


export const toStringPositionShort = (pos: Position) => {
  const { coords, timestamp } = pos;
  const {
    longitude,
    latitude,
    accuracy,
    altitude,
    altitudeAccuracy,
    heading,
    speed
  } = coords;
  const timestampText = dayjs(timestamp).format("YYYY/MM/DD HH:mm:ss");

  return `${timestampText}:[${longitude}, ${latitude}](+-${accuracy}m)`;
};
