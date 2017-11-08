import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpModule } from '@angular/http';
import { AngularFireModule } from "angularfire2";
import { AngularFireDatabaseModule } from 'angularfire2/database-deprecated';

import { UserLogin } from '../pages/user-login/user-login';
import { UserSignup } from '../pages/user-signup/user-signup';
import { UserForgotpassword } from '../pages/user-forgotpassword/user-forgotpassword';
import { Dashboard } from '../pages/dashboard/dashboard';
import { ReviewPage } from '../pages/review/review';
import { ViewServicePage } from '../pages/view-service/view-service';
import { Geolocation} from '@ionic-native/geolocation';
import { GoogleMaps } from '../providers/google-maps';
import { GooglePlus } from '@ionic-native/google-plus';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

// Import ionic2-rating module
import { Ionic2RatingModule } from 'ionic2-rating';

export const firebaseConfig = {
      apiKey: "AIzaSyDEDyDjCV2OE7jt0HfXFdc3rf3bgoGpAJw",
      authDomain: "handy-505ed.firebaseapp.com",
      databaseURL: "https://handy-505ed.firebaseio.com",
      projectId: "handy-505ed",
      storageBucket: "handy-505ed.appspot.com",
      messagingSenderId: "825284463013"
    };


@NgModule({
  declarations: [
    MyApp,

    UserLogin,
    UserSignup,
    UserForgotpassword,
    Dashboard,
    ReviewPage,
    ViewServicePage

  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    Ionic2RatingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    
    UserLogin,
    UserSignup,
    UserForgotpassword,
    Dashboard,
    ReviewPage,
    ViewServicePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    GooglePlus    
  ]
})
export class AppModule {}
