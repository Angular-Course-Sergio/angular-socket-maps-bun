import { Component, signal } from '@angular/core';
import { ConnectForm } from '../../components/connect-form/connect-form';
import { CustomMap } from '../../components/custom-map/custom-map';
import { LatLng } from '../../../types';

@Component({
  selector: 'map-page',
  imports: [ConnectForm, CustomMap],
  templateUrl: './map-page.html',
})
export class MapPage {

  public currentCenter = signal<LatLng>({ lat: 0, lng: 0 });

  connectForm(formData: { name: string; color: string; }) {
    console.log({ formData });
    console.log({ currentCenter: this.currentCenter() });
  }

}
