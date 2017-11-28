import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import firebase from 'firebase';
import { AlertController } from 'ionic-angular';

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
  valueRef = firebase.database().ref('/Handys/request');

  service:any;
  description:any;
  myDate:any;
  myTime:any;
  address:any;
  postCode:any;
  city:any;
  state:any;
  budget:any;

  public step:any
  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
    this.step = "step1";
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QuickServicePage');
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

  pushData(){
    this.valueRef.push(
      {"serviceCategory":this.service,
       "description":this.description,
       "date":this.myDate,
       "time":this.myTime,
       "address":this.address+", "+this.postCode+", "+this.city+", "+this.state,
       "budget":"RM "+this.budget
      }
    )
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
