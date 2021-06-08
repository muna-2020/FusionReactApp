import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { Subtraction } from './subtraction.component';

@NgModule({
    imports: [BrowserModule, FormsModule],
    declarations: [Subtraction],
    bootstrap: [Subtraction]
})
export class AppModuleSubtraction { }