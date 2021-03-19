<script lang="ts">
  import { onMount } from "svelte";
  import Map from "./api/map";
  import { lineString, length } from "@turf/turf";

  export let longitude;
  export let latitude;
  export let zoom;

  let map;
  let container;

  export const flyTo = (newLongitude, newLatitude, newZoom = undefined) => {
    longitude = newLongitude;
    latitude = newLatitude;
    zoom = (newZoom)? newZoom: map.getZoom();

    map.flyTo({
      center: [longitude, latitude],
      zoom,
    });
  };

  export const addRoute = (route) => {
    const routeLineString = lineString(route);
    const routeLength = length(routeLineString, {units: "kilometers"});

    console.log(`Length of route = ${routeLength} kilometers.`);

    const routeLayerId = "route-layer";
    const routeSourceId = "route-source"

    if (map.getLayer(routeLayerId)) map.removeLayer(routeLayerId);
    if (map.getSource(routeSourceId)) map.removeSource(routeSourceId);

    map.addSource(routeSourceId, {
      type: "geojson",
      data: routeLineString,
    });

    map.addLayer({
      id: routeLayerId,
      type: "line",
      source: routeSourceId,
      layout: {
        "line-join": "round",
        "line-cap": "round"
      },
      paint: {
        "line-color": "#3cb371",
        "line-width": 3
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
      center: [longitude, latitude],
      zoom,
    });

    map.on("moveend", e => {
      const { lng, lat } = map.getCenter();
      longitude = lng;
      latitude = lat;
      zoom = map.getZoom();
      console.log(`Map moved: [${longitude}, ${latitude}] zoom=${zoom}`);
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
