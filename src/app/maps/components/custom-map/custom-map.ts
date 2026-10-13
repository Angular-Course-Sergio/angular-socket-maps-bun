import { Component, ElementRef, OnInit, viewChild } from '@angular/core';
import mapboxgl from 'mapbox-gl';

@Component({
  selector: 'custom-map',
  imports: [],
  templateUrl: './custom-map.html',
  styles: `
  .map {
    width: 100vw;
    height: 100vh;
  }
  `
})
export class CustomMap implements OnInit {

  private mapElement = viewChild<ElementRef<HTMLDivElement>>('map');
  private map: mapboxgl.Map | null = null;

  ngOnInit(): void {
    if (!this.mapElement()) throw new Error('Map element not found');

    this.map = new mapboxgl.Map({
      container: this.mapElement()!.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [-122.473043, 37.80333],
      zoom: 16
    })
  }
}
