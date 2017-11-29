import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,  } from 'ionic-angular';
import {NewrequestServicePage} from '../newrequest-service/newrequest-service';

/**
 * Generated class for the VendorDashboardPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-vendor-dashboard',
  templateUrl: 'vendor-dashboard.html',
})
export class VendorDashboardPage {


  constructor(public navCtrl: NavController, public navParams: NavParams, ) {
  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VendorDashboardPage');
  }

  tab1 = NewrequestServicePage;
  
  
  

}
