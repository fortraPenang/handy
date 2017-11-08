import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ReviewPage } from '../review/review';
import { ViewServicePage } from '../view-service/view-service';
/**
 * Generated class for the Dashboard page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class Dashboard {

  public buttonClicked: boolean = true; //Whatever you want to initialise it as

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Dashboard');
  }

  goToReview(){
    this.navCtrl.push(ReviewPage);
  }
  
  
      public checkFocus() {
  
          this.buttonClicked = !this.buttonClicked;
      }

      public checkBlur() {
        
                this.buttonClicked = !this.buttonClicked;
            }

  goToViewService(){
    this.navCtrl.push(ViewServicePage)
  }
}
