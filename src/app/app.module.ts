import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {   ReactiveFormsModule ,FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EntryComponent } from './entry/entry.component';
import { EntryimageComponent } from './entryimage/entryimage.component';
import { FriendsComponent } from './friends/friends.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SelfdetailsComponent } from './selfdetails/selfdetails.component';
import { HelpsComponent } from './helps/helps.component';
import { InfosComponent } from './infos/infos.component';

@NgModule({
  declarations: [
    AppComponent,
    EntryComponent,
    EntryimageComponent,
    FriendsComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    SelfdetailsComponent,
    HelpsComponent,
    InfosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
