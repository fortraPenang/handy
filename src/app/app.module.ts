import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpModule } from '@angular/http';
import { AngularFireModule } from "angularfire2";
import { AngularFireDatabaseModule } from 'angularfire2/database-deprecated';
import { AngularFireAuth } from 'angularfire2/auth';
import { UserLogin } from '../pages/user-login/user-login';
import { UserSignup } from '../pages/user-signup/user-signup';
import { UserForgotpassword } from '../pages/user-forgotpassword/user-forgotpassword';
import { Dashboard } from '../pages/dashboard/dashboard';
import { ReviewPage } from '../pages/review/review';
import { ViewServicePage } from '../pages/view-service/view-service';
import { SearchCategoryPage } from '../pages/search-category/search-category';
import { BookservicePage } from '../pages/bookservice/bookservice';
import { ServiceRequestPage} from '../pages/service-request/service-request';
import { SignupTypePage } from '../pages/signup-type/signup-type';
import { SignupModalPageModule} from '../pages/signup-modal/signup-modal.module';
import { SignupModalPage} from '../pages/signup-modal/signup-modal';
import { VendorSignupPage } from '../pages/vendor-signup/vendor-signup';
import { QuickServicePage } from '../pages/quick-service/quick-service';
import { VendorDashboardPage } from '../pages/vendor-dashboard/vendor-dashboard';
import { NewrequestServicePage } from '../pages/newrequest-service/newrequest-service';
import { SendquotationModalPage } from '../pages/sendquotation-modal/sendquotation-modal';
import { SendquotationModalPageModule } from '../pages/sendquotation-modal/sendquotation-modal.module';
import { UserSendquotationPage } from '../pages/user-sendquotation/user-sendquotation';
import { PendingWorkPage } from '../pages/pending-work/pending-work';



import { Geolocation } from '@ionic-native/geolocation';
import { GoogleMaps } from '../providers/google-maps';
import { GooglePlus } from '@ionic-native/google-plus';
import firebase from 'firebase'
import { AuthService } from '../providers/auth-service';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Facebook } from '@ionic-native/facebook';
import { FormsModule } from '@angular/forms';
// Import ionic2-rating module
import { Ionic2RatingModule } from 'ionic2-rating';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { Camera } from '@ionic-native/camera';

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
    ViewServicePage,
    SearchCategoryPage,
    BookservicePage,
    ServiceRequestPage,
    SignupTypePage,
    VendorSignupPage,
    QuickServicePage,
    VendorDashboardPage,
    NewrequestServicePage,
    UserSendquotationPage,
    PendingWorkPage,
    
   
    

  ],
  imports: [

 
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp,{tabsPlacement:'bottom'}),
    Ionic2RatingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    FormsModule,
    SignupModalPageModule,
    SendquotationModalPageModule,
    
    
    
   
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    
    UserLogin,
    UserSignup,
    UserForgotpassword,
    Dashboard,
    ReviewPage,
    ViewServicePage,
    SearchCategoryPage,
    BookservicePage,
    ServiceRequestPage,
    SignupTypePage,
    SignupModalPage,
    VendorSignupPage,
    QuickServicePage,
    VendorDashboardPage,
    NewrequestServicePage,
    SendquotationModalPage,
    UserSendquotationPage,
    PendingWorkPage,
  
    
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    GooglePlus,
    AuthService,
    AngularFireAuth,
    Facebook,
    FileTransfer,
    FileTransferObject,
    File,
    Camera
  ]
})
export class AppModule {}
