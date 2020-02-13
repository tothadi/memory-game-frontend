import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { MDBBootstrapModule } from 'angular-bootstrap-md'
import { ResponsiveModule } from 'ngx-responsive'
import { SimpleTimer } from 'ng2-simple-timer';
import { ChartsModule } from 'ng2-charts'

import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { SetupComponent } from './setup/setup.component';
import { GameComponent } from './game/game.component';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { PolicyComponent } from './policy/policy.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { MenuComponent } from './menu/menu.component';
import { ChartsComponent } from './charts/charts.component';

import { AuthenticationService } from './authentication.service';
import { AuthGuardService } from './auth-guard.service';
import { SettingsService } from './settings.service';
import { ResultService } from './result.service';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    SetupComponent,
    GameComponent,
    ProfileComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    PolicyComponent,
    NotfoundComponent,
    MenuComponent,
    ChartsComponent
  ],
  imports: [
    BrowserModule,
    MDBBootstrapModule.forRoot(),
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    ResponsiveModule.forRoot(),
    AppRoutingModule,
    ChartsModule
  ],
  providers: [
    AuthenticationService, 
    AuthGuardService,
    SettingsService,
    ResultService,
    SimpleTimer
  ],
  schemas: [ NO_ERRORS_SCHEMA ],
  bootstrap: [AppComponent]
})
export class AppModule { }
