import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClimateService } from './services/climate.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from "@angular/flex-layout";
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import {TextShrinkPipe} from "./table-text-shrink.pipe";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {CdkTableModule} from '@angular/cdk/table';
import {CdkTreeModule} from '@angular/cdk/tree';
import {CdkDetailRowDirective} from './cdk-detail-row.directive';
import {MatInputModule} from "@angular/material/input";
import {GraphicsComponent} from "./graphics/graphics.component";
import {MatCardModule} from "@angular/material/card";
import {ClimatesComponent} from "./climates/climates.component";
import { HighchartsChartModule } from 'highcharts-angular';
import {MatSortModule} from "@angular/material/sort";

@NgModule({
  declarations: [
    AppComponent,
    GraphicsComponent,
    ClimatesComponent,
    TextShrinkPipe,
    CdkDetailRowDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatSidenavModule,
    HttpClientModule,
    MatIconModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    HighchartsChartModule,
    MatCheckboxModule,
    MatSortModule,
    MatInputModule,
    CdkTableModule,
    CdkTreeModule,
    FlexLayoutModule,
    MatToolbarModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
  ],
  providers: [ClimateService],
  bootstrap: [AppComponent]
})
export class AppModule { }
