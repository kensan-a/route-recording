let wakeLock = null;

export const requestWakeLock = async (releaseCallback: () => void) => {
  if (!("wakeLock" in navigator)) {
    throw new Error("Wake lock API is not supported.");
  }

  try {
    // @ts-ignore
    wakeLock = await navigator.wakeLock.request('screen');
    console.log('Screen Wake Lock is active');

    wakeLock.addEventListener("release", releaseCallback);
  } catch (err) {
    throw err;
  }
};

const releaseCallback = () => {
  console.log('Screen Wake Lock released:', wakeLock.released);
};

export const startWakeLock = async () => {
  await requestWakeLock(releaseCallback);

  const handleVisibilityChange = async () => {
    if (wakeLock !== null && document.visibilityState === "visible") {
      await requestWakeLock(releaseCallback);
    }
  };

  document.addEventListener("visibilitychange", handleVisibilityChange);
};

export const stopWakeLock = () => {
  if (wakeLock) {
    wakeLock.release();
    wakeLock = null;
  }
}
