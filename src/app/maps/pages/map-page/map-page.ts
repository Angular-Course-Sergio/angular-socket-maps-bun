import { Component } from '@angular/core';
import { ConnectForm } from '../../components/connect-form/connect-form';
import { CustomMap } from '../../components/custom-map/custom-map';

@Component({
  selector: 'map-page',
  imports: [ConnectForm, CustomMap],
  templateUrl: './map-page.html',
})
export class MapPage {

  connectForm(formData: { name: string; color: string; }) {
    console.log({ formData })
  }

}
