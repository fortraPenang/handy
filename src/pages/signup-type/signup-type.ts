import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, } from 'ionic-angular';
import firebase from 'firebase';
import { AlertController } from 'ionic-angular';


/**
 * Generated class for the SignupTypePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-signup-type',
  templateUrl: 'signup-type.html',
})
export class SignupTypePage {

  database = firebase.database();
  valueRef = firebase.database().ref('/Handys/user');

  fullname:any;
  email:any;
  password:any;
  hpnumber:any;
  dd:any;
  mm:any;
  yy:any;
  gender:any;
  address1:any;
  address2:any;
  postCode:any;
  city:any;
  state:any;

  public step:any
  constructor(public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController ) {
    this.step = "step1";
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupTypePage');
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

  pushData(){

      let confirm = this.alertCtrl.create({
        title: 'Confirmation',
        message: 'Do you confirm sign up?',
        buttons: [
          {
            text: 'Cancel',
            handler: () => {
            }
          },
          {
            text: 'Agree',
            handler: () => {
              this.valueRef.push(
                {"fullname":this.fullname,
                 "email":this.email,
                 "password":this.password,
                 "number":this.hpnumber,
                 "dob":this.dd+"/"+this.mm+"/"+this.yy,
                 "gender":this.gender,
                 "address":this.address1+", "+this.address2+", "+this.postCode+", "+this.city+", "+this.state,
                 
                }
              )
            }
          }
        ]
      });
      confirm.present();
    }

}
