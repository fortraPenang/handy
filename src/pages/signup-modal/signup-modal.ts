import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';
import { SignupTypePage } from '../signup-type/signup-type';
import { VendorSignupPage } from '../vendor-signup/vendor-signup';

/**
 * Generated class for the SignupModalPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-signup-modal',
  templateUrl: 'signup-modal.html',
})
export class SignupModalPage {

  public step:any
  
  public buttonClicked: boolean = false; //Whatever you want to initialise it as
  

      public onButtonClick() {
  
          this.buttonClicked = !this.buttonClicked;
          
      }
  constructor(public navCtrl: NavController, public navParams: NavParams,private view:ViewController,) {
    this.step = "step1";
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupModalPage');
  }
  closeModal(){
    this.view.dismiss();
  }
  goToSignupUser(){ 
    this.navCtrl.push(SignupTypePage); 
  }
  goToSignupVendor(){
    this.navCtrl.push(VendorSignupPage)
  }

}
