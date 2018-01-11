import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import firebase from 'firebase';
import { UserSendquotationPage } from "../user-sendquotation/user-sendquotation";


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
  vendorRef = firebase.database().ref('/Handys/vendor/');

  requests:any;
  requestsKeys:any;
  description:any;
  myDate:any;
  myTime:any;
  address:any;
  postCode:any;
  city:any;
  state:any;
  budget:any;
  show:any;
  currentUser:any;
  userId:any;
  vndImg:any;
  comName:any;
  vndId:any [] = [];
  vendor:any;
  bool:any [] = [];

  public notification:any
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
    this.notification = "pending";

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ServiceRequestPage');
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.currentUser = firebase.auth().currentUser;
        this.userId = this.currentUser.uid;
        this.valueRef.orderByChild("userId").equalTo(this.userId).on('value', handy => {
          this.requests = handy.val();
          this.requestsKeys = Object.keys(this.requests);
          this.bool=[];
          this.vndId=[];
          for(var i of this.requestsKeys){
            this.vndId.push(this.requests[i]["vendorId"]);
            console.log(this.vndId);
            this.bool.push(false);
          }
      });
      }
   });

   this.vendorRef.on('value', handy => {
     this.vendor = handy.val();
     console.log(this.vendor);
   });

}

requestStatus(key:any,statusUpdate:any){
  let confirm = this.alertCtrl.create({
    title: 'Proceed?',
    message: 'Move request to '+ statusUpdate +'?',
    buttons: [
      {
        text: 'Cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Confirm',
        handler: () => {
          this.bool[key] = !this.bool[key];
          this.valueRef.child(key)
          .update({status: statusUpdate});
          console.log(key,statusUpdate);
        }
      }
    ]
  });
  confirm.present();
  
}

  returnSwitch(key:any){
    var boolKey = this.bool[key];

    if(boolKey==true){
      this.bool[key] = !boolKey;
    }else{
      var j = this.bool;
      for(var i in j){
        this.bool[i] = false;
      }
      this.bool[key] = !boolKey;
    }
    console.log(boolKey,key);
  }
  goToSend(key: string){
    console.log(key); 
    this.navCtrl.push(UserSendquotationPage,{"data":key});
  }

}
