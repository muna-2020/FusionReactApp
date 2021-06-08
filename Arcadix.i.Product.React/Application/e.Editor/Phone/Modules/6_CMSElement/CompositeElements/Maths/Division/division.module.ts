import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { Division } from './division.component';

@NgModule({
    imports: [BrowserModule, FormsModule],
    declarations: [Division],
    bootstrap: [Division]
})
export class AppModuleDivision { }