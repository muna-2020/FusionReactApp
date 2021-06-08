import 'core-js';
import 'reflect-metadata';
import 'zone.js/dist/zone';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModuleMultiplication } from './multiplication.module';

platformBrowserDynamic().bootstrapModule(AppModuleMultiplication);