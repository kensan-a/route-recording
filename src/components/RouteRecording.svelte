<script lang="ts">
  // import Map from "../components/Map.svelte";
  import { cmanPosWatch } from "./common/getLocation";

  let ready;

  if (process.browser) {
    window.initMap = () => {
      console.log(initMap);
      ready = true;
    };
  }

  const startMap = () => {
    console.log("startMap: ready=", ready);
    console.log(window);
    console.log(google);    
    cmanPosWatch(window.google.maps);
  };
</script>

<svelte:head>
  <!-- <script
    defer
    async
    src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDRo134Nk1ubkPS5gm6mdyQ64gCVUhSIuc&callback=window.initMap&libraries=places"
  ></script> -->

  <script
    src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDRo134Nk1ubkPS5gm6mdyQ64gCVUhSIuc&libraries=places"
  ></script>

  <!-- <script src="http://maps.google.com/maps/api/js?key=AIzaSyDRo134Nk1ubkPS5gm6mdyQ64gCVUhSIuc&language=ja"></script> -->

  <!-- <script
    src="http://maps.google.com/maps/api/js?sensor=true&callback=initMap"
  ></script> -->

  <!-- <script
    src="http://maps.google.com/maps/api/js?sensor=true"
  ></script> -->
</svelte:head>

<style>
  /* html { height: 100% } */
  /* body { height: 100% } */
  #watMap { height: 600px; width: 600px}
</style>

<!-- {#if ready} -->
  <a href="#!" target="_self" on:click={startMap}>
    ルート記録開始
  </a>

  <div id="watMap"></div>
  <!-- <Map /> -->
<!-- {/if} -->
