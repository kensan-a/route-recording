<script lang="ts">
  // import { onMount } from "svelte";
  import Map from "./Map.svelte";
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
    <!-- <a href="#!" target="_self" on:click={flyToCurrentPosition}>
      現在位置へ
    </a> -->
  </section>

  <section class="map">
    <Map />
  </section>
</div>
