import dayjs from "dayjs";
import type { Position, WatchPositionCallback, WatchPositionErrorCallback } from "./types";

const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 10000,
};

//
// Geolocationオブジェクトをオブジェクトに変換する。
//  ※Geolocationオブジェクトの各プロパティを単に別のオブジェクトにコピーしているだけだが、
//    これをしておかないと、なぜか後の処理でJSON.stringfyできないため。
//    参考：
//      https://stackoverflow.com/questions/11042212/ff-13-ie-9-json-stringify-geolocation-object
// 
const geolocationObjectToObject = (position: Position) => ({
  coords: {
    accuracy: position.coords.accuracy,
    altitude: position.coords.altitude,
    altitudeAccuracy: position.coords.altitudeAccuracy,
    heading: position.coords.heading,
    latitude: position.coords.latitude,
    longitude: position.coords.longitude,
    speed: position.coords.speed,
  },
  timestamp: position.timestamp,
});

export const getCurrentPosition = (): Promise<Position> => new Promise((resolve, reject) => {
  const success: WatchPositionCallback = (position) => {
    resolve(geolocationObjectToObject(position));
  };

  navigator.geolocation.getCurrentPosition(success, reject, options);
});

let watchPositionId = null;

export const startWatchPosition = (callback: WatchPositionCallback) => {
  const success: WatchPositionCallback = (position) => {
    callback(geolocationObjectToObject(position));
  };

  const error: WatchPositionErrorCallback = (err) => {
    throw err;
  };

  watchPositionId = navigator.geolocation.watchPosition(
    success,
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
