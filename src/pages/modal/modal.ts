import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController, AlertController, MenuController, ToastController, NavController  } from 'ionic-angular';
import { Dashboard } from '../dashboard/dashboard';

import firebase from 'firebase';
/**
 * Generated class for the ModalPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-modal',
  templateUrl: 'modal.html',
})
export class ModalPage {
  public recaptchaVerifier:firebase.auth.RecaptchaVerifier;
  constructor(public navParams: NavParams, 
    public view: ViewController, 
    public alertCtrl: AlertController, 
    public menuCtrl: MenuController, 
    public toastCtrl: ToastController,
    public navCtrl: NavController) {
  }

  ionViewDidLoad() {
    this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
    console.log('ionViewDidLoad ModalPage');
  }

  closeModal(){
    this.view.dismiss();
  }

  signIn(phoneNumber: number){
    var self = this;
    const appVerifier = this.recaptchaVerifier;
    const phoneNumberString = "+6" + phoneNumber;
    firebase.auth().signInWithPhoneNumber(phoneNumberString, appVerifier)
      .then( confirmationResult => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        let prompt = this.alertCtrl.create({
        title: 'Enter the Confirmation code',
        inputs: [{ name: 'confirmationCode', placeholder: 'Confirmation Code' }],
        buttons: [
          { text: 'Cancel',
            handler: data => { console.log('Cancel clicked'); 
            prompt.dismiss(); 
            return false;
            }
          },
          { text: 'Send',
            handler: data => {
              confirmationResult.confirm(data.confirmationCode)
                .then(function (result) {
                  // User signed in successfully.
                  self.menuCtrl.swipeEnable(true);
                  prompt.dismiss();
                  self.closeModal();
                  return false;
                  // ...
                }).catch(function (error) {
                  // User couldn't sign in (bad verification code?)
                  // ...
                  console.log(error);
                });
            }
          }
        ]
      });
      prompt.present();
    })
    .catch(function (error) {
      console.error("SMS not sent", error);
    });
    
  }

}
