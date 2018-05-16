import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {LandingComponent} from './components/landing/landing.component';
import {SignUpComponent} from './components/sign-up/sign-up.component';
import {LogInComponent} from './components/log-in/log-in.component';
import {RouterModule, CanActivate} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {AuthService} from './services/auth.service';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {EffectsModule} from '@ngrx/effects';
import {AuthEffects} from './store/effects/auth.effects';
import {StoreModule} from '@ngrx/store';
import {reducers} from './store/app.states';
import {ErrorInterceptor, TokenInterceptor} from './services/token.interceptor';
import {StatusComponent} from './components/status/status.component';
import {AuthGuardService, AuthGuardService as AuthGuard} from './services/auth-guard.service';


@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    SignUpComponent,
    LogInComponent,
    StatusComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    StoreModule.forRoot(reducers, {}),
    EffectsModule.forRoot([AuthEffects]),
    RouterModule.forRoot([
      {path: 'log-in', component: LogInComponent},
      {path: 'sign-up', component: SignUpComponent},
      {path: 'status', component: StatusComponent, canActivate: [AuthGuard]},
      {path: '', component: LandingComponent},
      {path: '**', redirectTo: '/'}
    ])
  ],
  providers: [
    AuthService,
    AuthGuardService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
