import { Component, ElementRef, OnInit, output, viewChild } from '@angular/core';
import mapboxgl from 'mapbox-gl';
import { LatLng } from '../../../types';

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

  public center = output<LatLng>();

  ngOnInit(): void {
    if (!this.mapElement()) throw new Error('Map element not found');

    this.map = new mapboxgl.Map({
      container: this.mapElement()!.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [-122.473043, 37.80333],
      zoom: 16,
    });

    this.center.emit({ lat: 37.80333, lng: -122.473043 });

    this.map.on('moveend', () => {
      const currentCenter = this.map!.getCenter();
      this.center.emit({ lat: currentCenter.lat, lng: currentCenter.lng });
    });
  }
}
