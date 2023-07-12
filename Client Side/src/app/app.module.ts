import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { HeaderModule } from '@coreui/angular';
import * as i19 from "@coreui/icons-angular";
import { HeaderComponent } from './Components/header/header.component';
import { MapSettingsComponent } from './Components/map-settings/map-settings.component';
import { HttpClientModule } from '@angular/common/http';

const MatrialComponent = [MatSlideToggleModule];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MapSettingsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    HeaderModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
