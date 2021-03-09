<script lang="ts">
  import { onMount } from "svelte";
  import mapboxgl from "mapbox-gl";

  export let longitude = 0;
  export let latitude = 0;

  const lastSpecifiedPosition = {
    longitude: 0,
    latitude: 0
  };

  let map;
  let container;

  $: if (
    map &&
    (longitude !== lastSpecifiedPosition.longitude ||
      latitude !== lastSpecifiedPosition.latitude)
  ) {
    console.log("Specified position changed:", longitude, latitude);

    lastSpecifiedPosition.longitude = longitude;
    lastSpecifiedPosition.latitude = latitude;

    map.flyTo({
      center: [longitude, latitude],
      zoom: map.getZoom()
    });
  }

  const { Map, NavigationControl, ScaleControl, GeolocateControl } = mapboxgl;

  onMount(() => {
    mapboxgl.accessToken =
      "pk.eyJ1Ijoia2Vuc2FuLWEiLCJhIjoiY2tseGJzc3k1MDhrajJwbnZhNDVubnpkaiJ9.uZBfIS1iB7V73xxoslqusA";

    map = new Map({
      container,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [longitude, latitude],
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
      const lngLat = map.getCenter();
      const zoomLevel = map.getZoom();

      longitude = lngLat.lng;
      latitude = lngLat.lat;

      console.log(longitude, latitude, zoomLevel);
    });
  });
</script>

<svelte:head>
  <link href='https://api.mapbox.com/mapbox-gl-js/v2.1.1/mapbox-gl.css' rel='stylesheet' />
</svelte:head>

<style>
  .map {
    height: 100%;
  }
</style>

<div>
  <span>{longitude}</span>
  <apsn>{latitude}</apsn>
</div>

<div class="map" bind:this={container}></div>

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
