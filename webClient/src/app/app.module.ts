import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { GoalsComponent } from './goals/goals.component';
import { MessagesComponent } from './messages/messages.component';
import { GoalDetailsComponent } from './goal-details/goal-details.component';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';

import { HttpClientModule } from '@angular/common/http';
import { SandboxComponent } from './sandbox/sandbox.component';
import { LoginComponent } from './login/login.component';
import { LoginMockComponent } from './login-mock/login-mock.component';
import { LoginService } from './login.service';


@NgModule({
  declarations: [
    AppComponent,
    GoalsComponent,
    MessagesComponent,
    GoalDetailsComponent,
    SandboxComponent,
    LoginComponent,
    LoginMockComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    // HttpClientInMemoryWebApiModule.forRoot(
    //   InMemoryDataService, { dataEncapsulation: false }
    // )
  ],
  providers: [LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
