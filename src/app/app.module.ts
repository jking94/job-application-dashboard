import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ApplicationDetailComponent } from './application-detail/application-detail.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatInputModule,
  MatFormFieldModule,
  MatButtonModule,
  MatSelectModule,
  MatCheckboxModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatRadioModule
} from '@angular/material';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ApplicationDetailComponent
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSelectModule,
    MatCheckboxModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatRadioModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
