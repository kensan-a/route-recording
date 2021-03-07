<script lang="ts">
  import { onMount } from "svelte";
  import mapboxgl from "mapbox-gl";

  // import Map from "../components/Map.svelte";
  // import { cmanPosWatch } from "./common/getLocation";

  const { Map, NavigationControl, ScaleControl } = mapboxgl;
  let map;
  let container;

  onMount(() => {
    mapboxgl.accessToken =
      "pk.eyJ1Ijoia2Vuc2FuLWEiLCJhIjoiY2tseGJzc3k1MDhrajJwbnZhNDVubnpkaiJ9.uZBfIS1iB7V73xxoslqusA";

    map = new Map({
      container,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [139.7644081, 35.680043],
      zoom: 10
    });

    // const map = new Map({
    //   container: "watMap",
    //   style: {
    //     version: 8,
    //     sources: {
    //       cyberJapan: {
    //         type: "raster",
    //         tiles: ["https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png"],
    //         tileSize: 256,
    //         attribution:
    //           "<a href='https://maps.gsi.go.jp/development/ichiran.html' target='_blank'>地理院タイル</a>"
    //       }
    //     },
    //     layers: [
    //       {
    //         id: "main-layer",
    //         type: "raster",
    //         source: "cyberJapan",
    //         minzoom: 0,
    //         maxzoom: 22
    //       }
    //     ],
    //     center: [139.7644081, 35.680043],
    //     zoom: 10
    //   }
    // });

    map.addControl(new NavigationControl());

    map.addControl(
      new ScaleControl({
        maxWidth: 200,
        unit: "metric"
      }),
      "bottom-right"
    );

    map.on("moveend", e => {
      console.log(map.getCenter());
      console.log(map.getZoom());
    });
  });

  // const startMap = () => {
  //   cmanPosWatch(window.google.maps);
  // };
</script>

<svelte:head>
  <!-- <script
    src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDRo134Nk1ubkPS5gm6mdyQ64gCVUhSIuc&libraries=places"
  ></script> -->

  <link href='https://api.mapbox.com/mapbox-gl-js/v2.1.1/mapbox-gl.css' rel='stylesheet' />
</svelte:head>

<style>
  .map {
    width: 100%;
    height: 100%;
  }
</style>

<!-- <a href="#!" target="_self" on:click={startMap}>
  ルート記録開始
</a> -->

<div class="map" bind:this={container}></div>
<!-- <Map /> -->
