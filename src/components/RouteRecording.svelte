<script lang="ts">
  import Map from "./Map.svelte";

  let longitude = 139.7644081;
  let latitude = 35.680043;

  const getCurrentPosition = () => {
    return new Promise((resolve, reject) => {
      const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      };

      const success = pos => {
        const { longitude, latitude, accuracy } = pos.coords;
        resolve({ longitude, latitude, accuracy });
      };

      const error = err => {
        reject(err);
      };

      navigator.geolocation.getCurrentPosition(success, error, options);
    });
  };

  const flyToCurrentPosition = async () => {
    try {
      const coords = await getCurrentPosition();

      console.log("Your current position is:");
      console.log(`Latitude : ${coords.latitude}`);
      console.log(`Longitude: ${coords.longitude}`);
      console.log(`More or less ${coords.accuracy} meters.`);

      longitude = coords.longitude;
      latitude = coords.latitude;
    } catch (err) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }
  };
</script>

<!-- <svelte:head>
  <link href='https://api.mapbox.com/mapbox-gl-js/v2.1.1/mapbox-gl.css' rel='stylesheet' />
</svelte:head> -->

<style>
  .wrapper {
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .menu {
    flex: 0 1 auto;
  }

  .map {
    flex: 1 1 auto;
  }
</style>

<div class="wrapper">
  <section class="menu">
    <a href="#!" target="_self" on:click={flyToCurrentPosition}>
      現在位置へ
    </a>
  </section>

  <section class="map">
    <Map bind:longitude={longitude} bind:latitude={latitude} />
  </section>
</div>
