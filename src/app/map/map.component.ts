import { Component, OnInit } from '@angular/core';
import { circle, geoJSON, icon, latLng, Layer, marker, polygon, tileLayer } from 'leaflet';

import { LeafletLayersDemoModel } from './layers.model';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  ngOnInit(): void {
    this.init();
  }

  LAYER_OCM = {
    id: 'opencyclemap',
    name: 'Open Cycle Map',
    enabled: true,
    layer: tileLayer('http://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: 'Open Cycle Map'
    })
  };

  LAYER_OSM = {
    id: 'openstreetmap',
    name: 'Open Street Map',
    enabled: false,
    layer: tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: 'Open Street Map'
    })
  };

  marker = {
    id: 'marker',
    name: 'Marker',
    enabled: true,
    layer: marker([46.879966, -121.726909], {
      icon: icon({
        iconSize: [25, 41],
        iconAnchor: [13, 41],
        iconUrl: 'assets/leaflet/marker-icon.png',
        iconRetinaUrl: 'assets/leaflet/marker-icon-2x.png',
        shadowUrl: 'assets/leaflet/marker-shadow.png'
      })
    })
  };

  geoJSON = {
    id: 'geoJSON',
    name: 'Geo JSON Polygon',
    enabled: true,
    layer: geoJSON(
      ({
        type: 'Polygon',
        coordinates: [[
          [-121.6, 46.87],
          [-121.5, 46.87],
          [-121.5, 46.93],
          [-121.6, 46.87]
        ]]
      }) as any,
      { style: () => ({ color: '#ff7800' }) })
  };

  // Form model object
  model = new LeafletLayersDemoModel(
    [this.LAYER_OSM, this.LAYER_OCM],
    this.LAYER_OCM.id,
    [this.marker, this.geoJSON]
  );

  layers: Layer[] = [];

  layersControl = {
    baseLayers: {
      'Open Street Map': this.LAYER_OSM.layer,
      'Open Cycle Map': this.LAYER_OCM.layer
    },
    overlays: {
      Marker: this.marker.layer,
      GeoJSON: this.geoJSON.layer
    }
  };

  options = {
    zoom: 10,
    center: latLng(46.879966, -121.726909)
  };

  constructor() {}

  init() {
    const baseLayer = this.model.baseLayers.find((l: any) => (l.id === this.model.baseLayer));
    const newLayers = this.model.overlayLayers
      .filter((l: any) => l.enabled)
      .map((l: any) => l.layer);
    baseLayer && newLayers.unshift(baseLayer.layer);
    this.layers = newLayers;
    return false;
  }

}
