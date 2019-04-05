import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
//import { RmLibModule } from 'rm-lib';
import {RmLibModule} from '../../projects/rm-lib/src/lib/rm-lib.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RmLibModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
