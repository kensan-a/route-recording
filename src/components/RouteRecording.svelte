<script lang="ts">
  import { onMount } from "svelte";
  import mapboxgl from "mapbox-gl";

  // import Map from "../components/Map.svelte";

  const { Map, NavigationControl, ScaleControl, GeolocateControl } = mapboxgl;
  let map;
  let container;

  onMount(() => {
    mapboxgl.accessToken =
      "pk.eyJ1Ijoia2Vuc2FuLWEiLCJhIjoiY2tseGJzc3k1MDhrajJwbnZhNDVubnpkaiJ9.uZBfIS1iB7V73xxoslqusA";

    map = new Map({
      container,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [139.7644081, 35.680043],
      zoom: 18
    });

    map.addControl(new NavigationControl());

    map.addControl(
      new ScaleControl({
        maxWidth: 200,
        unit: "metric"
      }),
      "bottom-right"
    );

    map.addControl(
      new GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true
        },
        trackUserLocation: false
      })
    );

    map.on("moveend", e => {
      console.log(map.getCenter());
      console.log(map.getZoom());
    });
  });

  const flyToCurrentPosition = () => {
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };

    const success = pos => {
      const { latitude, longitude, accuracy } = pos.coords;

      console.log("Your current position is:");
      console.log(`Latitude : ${latitude}`);
      console.log(`Longitude: ${longitude}`);
      console.log(`More or less ${accuracy} meters.`);

      map.flyTo({
        center: [longitude, latitude],
        zoom: map.getZoom()
      });
    };

    const error = err => {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    };

    navigator.geolocation.getCurrentPosition(success, error, options);
  };
</script>

<svelte:head>
  <link href='https://api.mapbox.com/mapbox-gl-js/v2.1.1/mapbox-gl.css' rel='stylesheet' />
</svelte:head>

<style>
  .wapper {
    display: flex;
  }

  .map {
    width: 100%;
    height: 90%;
  }
</style>

<a href="#!" target="_self" on:click={flyToCurrentPosition}>
  現在位置へ
</a>

<div class="map" bind:this={container}></div>
<!-- <Map /> -->

  <!-- <script
    src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDRo134Nk1ubkPS5gm6mdyQ64gCVUhSIuc&libraries=places"
  ></script> -->

  <!-- const startMap = () => {
    cmanPosWatch(window.google.maps);
  }; -->

  <!-- // import { cmanPosWatch } from "./common/getLocation";

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
    // }); -->
