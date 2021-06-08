import 'core-js';
import 'reflect-metadata';
import 'zone.js/dist/zone';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModuleSubtraction } from './subtraction.module';

platformBrowserDynamic().bootstrapModule(AppModuleSubtraction);