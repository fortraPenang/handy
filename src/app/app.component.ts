import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, Nav, App } from 'ionic-angular';

import { UserLogin } from '../pages/user-login/user-login';
import { Dashboard } from '../pages/dashboard/dashboard';
import { SearchCategoryPage } from '../pages/search-category/search-category';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AngularFireAuth } from 'angularfire2/auth';
import {AuthService} from '../providers/auth-service';
import * as firebase from 'firebase/app';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  // make HelloIonicPage the root (or first) page
  rootPage = UserLogin;
  pages: Array<{title: string,icon:string, component: any}>;
  username: any;
  profilePic: any = "G";
  constructor(
    public platform: Platform,
    public menu: MenuController,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public afAuth: AngularFireAuth,
    public authServ: AuthService,
    public app: App) {

    this.initializeApp();
    // set our app's pages
    this.pages = [
      { title: 'Dashbaord', icon:'home', component: Dashboard },
      { title: 'Search Services', icon: '' , component: SearchCategoryPage },
      { title: 'Logout', icon:'lock', component: UserLogin }
    ];
    
    afAuth.auth.onAuthStateChanged((user) => {
      if(user) {
        // User is signed in
        
        var user = afAuth.auth.currentUser;
        this.username = user.displayName;
        this.profilePic = user.photoURL;
        this.menu.swipeEnable(true);
        this.nav.setRoot(Dashboard);
        console.log(user);
      } else {

        const root = this.app.getRootNav();
        root.popToRoot();
        // No user is signed in
        this.menu.close();
        this.menu.swipeEnable(false);
        // navigate to the new page if it is not the current page
        this.nav.setRoot(UserLogin);
        this.authServ.logout();

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
    
    if(page.title === 'Logout'){
      // close the menu when clicking a link from the menu
    this.menu.close();
    this.menu.swipeEnable(false);
    /* this.nav.popToRoot();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component); */
    this.authServ.logout();

    }else{
      // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
    }
  }
  
}
