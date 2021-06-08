import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { Multiplication } from './multiplication.component';

@NgModule({
    imports: [BrowserModule, FormsModule],
    declarations: [Multiplication],
    bootstrap: [Multiplication]
})
export class AppModuleMultiplication { }

