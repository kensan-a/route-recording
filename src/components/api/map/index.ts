import mapboxgl from "mapbox-gl";

export default class Map {
  map: mapboxgl.Map;

  constructor(accessToken: string, options: any) {
    mapboxgl.accessToken = accessToken;

    this.map = new mapboxgl.Map(options);

    const { NavigationControl, ScaleControl, GeolocateControl } = mapboxgl;

    this.map.addControl(new NavigationControl());

    this.map.addControl(
      new ScaleControl({
        maxWidth: 200,
        unit: "metric"
      }),
      "bottom-right"
    );

    this.map.addControl(
      new GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true
        },
        trackUserLocation: false
      })
    );
  }

  addLayer(layer: any) {
    this.map.addLayer(layer);
  }

  on(type: string, listener: any) {
    this.map.on(type, listener);
  }

  flyTo(options: any) {
    this.map.flyTo(options);
  }
}