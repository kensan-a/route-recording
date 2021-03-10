import dayjs from "dayjs";

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

const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};

export const getCurrentPosition = () => {
  return new Promise((resolve, reject) => {
    const success = (pos) => {
      console.log(pos.coords);
      console.log(pos.timestamp);
      resolve(pos);
    };

    const error = (err) => {
      reject(err);
    };

    navigator.geolocation.getCurrentPosition(success, error, options);
  });
};

export const watchPosition = (callback) => {
  const error = (err) => {
    throw err;
  };

  const id = navigator.geolocation.watchPosition(callback, error, options);
};

export const printPosition = (pos) => {
  const { coords, timestamp } = pos;

  console.log("Your current position:");
  console.log(
    `Longitude: ${coords.longitude} Latitude : ${coords.latitude} Accuracy: ${coords.accuracy} meters.`
  );
  console.log(
    `Altitude: ${coords.altitude} meters. Accuracy: ${coords.altitudeAccuracy} meters.`
  );
  console.log(`Heading: ${coords.heading} degrees.`);
  console.log(`Speed: ${coords.speed} meters/second.`);
  console.log(`Timestamp: ${dayjs(timestamp).format("YYYY/MM/DD HH:mm:ss")}`);
};
