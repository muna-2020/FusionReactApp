import 'core-js';
import 'reflect-metadata';
import 'zone.js/dist/zone';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModuleAddition } from './addition.module';

platformBrowserDynamic().bootstrapModule(AppModuleAddition);