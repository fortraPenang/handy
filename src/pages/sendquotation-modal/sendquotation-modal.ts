import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController } from 'ionic-angular';
import firebase from 'firebase';

/**
 * Generated class for the SendquotationModalPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-sendquotation-modal',
  templateUrl: 'sendquotation-modal.html',
})
export class SendquotationModalPage {

  valueRef:any;
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
  key:any;
  bool:any [] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private view: ViewController, public alertCtrl: AlertController,) {
    console.log("constructor");
    this.key = this.navParams.get('data');
    console.log(this.key);
    this.valueRef = firebase.database().ref('/Handys/request/').child(this.key);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ServiceRequestPage');

    this.valueRef.on('value', handy => {
      
      this.requests = handy.val();
      //this.requestsKeys = Object.keys(this.requests);
      console.log(this.requests['address']);
  });

}
/* requestStatus(key:any,statusUpdate:any){
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
} */
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

  closeModal(){
    this.view.dismiss();
  }

  quotation(){
    let confirm = this.alertCtrl.create({
      title: 'Proceed?',
      message: 'Quotation updated to RM '+ this.budget +'!',
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
            this.valueRef
            .update({status: "negotiate",
                    budget: "RM "+this.budget });
          }
        }
      ]
    });
    confirm.present();
    
  }
}
