import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './componets/home/home.component';
import { LoginComponent } from './componets/login/login.component';
import { MessagesComponent } from './componets/messages/messages.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import {DropdownModule} from 'primeng/dropdown';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { DropdownModule } from 'primeng/dropdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {BadgeModule} from 'primeng/badge';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    MessagesComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    // DropdownModule,
    FontAwesomeModule,
    DropdownModule,
    BrowserAnimationsModule ,
    BadgeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
