import 'core-js';
import 'reflect-metadata';
import 'zone.js/dist/zone';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModuleDivision } from './division.module';

platformBrowserDynamic().bootstrapModule(AppModuleDivision);