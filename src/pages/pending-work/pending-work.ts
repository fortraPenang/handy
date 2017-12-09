import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import firebase from 'firebase';

/**
 * Generated class for the PendingWorkPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-pending-work',
  templateUrl: 'pending-work.html',
})
export class PendingWorkPage {
  database = firebase.database();
  valueRef = firebase.database().ref('/Handys/request/');

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
  title:any;

  bool:any [] = [];

  public notification:any

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
    this.title = "Pending Work";
    this.notification = "pending";
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ServiceRequestPage');
    this.valueRef.on('value', handy => {
      
      this.requests = handy.val();
      this.requestsKeys = Object.keys(this.requests);
      this.bool=[];
      for(var i of this.requestsKeys){
        this.bool.push(false);
      }
      
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
  name(){
    switch(this.notification){
      case "pending":{
       this.title = "Pending Work";
       break;
      }
      case "accepted":{
       this.title = "Completed";
       break;
        }
      
       
   }
 
 }

 
  
 
}

