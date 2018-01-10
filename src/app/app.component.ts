import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, Nav, ToastController } from 'ionic-angular';

import { UserLogin } from '../pages/user-login/user-login';
import { Dashboard } from '../pages/dashboard/dashboard';
import { SearchCategoryPage } from '../pages/search-category/search-category';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthService } from '../providers/auth-service';
import * as firebase from 'firebase/app';
import { VendorDashboardPage } from '../pages/vendor-dashboard/vendor-dashboard';
import { ServiceRequestPage } from '../pages/service-request/service-request';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  // make HelloIonicPage the root (or first) page
  rootPage = UserLogin;
  pages: Array<{ title: string, icon: string, component: any }>;
  displayName: any;
  avatarLetter: any;
  constructor(
    public platform: Platform,
    public menu: MenuController,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public afAuth: AngularFireAuth,
    public authService: AuthService,
    public toastCtrl: ToastController
  ) {

    this.initializeApp();
    // set our app's pages
    this.pages = [
      { title: 'Dashboard', icon: 'home', component: Dashboard },
      { title: 'Search Services', icon: 'search', component: SearchCategoryPage },
      { title: 'My Requests', icon: 'paper', component: ServiceRequestPage },
      { title: 'Logout', icon: 'lock', component: UserLogin }
      
    ];

    afAuth.auth.onAuthStateChanged((user) => {
      if (user) {
        // User is signed in
        var user = afAuth.auth.currentUser;
        this.displayName = (!user.displayName) ? "" : user.displayName;
        this.avatarLetter = (!user.displayName) ? "" : user.displayName[0];
        console.log(user);
        console.log("Signed in!");
        this.authService.loadType().then((snapshot) => {
          AuthService.userType = (!snapshot.val()) ? "Not Set" : snapshot.val().role;
          console.log(AuthService.userType);    
          this.menu.swipeEnable(true);
          this.nav.popToRoot();
          if(AuthService.userType === "user")
            this.nav.setRoot(Dashboard);
          else if(AuthService.userType === "vendor")
            this.nav.setRoot(VendorDashboardPage);
          else
            this.nav.setRoot(Dashboard);
        });
      } else {
        // No user is signed in, go to login page
        console.log("Sign out!");
        this.menu.swipeEnable(false);
        this.nav.popToRoot();
        this.nav.setRoot(UserLogin);
        this.authService.logout();
      }
    })
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.menu.swipeEnable(false);
    });
  }

  openPage(page) {
    //if the menu selection is log out
    if (page.title === "Logout") {
      this.menu.close();
      this.menu.swipeEnable(false);
      this.authService.logout().then(() => {
        let toast = this.toastCtrl.create({
          message: 'Logged out!',
          duration: 3000,
          position: 'bottom'
        });
        toast.onDidDismiss(() => {
          console.log("Dismissed toast");
        })
        toast.present();
      });
    }
    else {
      this.menu.close();
      // navigate to the new page if it is not the current page
      this.nav.setRoot(page.component);
    }
  }
  
}
