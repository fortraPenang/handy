import { Component,OnInit  } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController } from 'ionic-angular';
import { GoogleMaps } from '../providers/google-maps';
import { FormsModule} from '@angular/forms';
import firebase from 'firebase';
import { AlertController } from 'ionic-angular';
import {AutocompletePage} from '../autocomplete/autocomplete';




/**
 * Generated class for the BookservicePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-bookservice',
  templateUrl: 'bookservice.html',
  
  
})
export class BookservicePage  {

  
  database = firebase.database();
  valueRef = firebase.database().ref('/Handys/request');

  service:any;
  description:any;
  myDate:any;
  myTime:any;
  address:any;
  postCode:any;
  city:any;
  state:any;
  budget:any;
  vndId:any;
  currentUser:any;
  uId:any;
  newAddress:any;

  /* autocompleteItems: any;
  autocomplete: any;
  acService:any;
  placesService: any; */

  public step:any
  constructor(public navCtrl: NavController, public navParams: NavParams, private modalCtrl: ModalController,public alertCtrl: AlertController) {
    this.newAddress = {
      place: ''
    };

    this.step = "step1";
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.currentUser = firebase.auth().currentUser;
        this.uId = this.currentUser.uid;
      }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BookservicePage');
    this.vndId= this.navParams.data;
    console.log(this.vndId);
  }

  showAddressModal () {
    let modal = this.modalCtrl.create(AutocompletePage);
    let me = this;
    modal.onDidDismiss(data => {
      this.newAddress.place = data;
    });
    modal.present();
  }
  /* ngOnInit() {
    this.acService = new google.maps.places.AutocompleteService();        
    this.autocompleteItems = [];
    this.autocomplete = {
    query: ''
    };        
    }
    updateSearch() {
      console.log('modal > updateSearch');
      if (this.autocomplete.query == '') {
      this.autocompleteItems = [];
      return;
      }
      let self = this; 
      let config = { 
      //types:  ['geocode'], // other types available in the API: 'establishment', 'regions', and 'cities'
      input: this.autocomplete.query, 
      componentRestrictions: {  } 
      }
      this.acService.getPlacePredictions(config, function (predictions, status) {
        console.log('modal > getPlacePredictions > status > ', status);
        self.autocompleteItems = [];            
        predictions.forEach(function (prediction) {              
        self.autocompleteItems.push(prediction);
        });
        });
        }
   */  

  //to navigate back to previous segment
  back(){
    switch(this.step) { 
      case "step1": 
         break;
      case "step2":
         this.step ="step1"; 
         break; 
      case "step3":
        this.step ="step2"; 
        break; 
      case "step4":
        this.step ="step3"; 
        break;
    }
  }
  
  next(){
    switch(this.step) { 
      case "step1": 
        this.step = "step2";
         break; 
      case "step2": 
         this.step ="step3"; 
         break; 
      case "step3": 
        this.step ="step4"; 
        break; 
      case "step4":
        break; 
    } 
  }

  goToViewService(){
    this.navCtrl.pop();
  }

  goToDashboard(){
    this.navCtrl.popToRoot();
  }

  pushData(){
    try{
          console.log(this.uId);
          this.valueRef.push(
            {"serviceCategory":this.service,
             "description":this.description,
             "date":this.myDate,
             "time":this.myTime,
             "address":this.address+", "+this.postCode+", "+this.city+", "+this.state,
             "budget":"RM "+this.budget,
             "status":"pending",
             "vendorId":this.vndId,
             "userId":this.uId
            }
          )
       
    this.showAlert();
    this.goToDashboard();
  }catch(error) {
    let alert = this.alertCtrl.create({
      title: "Login Failed",
      subTitle: error.errorMessage,
      buttons: ['Ok']
    });
    alert.present();
  }
}
  showAlert() {
    let alert = this.alertCtrl.create({
      title: 'Confirmation',
      subTitle: 'Your request has been sent to the vendor!',
      buttons: ['OK']
    });
    alert.present();
  
  }
}
