<script lang="ts">
  import { onMount } from "svelte";
  import Log from "./Log.svelte";
  import Map from "./Map.svelte";
  import Download from "./common/Download";

  import {
    getCurrentPosition,
    startWatchPosition,
    stopWatchPosition,
    printPosition,
    printPositionShort
  } from "./api/geolocation";

  let map = null;

  let isWatchPosition = false;
  let positions = [];

  $: route = positions.map(position => [position.coords.longitude, position.coords.latitude]);

  const addRoute = () => {
    map.addRoute([
      [139.53363275125986, 35.41085613181484],
      [139.5336149218278, 35.41101306978793],
      [139.53356737669725, 35.411139976255285],
      [139.53337125295047, 35.41110510123171],
      [139.53324525829214, 35.411073132446674],
      [139.5331335271798, 35.41116128874815],
      [139.53287126011406, 35.41135358044839],
    ]);
  };

  const flyToCurrentPosition = async (zoom = null) => {
    try {
      const pos = await getCurrentPosition();
      printPosition(pos);
      map.flyTo(pos.coords.longitude, pos.coords.latitude, zoom);
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

  onMount(() => {
    flyToCurrentPosition(15);
  });
</script>

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
      <a href="#!" target="_self" on:click|preventDefault={() => flyToCurrentPosition()}>
        現在位置へ
      </a>

      <a href="#!" target="_self" on:click|preventDefault={addRoute}>
        ルート表示
      </a>

      <Download 
        content={JSON.stringify(positions)}
        type="text/json"
        fileName="route.csv"
      >
        <span class="material-icons">cloud_download</span>
      </Download>
    {/if}
  </section>

  <section class="content">
    {#if isWatchPosition}
      <Log {positions} />
    {:else}
      <Map bind:this={map} />
    {/if}
  </section>
</div>
