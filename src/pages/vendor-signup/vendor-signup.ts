import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the VendorSignupPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-vendor-signup',
  templateUrl: 'vendor-signup.html',
})
export class VendorSignupPage {

  public step:any
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.step = "step1";
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VendorSignupPage');
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



}
