import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,  } from 'ionic-angular';
import {NewrequestServicePage} from '../newrequest-service/newrequest-service';
import { PendingWorkPage } from '../pending-work/pending-work';
import { AuthService } from '../../providers/auth-service';

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
    console.log(AuthService.userType);
  }

  tab1 = NewrequestServicePage;
  tab2 = PendingWorkPage;
  
  
  

}
