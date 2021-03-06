import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import firebase from 'firebase';
import { AlertController } from 'ionic-angular';
import { Autosize } from '../components/autosize/autosize';
import {AutocompletePage} from '../autocomplete/autocomplete';

/**
 * Generated class for the QuickServicePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-quick-service',
  templateUrl: 'quick-service.html',
})
export class QuickServicePage {
  database = firebase.database();
  valueRef = firebase.database().ref('/Handys/QSrequest');
  userRef = firebase.database().ref('/Handys/user');



  service:any;
  description:any;
  myDate:any;
  myTime:any;
  address:any;
  postCode:any;
  city:any;
  state:any;
  budget:any;
  currentUser:any;
  uId:any;
  newAddress:any;

   autocompleteItems: any;
  autocomplete: any;
  acService:any;
  placesService: any; 

  public step:any
  constructor(public navCtrl: NavController, public navParams: NavParams, private modalCtrl: ModalController, public alertCtrl: AlertController) {
    this.step = "step1";
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.currentUser = firebase.auth().currentUser;
        this.uId = this.currentUser.uid;
      }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QuickServicePage');

    this.userRef.on('value', handy => {
      this.address=handy.val()[this.uId]['address1'];
      this.postCode=handy.val()[this.uId]['postcode'];
      this.city=handy.val()[this.uId]['city'];
      this.state=handy.val()[this.uId]['state'];
      });
  }

  back(){
    switch(this.step) { 
      case "step1": { 
         break; 
      } 
      case "step2": { 
         this.step ="step1"; 
         break; 
      } 
      case "step3": { 
        this.step ="step2"; 
        break; 
      } 
      case "step4": { 
        this.step ="step3"; 
        break; 
      }
      case "step5": { 
        this.step = "step4";
        break; 
      }  
    }
  }

  next(){
    switch(this.step) { 
      case "step1": { 
        this.step = "step2";
         break; 
      } 
      case "step2": { 
         this.step ="step3"; 
         break; 
      } 
      case "step3": { 
        this.step ="step4"; 
        break; 
      } 
      case "step4": { 
        this.step ="step5"; 
        break; 
      }
      case "step5": { 
        break; 
      }  
   }
  }
  goToViewService(){
    this.navCtrl.pop();
  }

  goToDashboard(){
    this.navCtrl.popToRoot();
  }

  pushData(){
    var myTime = Date.now();
    try{
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          this.currentUser = firebase.auth().currentUser;
          this.uId = this.currentUser.uid;
          console.log(this.uId);
          this.valueRef.push(
            {"serviceCategory":this.service,
            "description":this.description,
            "time":myTime,
            "address":this.address+", "+this.postCode+", "+this.city+", "+this.state,
            "budget":"RM "+this.budget,
            "userId":this.uId
            }
          );
        }
      });
    this.showAlert();
    this.goToDashboard();
    }catch(error) {
    let alert = this.alertCtrl.create({
      title: "Login Failed",
      subTitle: error.errorMessage,
      buttons: ['Ok']
    });
    alert.present();
    }
  }

  showAlert() {
    let alert = this.alertCtrl.create({
      title: 'Confirmation',
      subTitle: 'Your request have been sent to the vendor!',
      buttons: ['OK']
    });
    alert.present();
  }
}
