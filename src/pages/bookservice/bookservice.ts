import { Component,OnInit  } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController } from 'ionic-angular';
import { GoogleMaps } from '../providers/google-maps';
import { FormsModule} from '@angular/forms';
import firebase from 'firebase';
import { AlertController } from 'ionic-angular';









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
  /* autocompleteItems: any;
  autocomplete: any;
  acService:any;
  placesService: any; */

  public step:any
  constructor(public navCtrl: NavController, public navParams: NavParams, private modalCtrl: ModalController,public alertCtrl: AlertController) {
    this.step = "step1";
   
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BookservicePage');
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
      case "step5": 
        this.step = "step4";
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
        this.step ="step5"; 
        break;
      case "step5":
        break; 
    } 
  }

  goToViewService(){
    this.navCtrl.pop();
  }

  pushData(){
    this.valueRef.push(
      {"serviceCategory":this.service,
       "description":this.description,
       "date":this.myDate,
       "time":this.myTime,
       "address":this.address+", "+this.postCode+", "+this.city+", "+this.state,
       "budget":"RM "+this.budget
      }
    )
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
