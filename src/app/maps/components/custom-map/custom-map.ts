import { Component, ElementRef, inject, OnInit, output, viewChild } from '@angular/core';
import mapboxgl from 'mapbox-gl';
import type { Client, LatLng } from '../../../types';
import { WebSocketService } from '../../../web-sockets/services/websocket.service';

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

  private wsService = inject(WebSocketService);

  private mapElement = viewChild<ElementRef<HTMLDivElement>>('map');
  private map: mapboxgl.Map | null = null;
  private markers = new Map<string, mapboxgl.Marker>();
  public center = output<LatLng>();

  private onMessage$ = this.wsService.onMessage.subscribe(message => {
    switch (message.type) {
      case 'WELCOME': {
        this.createMarkers([message.payload], true);
        break;
      }
    }
  });

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

  private createMarkers(clients: Client[], isDraggable = false) {

    if (!this.map) return;

    for (const client of clients) {
      const marker = new mapboxgl.Marker({
        color: client.color,
        draggable: isDraggable
      })
        .setLngLat({ lng: client.coords.lng, lat: client.coords.lat })
        .setPopup(this.createPopup(client))
        .addTo(this.map!);

      this.markers.set(client.clientId, marker)
    }
  }

  private createPopup(client: Client): mapboxgl.Popup {
    const isCurrentClient = client.clientId === this.wsService.client()?.clientId;

    // Build the content with DOM nodes so names sent by other users are never parsed as HTML.
    const content = document.createElement('div');
    content.className = 'client-popup__body';

    const swatch = document.createElement('span');
    swatch.className = 'client-popup__swatch';
    swatch.style.backgroundColor = client.color;

    const name = document.createElement('strong');
    name.className = 'client-popup__name';
    name.textContent = client.name;
    name.title = client.name;

    content.append(swatch, name);

    if (isCurrentClient) {
      const badge = document.createElement('span');
      badge.className = 'client-popup__badge';
      badge.textContent = 'Tú';
      content.append(badge);
    }

    return new mapboxgl.Popup({ offset: 25, className: 'client-popup', maxWidth: '280px' })
      .setDOMContent(content);
  }
}
