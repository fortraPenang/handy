import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ViewController} from 'ionic-angular';
import { GoogleMaps } from '../providers/google-maps';

/**
 * Generated class for the AutocompletePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-autocomplete',
  templateUrl: 'autocomplete.html',
})
export class AutocompletePage {

  constructor(public viewCtrl: ViewController, private zone: NgZone, public navCtrl: NavController, public navParams: NavParams) {
    this.autocompleteItems = [];
    this.autocomplete = {
      query: ''
    };
  }
  
  autocompleteItems;
  autocomplete;
  service = new google.maps.places.AutocompleteService();

  dismiss() {
    this.viewCtrl.dismiss();
  }

  chooseItem(item: any) {
    this.viewCtrl.dismiss(item);
  }
  
  updateSearch() {
    if (this.autocomplete.query == '') {
      this.autocompleteItems = [];
      return;
    }
    let me = this;
    this.service.getPlacePredictions({ input: this.autocomplete.query, componentRestrictions: {country: 'MY'} }, function (predictions, status) {
      me.autocompleteItems = []; 
      me.zone.run(function () {
        predictions.forEach(function (prediction) {
          me.autocompleteItems.push(prediction.description);
        });
      });
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AutocompletePage');
  }

}
