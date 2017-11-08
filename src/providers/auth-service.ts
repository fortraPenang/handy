import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireModule } from 'angularfire2';
<<<<<<< HEAD
import { Dashboard } from '../pages/dashboard/dashboard';
// Do not import from 'firebase' as you'll lose the tree shaking benefits
import * as firebase from 'firebase/app';
import { GooglePlus } from '@ionic-native/google-plus';
import { IonicPage, LoadingController, NavController, ToastController, ModalController, NavParams, AlertController } from 'ionic-angular';
=======
import { GooglePlus } from '@ionic-native/google-plus';
import { IonicPage, LoadingController, ToastController, ModalController, NavParams, AlertController } from 
'ionic-angular';
import { Dashboard } from '../pages/dashboard/dashboard';
// Do not import from 'firebase' as you'll lose the tree shaking benefits
import * as firebase from 'firebase/app';
>>>>>>> 95a965fe16b68332ef3888883401ad327299e322

@Injectable()
export class AuthService {
  private currentUser: firebase.User;

<<<<<<< HEAD
  constructor(public alertCtrl: AlertController,public loadingCtrl: LoadingController,public navCtrl: NavController,public afAuth: AngularFireAuth, public googlePlus:GooglePlus) {
=======
  constructor(public afAuth: AngularFireAuth, 
    public googlePlus: GooglePlus, 
    public toastCtrl: ToastController,
    public modalCtrl: ModalController,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,) {
>>>>>>> 95a965fe16b68332ef3888883401ad327299e322
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
<<<<<<< HEAD
  async loginGoogle(accountInfo: any){
      let loader = this.loadingCtrl.create({
        dismissOnPageChange: true,
      });
      this.googlePlus.login({
        'webClientId' : '447284265080-llk2rv349uf9lv2iah4oiftuq6secopg.apps.googleusercontent.com',
        'offline' : true,  
     }).then(res => {
        firebase.auth().signInWithCredential(firebase.auth.GoogleAuthProvider.credential(res.idToken))
        .then(suc => {
          console.log(suc);
          this.navCtrl.setRoot(Dashboard);
        }).catch(err =>{
          let alert = this.alertCtrl.create({
            title: "Login Failed",
            subTitle: err,
            buttons: ['Confirm']
          });
          alert.present();
          loader.dismiss();
        })
      })
      loader.present();
  }
=======
  async loginGoogle(){

    }
>>>>>>> 95a965fe16b68332ef3888883401ad327299e322

  //TODO:
  async loginFacebook(accountInfo: any){

  }

}