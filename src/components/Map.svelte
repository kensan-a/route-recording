<script lang="ts">
  import { onMount } from "svelte";
  import Map from "./api/map";
  import { lineString, length } from "@turf/turf";

  let map;
  let container;

  export const flyTo = (longitude, latitude, zoom = null) => {
    if (!zoom) zoom = map.getZoom();

    map.flyTo({
      center: [longitude, latitude],
      zoom,
    });
  };

  export const addRoute = (route) => {
    const routeLineString = lineString(route);
    const routeLength = length(routeLineString, {units: "kilometers"});
    console.log(`Length of route = ${routeLength} kilometers.`);

    map.addLayer({
      'id': 'route',
      'type': 'line',
      'source': {
        'type': 'geojson',
        'data': routeLineString,
      },
      'layout': {
        'line-join': 'round',
        'line-cap': 'round'
      },
      'paint': {
      'line-color': '#3cb371',
      'line-width': 4
      }
    });
  };

  onMount(() => {
    console.log(process.env.MAPBOXGL_ACCESSTOKEN);

    map = new Map(process.env.MAPBOXGL_ACCESSTOKEN, {
      container,
      // style: "mapbox://styles/mapbox/streets-v11",
      // style: "mapbox://styles/kensan-a/cklxcdkcf2x2t17pocqa2v8mk",
      style: "mapbox://styles/kensan-a/ckm8pt3kr3os317rvf6e3voor",
      // center: [longitude, latitude],
      zoom: 15
    });

    map.on("moveend", e => {
      const center = map.getCenter();
      const zoom = map.getZoom();
      console.log(`Map moved: [${center.lng}, ${center.lat}] zoom=${zoom}`);
    });

    map.on("click", e => {
      const { lng, lat } = e.lngLat;
      console.log(`Map pointed: [${lng}, ${lat}]`)
    });

    map.on("load", e => {
      console.log("Map loaded.");
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

<div class="map" bind:this={container}></div>

<!-- 
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
     -->
