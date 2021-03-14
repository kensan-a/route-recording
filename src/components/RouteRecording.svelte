<script lang="ts">
  import Log from "./Log.svelte";
  import Map from "./Map.svelte";

  import {
    getCurrentPosition,
    startWatchPosition,
    stopWatchPosition,
    printPosition,
    printPositionShort
  } from "./api/geolocation";

  let isWatchPosition = false;
  let positions = [];

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

  const watchPositionCallback = newPosition => {
    printPositionShort(newPosition);
    positions = [...positions, newPosition];
  };

  const toggleWatchPosition = () => {
    if (isWatchPosition) {
      stopWatchPosition();
      isWatchPosition = false;
    } else {
      startWatchPosition(watchPositionCallback);
      isWatchPosition = true;
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
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .content {
    flex: 1 1 auto;
    overflow: hidden;
  }
</style>

<div class="wrapper">
  <section class="menu">
    <a href="#!" on:click|preventDefault={toggleWatchPosition}>
      {`位置記録${isWatchPosition? "停止": "開始"}`}
    </a>

    {#if !isWatchPosition}
      <a href="#!" target="_self" on:click|preventDefault={flyToCurrentPosition}>
        現在位置へ
      </a>
    {/if}
  </section>

  <section class="content">
    {#if isWatchPosition}
      <Log {positions} />
    {:else}
      <Map bind:longitude={longitude} bind:latitude={latitude} />
    {/if}
  </section>
</div>
