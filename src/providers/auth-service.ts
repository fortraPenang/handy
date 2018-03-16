import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireModule } from 'angularfire2';
import { GooglePlus } from '@ionic-native/google-plus';
import { IonicPage, LoadingController, ToastController, ModalController, NavParams, AlertController } from
  'ionic-angular';
import { Dashboard } from '../pages/dashboard/dashboard';
// Do not import from 'firebase' as you'll lose the tree shaking benefits
import * as firebase from 'firebase/app';
import { MyApp } from '../app/app.component';

@Injectable()
export class AuthService {
  private currentUser: firebase.User;
  userRef: any;
  vendorRef: any;
  rootRef: any;
  public static userType: any;


  constructor(public afAuth: AngularFireAuth,
    public googlePlus: GooglePlus,
    public toastCtrl: ToastController,
    public modalCtrl: ModalController,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController, ) {
    afAuth.authState.subscribe((user: firebase.User) => this.currentUser = user);
    this.userRef = firebase.database().ref('/Handys/user/');
    this.vendorRef = firebase.database().ref('/Handys/vendor/');
    
  }

  /**
 * Send a POST request to our login endpoint with the data
 * the user entered on the form.
 */
  async login(accountInfo: any) {
    return this.afAuth.auth.signInWithEmailAndPassword(accountInfo.email, accountInfo.password);
  }


  //Gets the type of the user when user is logged in(?)
  loadType() {
    var user = firebase.auth().currentUser;
    var role = firebase.database().ref('/Handys/user_roles/' + user.uid);
    return role.once("value");
  }

  //Register user via email and password
  async register(accountInfo: any) {
    return this.afAuth.auth.createUserWithEmailAndPassword(accountInfo.email, accountInfo.password).then((newUser) => {
      if (newUser) {
        //update user display name
        var user = firebase.auth().currentUser;
        user.updateProfile({
          displayName: accountInfo.fName + " " + accountInfo.lName,
          photoURL: null
        }).then(() => {
          console.log("Profile update successful!");
          console.log(user);
        }).catch((error) => {
          console.log(error.code + ": " + error.message);
        })
      }
    })
      .catch((error) => {
        console.log(error.code + ": " + error.message);
      });
  }

  //TODO:
  async loginGoogle() {
    return this.googlePlus.login({
      'webClientId': '447284265080-llk2rv349uf9lv2iah4oiftuq6secopg.apps.googleusercontent.com',
      'offline': true,
    });
  }

  //TODO:
  async loginFacebook() {

  }

  //TODO:
  async sendPasswordResetEmail(email: any) {
    return this.afAuth.auth.sendPasswordResetEmail(email).then(() => {
      console.log("Password reset email sent!");
    })
    .catch(() => {
        console.log("Password reset email failed to sent");
    });
  }

  async logout() {
    return this.afAuth.auth.signOut();
  }
  resetPassword(email: string): any {
    return this.afAuth.auth.sendPasswordResetEmail(email);
  }
}