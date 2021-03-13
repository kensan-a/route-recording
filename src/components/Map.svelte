<script lang="ts">
  import { onMount } from "svelte";
  import mapboxgl from "mapbox-gl";

  export let longitude = 0;
  export let latitude = 0;

  let map;
  let container;

  $: {
    if (map) {
      console.log("Map component updated:");

      const center = map.getCenter();

      if (longitude !== center.lng || latitude !== center.lat) {
        console.log("Specified position changed:");
        console.log(center.lng, "-> ", longitude);
        console.log(center.lat, "->", latitude);

        map.flyTo({
          center: [longitude, latitude],
          zoom: map.getZoom()
        });
      }
    }
  }

  const { Map, NavigationControl, ScaleControl, GeolocateControl } = mapboxgl;

  onMount(() => {
    console.log(process.env.MAPBOXGL_ACCESSTOKEN);
    mapboxgl.accessToken = process.env.MAPBOXGL_ACCESSTOKEN;

    map = new Map({
      container,
      // style: "mapbox://styles/mapbox/streets-v11",
      style: "mapbox://styles/kensan-a/cklxcdkcf2x2t17pocqa2v8mk",
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
      const center = map.getCenter();
      const zoom = map.getZoom();

      longitude = center.lng;
      latitude = center.lat;

      console.log("Map is moved:");
      console.log(longitude, latitude, zoom);
    });

    map.on("click", e => {
      console.log(e.lngLat);
    });

    map.on('load', function() {
      map.addLayer({
        'id': 'route',
        'type': 'line',
        'source': {
          'type': 'geojson',
          'data': {
            'type': 'Feature',
            'properties': {},
            'geometry': {
              'type': 'LineString',
              'coordinates': [
                [139.53363275125986, 35.41085613181484],
                [139.5336149218278, 35.41101306978793],
                [139.53356737669725, 35.411139976255285],
                [139.53337125295047, 35.41110510123171],
                [139.53324525829214, 35.411073132446674],
                [139.5331335271798, 35.41116128874815]
              ]
            }
          }
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
