<script lang="ts">
  // import Map from "../components/Map.svelte";
  import { cmanPosWatch } from "./common/getLocation";

  const startMap = () => {
    cmanPosWatch(window.google.maps);
  };
</script>

<svelte:head>
  <script
    src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDRo134Nk1ubkPS5gm6mdyQ64gCVUhSIuc&libraries=places"
  ></script>
</svelte:head>

<style>
  #watMap { height: 600px; width: 600px}
</style>

<a href="#!" target="_self" on:click={startMap}>
  ルート記録開始
</a>

<div id="watMap"></div>
<!-- <Map /> -->
