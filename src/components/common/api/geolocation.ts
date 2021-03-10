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

export const getCurrentPosition = () => {
  return new Promise((resolve, reject) => {
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };

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

// export const watchPosition = (callback: (pos: Position) => void) => {

// }
