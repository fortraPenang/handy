import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';


/**
 * Generated class for the ReviewPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var rating = 0;
@IonicPage()
@Component({
  selector: 'page-review',
  templateUrl: 'review.html',
})
export class ReviewPage {

  public buttonClicked: boolean = true; //Whatever you want to initialise it as
  testRadioOpen:any;
  testRadioResult:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReviewPage');
  }

  onModelChange($val){
    rating = $val;
    console.log(rating);
  }
  showSendAlert() {
    let alert = this.alertCtrl.create({
      title: 'Confirmation',
      subTitle: 'Your have Submmitted your feedback. Thank You!',
      buttons: ['OK']
    });
    alert.present();
  }


}
