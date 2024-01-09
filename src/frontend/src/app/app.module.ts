import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HexTestComponent } from './hex-test/hex-test.component';
import {MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { StorychatComponent } from './storychat/storychat.component';
import { TabComponent } from './tab/tab.component';
import { GptchatComponent } from './gptchat/gptchat.component';
import { LoginscreenComponent } from './loginscreen/loginscreen.component';

@NgModule({
  declarations: [
    AppComponent,
    HexTestComponent,
    StorychatComponent,
    TabComponent,
    GptchatComponent,
    LoginscreenComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    HttpClientModule,
    MatDialogModule,
    MatButtonModule,
    BrowserAnimationsModule,
    MatTabsModule

  ],
  providers: [     {
    provide: MatDialogRef,
    useValue: {}
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
