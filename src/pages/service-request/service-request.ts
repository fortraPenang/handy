import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import firebase from 'firebase';


/**
 * Generated class for the ServiceRequestPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-service-request',
  templateUrl: 'service-request.html',
})
export class ServiceRequestPage {
  database = firebase.database();
  valueRef = firebase.database().ref('/Handys/request/');

  requests:any;
  description:any;
  myDate:any;
  myTime:any;
  address:any;
  postCode:any;
  city:any;
  state:any;
  budget:any;

  public notification:any
  
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.notification = "accepted";
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ServiceRequestPage');
    this.valueRef.on('value', handy => {
      
      this.requests = handy.val();
      console.log(this.requests);
      
  });
}

}
