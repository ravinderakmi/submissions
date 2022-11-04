import { Component, Input, OnInit } from '@angular/core';
import { circle, geoJSON, icon, latLng, Layer, marker, polygon, tileLayer } from 'leaflet';

import { LeafletLayersDemoModel } from './layers.model';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  @Input()
  public set locations(locations: any[]) {
    this.markers = locations.map(location => {
      const newMarker = marker(
        location?.location,
        {
          icon: icon({
            iconSize: [25, 41],
            iconAnchor: [13, 41],
            iconUrl: 'assets/leaflet/marker-icon.png',
            iconRetinaUrl: 'assets/leaflet/marker-icon-2x.png',
            shadowUrl: 'assets/leaflet/marker-shadow.png'
          })
        }
      );
      return newMarker
    })

  }

  ngOnInit(): void {
    this.init();
  }

  LAYER_OSM = tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: 'Open Street Map' });

  markers: Layer[] = []

  options = {
    zoom: 5,
    center: latLng(28.7041, 77.1025),
    layers: [this.LAYER_OSM]
  };

  constructor() { }

  init() {

  }

}
