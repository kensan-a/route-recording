<script lang="ts">
  import Map from "./Map.svelte";
  import { getCurrentPosition, printPosition } from "./common/api";

  let longitude = 139.7644081;
  let latitude = 35.680043;

  const flyToCurrentPosition = async () => {
    try {
      const pos = await getCurrentPosition();
      printPosition(pos);

      longitude = pos.coords.longitude;
      latitude = pos.coords.latitude;
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
