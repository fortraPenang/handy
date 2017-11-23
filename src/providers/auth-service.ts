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

@Injectable()
export class AuthService {
  private currentUser: firebase.User;

  constructor(public afAuth: AngularFireAuth, 
    public googlePlus: GooglePlus, 
    public toastCtrl: ToastController,
    public modalCtrl: ModalController,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,) {
    afAuth.authState.subscribe((user: firebase.User) => this.currentUser = user);
  }

    /**
   * Send a POST request to our login endpoint with the data
   * the user entered on the form.
   */
  async login(accountInfo: any) {
    return this.afAuth.auth.signInWithEmailAndPassword(accountInfo.email, accountInfo.password);
  }

  //TODO:
  async register(accountInfo: any){

  }

  //TODO:
  async loginGoogle(){
    return this.googlePlus.login({
      'webClientId' : '447284265080-llk2rv349uf9lv2iah4oiftuq6secopg.apps.googleusercontent.com',
      'offline' : true,  
    });
  }

  //TODO:
  async loginFacebook(){

  }

  //TODO:
  async logout(){
    return this.afAuth.auth.signOut();
  }
}