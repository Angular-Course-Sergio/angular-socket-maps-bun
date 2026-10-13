import { bootstrapApplication } from '@angular/platform-browser';
import mapboxgl from 'mapbox-gl';

import { appConfig } from './app/app.config';
import { App } from './app/app';
import { environment } from './environments/environment';

mapboxgl.accessToken = environment.mapboxKey;

// Angular's build rewrites object spread into helper functions that do not exist
// inside Mapbox's inline worker, so load the untransformed worker copied in angular.json.
mapboxgl.workerUrl = 'mapbox-gl-csp-worker.js';

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
