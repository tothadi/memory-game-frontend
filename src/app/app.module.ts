import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { SetupComponent } from './setup/setup.component';
import { GameComponent } from './game/game.component';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { AuthenticationService } from './authentication.service';
import { AuthGuardService } from './auth-guard.service';
import { SettingsService } from './settings.service';
import { ResponsiveModule } from 'ngx-responsive'
import { SimpleTimer } from 'ng2-simple-timer';
import { AppRoutingModule } from './app-routing.module';
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
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    ResponsiveModule.forRoot(),
    AppRoutingModule
  ],
  providers: [
    AuthenticationService, 
    AuthGuardService,
    SettingsService,
    ResultService,
    SimpleTimer
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
