import 'hammerjs';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {  AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { HomeModule } from './home/home.module';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/material.module';
import { TodoModule } from './todo/todo.module';

const firebaseConfig = {
  apiKey: "AIzaSyDl_ePdwsI0LLD31Q1SXK5PqfVf4zkxWjQ",
  authDomain: "davids-firebase-todo.firebaseapp.com",
  databaseURL: "https://davids-firebase-todo.firebaseio.com",
  projectId: "davids-firebase-todo",
  storageBucket: "davids-firebase-todo.appspot.com",
  messagingSenderId: "848532170779"
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    HomeModule,
    SharedModule,
    TodoModule,
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
