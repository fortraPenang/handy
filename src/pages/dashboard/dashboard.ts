import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ReviewPage } from '../review/review';
import { ViewServicePage } from '../view-service/view-service';
import { ServiceRequestPage } from '../service-request/service-request';
import { QuickServicePage } from '../quick-service/quick-service';
import { AlertController } from 'ionic-angular';
import { VendorDashboardPage } from '../vendor-dashboard/vendor-dashboard';
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
  testRadioOpen: any;
  testRadioResult: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Dashboard');
  }

  goToReview() {
    this.navCtrl.push(ReviewPage);
  }


  goToServiceRequest() {
    this.navCtrl.push(ServiceRequestPage);
  }
  goToQuickService() {
    this.navCtrl.push(QuickServicePage);
  }


  public checkFocus() {

    this.buttonClicked = !this.buttonClicked;
  }

  public checkBlur() {

    this.buttonClicked = !this.buttonClicked;
  }

  goToViewService() {
    this.navCtrl.push(ViewServicePage)
  }

  goToVendorDashboard() {
    this.navCtrl.push(VendorDashboardPage)
  }

  showAlert() {
    let alert = this.alertCtrl.create();
    alert.setTitle('Choose Service');

    alert.addInput({
      type: 'radio',
      label: 'Hire Now',
      value: 'qs',
      checked: true
    },
    );

    alert.addInput({
      type: 'radio',
      label: 'Book a Service',
      value: 'bs',
      checked: false
    },
    );

    alert.addButton('Cancel');
    alert.addButton({
      text: 'OK',
      handler: data => {
        this.testRadioOpen = false;
        this.testRadioResult = data;
        if (data == "bs") {
          this.goToViewService()
        }
        else {
          this.goToQuickService()
        }
      }
    });
    alert.present();
  }
  goToShowAlertReview() {
    let alert = this.alertCtrl.create();
    alert.setTitle('Rate Our Service!');

    alert.addInput({
      type: 'radio',
      label: 'Rate Now',
      value: 'rn',
      checked: true
    },
    );

    alert.addInput({
      type: 'radio',
      label: 'No Thanks',
      value: 'nt',
      checked: false
    },
    );
    alert.addInput({
      type: 'radio',
      label: 'Remind Me later',
      value: 'rm',
      checked: false
    },
    );

    alert.addButton('Cancel');
    alert.addButton({
      text: 'OK',
      handler: data => {
        this.testRadioOpen = false;
        this.testRadioResult = data;
        if (data == "rn") {
          this.goToReview()
        }

      }
    });
    alert.present();
  }


}
