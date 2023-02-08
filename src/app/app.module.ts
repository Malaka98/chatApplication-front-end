import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './components/login/login.component';
import {SingUpComponent} from './components/sing-up/sing-up.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {en_US, NZ_I18N} from 'ng-zorro-antd/i18n';
import {registerLocaleData} from '@angular/common';
import en from '@angular/common/locales/en';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';
import {NzNotificationModule} from "ng-zorro-antd/notification";
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { ChatComponent } from './components/dashboard/components/chat/chat.component';
import {NzModalModule} from "ng-zorro-antd/modal";
import {NzResultModule} from "ng-zorro-antd/result";

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SingUpComponent,
    DashboardComponent,
    PageNotFoundComponent,
    NavBarComponent,
    ChatComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    NzNotificationModule,
    NzModalModule,
    NzResultModule
  ],
  providers: [
    {provide: NZ_I18N, useValue: en_US}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
